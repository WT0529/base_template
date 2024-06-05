import { http } from "@/pugins/https/axios";
import type { RestResponse, RestData } from "@/types/api.d";
import { API } from "@/api/index";

export const userQuery = (data?: any) => {
  return http.get<any, RestResponse<RestData<any>>>(API.USER_QUERY, { data });
};
