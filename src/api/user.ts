import { http } from "@/pugins/https/axios";
import type { RestResponse, RestData,UserProperty } from "@/types/api.d";
import { API } from "@/api/index";

export const userQuery = (data?: any) => {
  return http.request<RestResponse<RestData<Array<UserProperty>>>>('get',API.USER_QUERY, { data });
};
