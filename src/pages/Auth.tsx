import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import "../scss/user/login.scss";

const initTitle = [{ label: "이메일" }, { label: "비밀번호" }];

const joinTitle = [
  { label: "이메일" },
  { label: "이름" },
  { label: "비밀번호" },
  { label: "비밀번호 확인" },
];

const Auth = (): JSX.Element => {
  const [initState, setInintState] = useState("login");
  const [titleState, setTitleState] = useState(initTitle);
  const [clearTrigger, setClearTrigger] = useState(false);

  const handleOnClick = () => {
    // console.log(initState);
    setClearTrigger(true);
    if (initState === "login") {
      setInintState("signup");
      setTitleState(joinTitle);
    }
    if (initState === "signup") {
      setInintState("login");
      setTitleState(initTitle);
    }
  };

  return (
    <div className="container">
      <h1 className="title">{initState === "login" ? "로그인" : "회원가입"}</h1>
      <div className="inner">
        <form className="form">
          {/* {initState === "login" ? ( */}
          <>
            {titleState.map(item => (
              <AuthInput
                key={item.label}
                label={item.label}
                clearTrigger={clearTrigger}
                setClearTrigger={setClearTrigger}
              ></AuthInput>
            ))}
          </>
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
