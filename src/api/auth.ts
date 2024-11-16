import axios from "axios";
import { userSign } from "../interface/authInterface";

export const userSignup = async (data: userSign) => {
  // console.log(data);
  try {
    const response = await axios.post(
      `https://front-mission.bigs.or.kr/auth/signup`,
      data,
    );
    // console.log(response);
    return response.status;
  } catch (error: any) {
    if (error.response) {
      // console.error("Server Response Error:", error.response.data);
      const errMessage = error.response.data;
      // console.log(errMessage);
      for (const [title, messages] of Object.entries(errMessage)) {
        if (Array.isArray(messages)) {
          // console.error(`${title} Error:`, messages[0]);
          return { title, messages };
        }
      }
    } else {
      console.error("Request Error:", error.message);
    }
    // throw error;
  }
};

export const userSignin = async (data: userSign) => {
  // console.log(data);
  try {
    const response = await axios.post(
      `https://front-mission.bigs.or.kr/auth/signin`,
      data,
    );
    console.log(response);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    // console.log(error);
    const errMessage = error.response.data.message;
    // console.log(errMessage);
    return errMessage;
  }
};
