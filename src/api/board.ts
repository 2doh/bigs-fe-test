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
