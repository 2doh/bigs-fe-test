import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AuthErrMsg from "../components/auth/AuthErrMsg";
import AuthInput from "../components/auth/AuthInput";
import "../scss/user/login.scss";

export interface userSign {
  userMail?: string;
  userPass?: string;
  userName?: string;
  userConfirmPass?: string;
}

const initTitle = [
  { label: "이메일", title: "userMail" },
  { label: "비밀번호", title: "userPass" },
];

const joinTitle = [
  { label: "이메일", title: "userMail" },
  { label: "이름", title: "userName" },
  { label: "비밀번호", title: "userPass" },
  { label: "비밀번호 확인", title: "userConfirmPass" },
];

const initSignupState = {
  userMail: "",
  userPass: "",
  userName: "",
  userConfirmPass: "",
};

const signupSchema = yup.object().shape({
  userMail: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  userPass: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/,
      "비밀번호는 8자 이상 영어와 숫자 및 특수문자의 조합으로 입력해 주세요.",
    ),
  userConfirmPass: yup
    .string()
    .oneOf([yup.ref("userPass")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요"),
  userName: yup
    .string()
    .required("이름을 입력해주세요.")
    .matches(/^[가-힣a-zA-Z\s]+$/, "유효한 이름이 아닙니다."),
});

const Auth = (): JSX.Element => {
  const [initState, setInintState] = useState("login");
  const [titleState, setTitleState] = useState(initTitle);
  const [clearTrigger, setClearTrigger] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: initSignupState,
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const handleOnClick = () => {
    // console.log(initState);
    setClearTrigger(true);
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
    console.log("aa");
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
          <button className="login-button">
            {initState === "login" ? "로그인" : "회원가입"}
          </button>
          <div className="link-container">
            <p
              className="link"
              onClick={() => {
                handleOnClick();
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
