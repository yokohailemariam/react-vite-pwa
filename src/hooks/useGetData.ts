import { getImages } from "@/lib/axios/request";
import { ApiResponse } from "@/types";
import { useOfflineData } from "./useOfflineData";
export function useImages() {
  return useOfflineData<ApiResponse[]>({
    key: "images",
    fetcher: getImages,
    dbConfig: {
      dbName: "unsplash",
      storeName: "data",
      cacheTime: 60 * 60 * 1000,
      version: 1,
      dataVersion: "1.0.0",
    },
  });
}
