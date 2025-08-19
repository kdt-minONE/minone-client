import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

// tslint:disable-next-line: interface-name
export interface UseAxiosResponse {
  called: boolean;
  data: any;
  loading: boolean;
  error: any;
}
export type UseAxiosPromise = Promise<AxiosResponse<any>>;
export type UseAxiosType = [
  (config?: AxiosRequestConfig) => UseAxiosPromise,
  UseAxiosResponse
];

const axios = Axios.create({
  baseURL: "http://localhost:8081/api/v1",
});

export const useAxios = (): UseAxiosType => {
  const { accessToken, logout } = useAuthStore();

  const [data, setData] = useState<any>();
  const [error, setError] = useState<AxiosError<any>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [called, setCalled] = useState<boolean>(false);
  const [response, setResponse] = useState<UseAxiosResponse>({
    error,
    loading,
    called,
    data,
  });

  const request = useCallback(
    async (config?: AxiosRequestConfig) => {
      setCalled(false);
      setLoading(true);
      setData(undefined);
      setError(undefined);

      config = {
        ...config,
        headers: {
          ...config?.headers,
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      };

      try {
        const res = await axios(config);
        setData(res?.data);

        return res;
      } catch (e: any) {
        const error = e?.response?.data?.message
          ? e?.response?.data?.message
          : e;
        setError(error);

        if (e.response && e.response.status === 401) {
          // 토큰이 만료되거나 유효하지 않은 경우
          logout();
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          window.location.replace("/");
        }
        throw error;
      } finally {
        setCalled(true);
        setLoading(false);
      }
    },
    [accessToken, logout]
  );

  useEffect(() => {
    setResponse({
      error,
      loading,
      called,
      data,
    });
  }, [error, loading, data, called]);

  return [request, response];
};
