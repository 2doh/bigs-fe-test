import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "../util/cookie";

export const jwtAxios = axios.create();

const beforeReq = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  const accessToken = getCookie("accesstoken");
  if (!accessToken) {
    return Promise.reject({
      response: { data: { error: "Login 하셔서 인증받으세요." } },
    });
  }
  if (config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const failReq = (err: AxiosError): Promise<AxiosError> => {
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, failReq);

const refereshJWT = async (reFreshToken: string): Promise<string> => {
  const res = await axios.post(
    `https://front-mission.bigs.or.kr/auth/refresh`,
    { refreshToken: reFreshToken }, // Body에 refreshToken 전달
  );
  return res.data.accessToken; // API 응답 형식에 맞게 수정
};

// Response Interceptor
jwtAxios.interceptors.response.use(
  async res => res, // 성공 응답 그대로 반환
  async err => {
    if (err.response?.status === 401) {
      // 토큰 만료 상황 처리
      const reFreshToken = getCookie("refresh-token");
      if (!reFreshToken) return Promise.reject(err); // 리프레시 토큰 없으면 에러 반환

      try {
        // 리프레시 토큰으로 새 액세스 토큰 요청
        const newAccessToken = await refereshJWT(reFreshToken);

        // 새 토큰 저장
        setCookie("accessToken", newAccessToken);

        // 실패한 요청 재시도
        if (err.config.headers) {
          err.config.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return jwtAxios(err.config);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우 추가 처리 가능
        console.error("리프레시 토큰 만료:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err); // 기타 오류 처리
  },
);

export default jwtAxios;
