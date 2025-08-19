import { useCallback } from "react";
import { useAxios } from "./axios";
import { SignupFormData } from "../components/SignupModal";

export const useSignup = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    (data: SignupFormData) => {
      return request({
        url: "auth/signup",
        method: "POST",
        data: {
          email: data.email,
          phone: data.phone,
          password: data.password,
          name: data.name,
        },
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};

export const useLogin = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    (email: string, password: string) => {
      return request({
        url: "auth/login",
        method: "POST",
        data: {
          email,
          password,
        },
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};

// 사용자 정보 조회
export const useGetUser = () => {
  const [request, response] = useAxios();

  const run = useCallback(() => {
    return request({
      url: "users/me",
      method: "GET",
    });
  }, [request]);

  return [run, response] as [typeof run, typeof response];
};

// 사용자 비밀번호 변경
export const useUpdateUserPassword = () => {
  const [request, response] = useAxios();

  const run = useCallback(
    (oldPassword: string, newPassword: string) => {
      return request({
        url: "users/me",
        method: "PATCH",
        data: {
          oldPassword,
          newPassword,
        },
      });
    },
    [request]
  );

  return [run, response] as [typeof run, typeof response];
};

// 사용자 계정 삭제
export const useDeleteUser = () => {
  const [request, response] = useAxios();

  const run = useCallback(() => {
    return request({
      url: "users/me",
      method: "DELETE",
    });
  }, [request]);

  return [run, response] as [typeof run, typeof response];
};
