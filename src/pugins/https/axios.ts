import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CustomParamsSerializer,
} from "axios";
import Axios from "axios";
import { stringify } from "qs";
import { getToken, formatToken } from "@/pugins/hook";
import i18n from "@/locale";
import { whiteList } from "@/config";
import type {
  RequestMethods,
  AxiosHttpError,
  AxiosHttpResponse,
  AxiosHttpRequestConfig,
  AxiosHttpOptions,
} from "@/types/api.d";

// const router = useRouter()
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },

  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
};
// 封装axios请求方法
class CreateAxios {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  /** token过期后，暂存待执行的请求 */
  private static requests = [];

  /** 防止重复刷新token */
  private static isRefreshing = false;

  /** 初始化配置对象 */
  private static initConfig: AxiosHttpRequestConfig = {};
  private static options: AxiosHttpOptions = {
    useToken: false,
    showErrorMessage: false,
  };
  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    CreateAxios.axiosInstance.interceptors.request.use(
      async (config: AxiosHttpRequestConfig): Promise<any> => {
        // 开启进度条动画
        // NProgress.start()

        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config);

          return config;
        }
        if (CreateAxios.initConfig.beforeRequestCallback) {
          CreateAxios.initConfig.beforeRequestCallback(config);

          return config;
        }
        // 开启Token模式
        if (CreateAxios.options.useToken) {
          /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
          // const whiteList = ['/refresh-token', '/login']

          return whiteList.find((url) => url === config.url)
            ? config
            : new Promise((resolve) => {
                const data = getToken();
                if (data) {
                  config.headers!.Authorization = formatToken(data);
                  resolve(config);
                } else {
                  resolve(config);
                }
              });
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = CreateAxios.axiosInstance;

    instance.interceptors.response.use(
      (response: AxiosHttpResponse) => {
        // if (response.data.code === 401)
        // return router.push('/login')

        const $config = response.config;

        // 关闭进度条动画
        // NProgress.done()

        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);

          return response.data;
        }
        if (CreateAxios.initConfig.beforeResponseCallback) {
          CreateAxios.initConfig.beforeResponseCallback(response);

          return response.data;
        }

        return response.data;
      },
      (error: AxiosHttpError) => {
        const $error = error;
        if (error.response?.status === 401) {
          // 清理登录的相关操作
          // If 401 response returned from api
          // router.push('/login')
          return;
        }
        $error.isCancelRequest = Axios.isCancel($error);

        // 关闭进度条动画
        // NProgress.done()

        // 所有的响应异常 区分来源为取消请求/非取消请求
        this.httpErrorStatusHandler($error);
        return Promise.reject($error);
      },
    );
  }
  /**
   * 异常处理
   * @param error 异常对象
   */
  private httpErrorStatusHandler(error: AxiosHttpError): void {
    let message = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          message = i18n.global.t("axios.Interface redirected"); // 可引入in8
          break;
        case 404:
          message = i18n.global.t("axios.Request failed with status code 404"); // 可引入in8
          break;
      }
    }
  }
  /**
   * 通用请求方法
   * @param method 请求方法
   * @param url 请求地址
   * @param param 请求参数
   * @param axiosConfig 请求配置
   */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: AxiosHttpRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as AxiosHttpRequestConfig;

    return new Promise((resolve, reject) => {
      CreateAxios.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  /**
   * 封装get请求
   * @param url 请求地址
   * @param param 请求参数
   * @param axiosConfig 请求配置
   */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    axiosConfig?: AxiosHttpRequestConfig,
  ): Promise<P> {
    return this.request<P>("get", url, params, axiosConfig);
  }
  /**
   * 封装post请求
   * @param url 请求地址
   * @param param 请求参数
   * @param axiosConfig 请求配置
   */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    axiosConfig?: AxiosHttpRequestConfig,
  ): Promise<P> {
    return this.request<P>("post", url, params, axiosConfig);
  }
  /**
   * 封装put请求
   * @param url 请求地址
   * @param param 请求参数
   * @param axiosConfig 请求配置
   */
  public put<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    axiosConfig?: AxiosHttpRequestConfig,
  ): Promise<P> {
    return this.request<P>("put", url, params, axiosConfig);
  }
  /**
   * 封装delete请求
   * @param url 请求地址
   * @param param 请求参数
   * @param axiosConfig 请求配置
   */
  public delete<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    axiosConfig?: AxiosHttpRequestConfig,
  ): Promise<P> {
    return this.request<P>("delete", url, params, axiosConfig);
  }
  /**
   * 封装patch请求
   * @param url 请求地址
   * @param param 请求参数
   * @param axiosConfig 请求配置
   */
  public patch<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    axiosConfig?: AxiosHttpRequestConfig,
  ): Promise<P> {
    return this.request<P>("patch", url, params, axiosConfig);
  }
}

export const http = new CreateAxios();
