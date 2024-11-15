import styled from "@emotion/styled";
import React from "react";

const AuthErrMsgStyle = styled.div`
  width: 100%;
  margin-top: 10px;
  /* text-align: center; */
  color: red;
`;

interface AuthErrMsgProps {
  errorMsg: string | undefined;
}

const AuthErrMsg = ({ errorMsg }: AuthErrMsgProps) => {
  return <>{errorMsg && <AuthErrMsgStyle>* {errorMsg}</AuthErrMsgStyle>}</>;
};

export default AuthErrMsg;
