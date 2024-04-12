import api from "./axios";
import { useAuthStore } from "@/storage/auth";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const setAuthUser = (access_token, refresh_token) => {
  Cookies.set("access_token", access_token, {
    expires: 1,
    secure: true,
  });

  Cookies.set("refresh_token", refresh_token, {
    expires: 7,
    secure: true,
  });

  const user = jwt_decode(access_token) ?? null;

  if (user) {
    useAuthStore.getState().setUser(user);
  }
  useAuthStore.getState().setLoading(false);
};

export const setUser = async () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  if (!accessToken || !refreshToken) {
    return;
  }

  if (isAccessTokenExpired(accessToken)) {
    const response = await getRefreshToken(refreshToken);
    setAuthUser(response.access, response.refresh);
  } else {
    setAuthUser(accessToken, refreshToken);
  }
};

export const getRefreshToken = async (refresh) => {
  // const refresh_token = Cookies.get('refresh_token');
  const response = await api.post("auth/jwt/refresh/", {
    refresh,
  });

  return response.data;
};

export const isAccessTokenExpired = (accessToken) => {
  try {
    const decodedToken = jwt_decode(accessToken);
    return decodedToken.exp < Date.now() / 1000;
  } catch (e) {
    return true;
  }
};

export const login = async (email, password) => {
  const response = await api.post("auth/jwt/token/", {
    email,
    password,
  });

  return response;
};

export const register = async (email, password, re_password) => {
  const response = await api.post("auth/users/", {
    email,
    password,
    re_password,
  });

  return response;
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  useAuthStore.getState().setUser(null);
};
