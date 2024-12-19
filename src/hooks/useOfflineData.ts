import { useState, useEffect } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { openDB, IDBPDatabase } from "idb";

interface CachedData<T> {
  data: T;
  timestamp: number;
  version: string;
}
interface OfflineDBConfig {
  dbName: string;
  storeName: string;
  version?: number;
  cacheTime?: number;
  dataVersion?: string;
}
const DEFAULT_CACHE_TIME = 60 * 60 * 1000; // 1 hour
const DEFAULT_VERSION = "1.0.0";
export class OfflineDB<T> {
  private db: Promise<IDBPDatabase>;
  private config: Required<OfflineDBConfig>;
  constructor(config: OfflineDBConfig) {
    this.config = {
      version: 1,
      cacheTime: DEFAULT_CACHE_TIME,
      dataVersion: DEFAULT_VERSION,
      ...config,
    };
    this.db = this.initDB();
  }
  private initDB() {
    return openDB(this.config.dbName, this.config.version, {
      upgrade: (db) => {
        if (!db.objectStoreNames.contains(this.config.storeName)) {
          db.createObjectStore(this.config.storeName);
        }
      },
    });
  }
  async getData(key: string): Promise<CachedData<T> | undefined> {
    const db = await this.db;
    return db.get(this.config.storeName, key);
  }
  async setData(key: string, data: T): Promise<void> {
    const db = await this.db;
    const cachedData: CachedData<T> = {
      data,
      timestamp: Date.now(),
      version: this.config.dataVersion,
    };
    await db.put(this.config.storeName, cachedData, key);
  }
  isDataFresh(timestamp: number): boolean {
    return Date.now() - timestamp < this.config.cacheTime;
  }
  isDataVersionValid(version: string): boolean {
    return version === this.config.dataVersion;
  }
}
interface UseOfflineDataOptions<T> extends Partial<UseQueryOptions<T, Error>> {
  key: string;
  fetcher: () => Promise<T>;
  dbConfig: OfflineDBConfig;
}
export function useOfflineData<T>({
  key,
  fetcher,
  dbConfig,
  ...queryOptions
}: UseOfflineDataOptions<T>) {
  const [db, setDb] = useState<OfflineDB<T>>();
  const [isDbReady, setIsDbReady] = useState(false);
  useEffect(() => {
    const initDb = async () => {
      const newDb = new OfflineDB<T>(dbConfig);
      // Wait for the DB to be initialized
      await newDb.getData(key);
      setDb(newDb);
      setIsDbReady(true);
    };
    initDb();
  }, [dbConfig, key]);
  return useQuery<T, Error>({
    queryKey: [dbConfig.storeName, key],
    queryFn: async () => {
      if (!db || !isDbReady) throw new Error("Database not initialized");
      // console.log("Executing query function"); // Debug log
      const cachedData = await db.getData(key);
      // console.log("Cached data:", cachedData); // Debug log
      if (
        cachedData &&
        db.isDataFresh(cachedData.timestamp) &&
        db.isDataVersionValid(cachedData.version)
      ) {
        // console.log("Using cached data"); // Debug log
        return cachedData.data;
      }
      try {
        // console.log("Fetching fresh data"); // Debug log
        const freshData = await fetcher();
        await db.setData(key, freshData);
        return freshData;
      } catch (error) {
        if (cachedData) {
          // console.log("Fetch failed, using cached data"); // Debug log
          return cachedData.data;
        }
        throw error;
      }
    },
    enabled: isDbReady, // Only run query when DB is ready
    retry: false,
    ...queryOptions,
  });
}
