import { PostData } from "../pages/WritePost";
import jwtAxios from "./jwtUtil";

export const getCategories = async () => {
  try {
    const response = await jwtAxios.get(
      `https://front-mission.bigs.or.kr/boards/categories`,
    );
    return response;
  } catch (error: any) {
    // console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const checkListPost = async () => {
  try {
    const response = await jwtAxios.get(
      `https://front-mission.bigs.or.kr/boards?page=0&size=10`,
    );
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const writingPost = async (data: PostData) => {
  try {
    const response = await jwtAxios.post(
      `
      https://front-mission.bigs.or.kr/boards`,
    );
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
