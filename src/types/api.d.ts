// 所有接口及请求、返回数据,axios封装类型定义

import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "options" | "head" | "patch"
>;

//
export interface AxiosHttpError extends AxiosError {
  isCancelRequest?: boolean;
}
export interface AxiosHttpOptions {
  // 是否启用Token,默认为true
  useToken?: boolean;
  // 是否开启接口错误信息展示,默认为true
  showErrorMessage?: boolean;
}
// 自定义接口请求配置
export interface AxiosHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: AxiosHttpRequestConfig) => void;
  beforeResponseCallback?: (response: AxiosHttpResponse) => void;
}
// 自定义接口返回数据类型
export interface AxiosHttpResponse extends AxiosResponse {
  config: AxiosHttpRequestConfig;
  data: any;
}

export interface RestResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface RestData<T> {
  data: T;
  total: number;
}
// export default class CreateAxios {
//   request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: AxiosHttpRequestConfig): Promise<T>;
//   post<T, P>(url: string, params?: T, axiosConfig?: AxiosHttpRequestConfig): Promise<P>;
//   get<T, P>(url: string, params?: T, axiosConfig?: AxiosHttpRequestConfig): Promise<P>;
// }

export interface UserProperty {
  name:string;
  age:number;
  height:number;
}
