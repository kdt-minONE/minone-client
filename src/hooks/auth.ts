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
