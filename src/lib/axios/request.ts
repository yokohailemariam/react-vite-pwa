import { ApiResponse } from "@/types";
import { MAIN_INSTANCE } from "./instance";
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
export const getImages = async (): Promise<ApiResponse[]> => {
  const response = await MAIN_INSTANCE.get<ApiResponse[]>(
    `/photos/?client_id=${UNSPLASH_KEY}`
  );
  return response.data;
};
