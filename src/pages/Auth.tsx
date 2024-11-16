import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AuthErrMsg from "../components/auth/AuthErrMsg";
import AuthInput from "../components/auth/AuthInput";
import "../scss/user/login.scss";
import { userSignin, userSignup } from "../api/auth";
import { setCookie } from "../util/cookie";
import base64 from "base-64";
import { userSign } from "../interface/authInterface";
import { useNavigate } from "react-router-dom";

const initTitle = [
  { label: "이메일", title: "username" },
  { label: "비밀번호", title: "password" },
];

const joinTitle = [
  { label: "이메일", title: "username" },
  { label: "이름", title: "name" },
  { label: "비밀번호", title: "password" },
  { label: "비밀번호 확인", title: "confirmPassword" },
];

const initSignupState = {
  username: "",
  password: "",
  name: "",
  confirmPassword: "",
};

const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&@#])[A-Za-z\d!%*#?&@#]{8,}$/,
      "비밀번호는 8자 이상 영어와 숫자 및 특수문자의 조합으로 입력해 주세요.",
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요"),
  name: yup
    .string()
    .required("이름을 입력해주세요.")
    .matches(/^[가-힣a-zA-Z\s]+$/, "유효한 이름이 아닙니다."),
});

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 최소 8자 이상입니다."),
});

const Auth = (): JSX.Element => {
  const [initState, setInintState] = useState("login");
  const [titleState, setTitleState] = useState(initTitle);
  const [clearTrigger, setClearTrigger] = useState(false);
  const navi = useNavigate();
  const schema = initState === "login" ? loginSchema : signupSchema;

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
    setError,
  } = useForm({
    defaultValues: initSignupState,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // console.log(initState);
    setClearTrigger(true);
    reset(initSignupState);
    clearErrors();
    if (initState === "login") {
      setInintState("signup");
      setTitleState(joinTitle);
    }
    if (initState === "signup") {
      setInintState("login");
      setTitleState(initTitle);
    }
  };

  const handleOnSubmit = async (data: userSign) => {
    // console.log(data);
    if (initState === "signup") {
      const result = await userSignup(data);
      // console.log(result);
      if (typeof result === "number" && result === 200) {
        // console.log("회원가입 성공");
        alert("회원가입 되었습니다.");
        setInintState("login");
      }
      if (typeof result === "object") {
        // console.log(result.messages[0], result.title);
        setError("root", { type: "server", message: result.messages[0] });
      }
    }
    if (initState === "login") {
      const signinData = {
        username: data.username,
        password: data.password,
      };
      const result = await userSignin(signinData);
      if (typeof result === "object" && result.status === 200) {
        // console.log("로그인 성공");
        setCookie("accesstoken", result.data.accessToken);
        const token = result.data.accessToken;
        const payload = token.split(".")[1];
        const payloadToJson = JSON.parse(base64.decode(payload));
        // console.log(payloadToJson);
        const sigedUser = {
          userName: payloadToJson.name,
          userId: payloadToJson.username,
        };
        setCookie("name", sigedUser.userName);
        setCookie("username", sigedUser.userId);
        // console.log(sigedUser);
        navi("/board");
      }
      if (typeof result === "string") {
        // alert(result);
        setError("root", { type: "server", message: result });
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">{initState === "login" ? "로그인" : "회원가입"}</h1>
      <div className="inner">
        <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
          {/* {initState === "login" ? ( */}
          {titleState.map(item => (
            <AuthInput
              key={item.label}
              label={item.label}
              clearTrigger={clearTrigger}
              setClearTrigger={setClearTrigger}
              register={register}
              title={item.title}
            ></AuthInput>
          ))}
          {/* ) : (
            <>
              {joinTitle.map(item => (
                <AuthInput
                  key={item.label}
                  label={item.label}
                  placeholder={item.placeholder}
                ></AuthInput>
              ))}
            </>
          )} */}
          {titleState.map(item => (
            <AuthErrMsg
              errorMsg={(errors as any)[item.title]?.message}
              key={item.label}
            ></AuthErrMsg>
          ))}
          {errors.root && <AuthErrMsg errorMsg={errors.root.message} />}
          <button className="login-button">
            {initState === "login" ? "로그인" : "회원가입"}
          </button>
          <div className="link-container">
            <p
              className="link"
              onClick={e => {
                handleOnClick(e);
              }}
            >
              {initState === "login" ? "회원가입" : "이미 계정이 있습니까?"}
            </p>
            {/* <p className="link">비밀번호 찾기</p> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
