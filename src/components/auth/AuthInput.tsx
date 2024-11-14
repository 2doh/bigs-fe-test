import React, { useEffect, useState } from "react";
import usePlaceholder from "../../hook/usePlaceholder";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import styled from "@emotion/styled";

interface AuthData {
  label: string;
  clearTrigger: boolean;
  setClearTrigger: any;
}

const AuthInputWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const BTWrapStyle = styled.div`
  gap: 10px;
  display: flex;
  position: absolute;
  right: 0;
  margin-right: 10px;
  align-items: center;
`;

const AuthInput = ({
  label,
  clearTrigger,
  setClearTrigger,
}: AuthData): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const clearInput = () => {
    setInputValue("");
  };
  const { placeholder, handleFocus, handleBlur } = usePlaceholder(label);

  useEffect(() => {
    clearInput();
    setClearTrigger(false);
    setVisiblePass(false);
  }, [clearTrigger]);

  return (
    <div key={label} className="input-wrap">
      <label className="label">{label}</label>
      <AuthInputWrap>
        <input
          value={inputValue}
          className="input"
          onFocus={() => handleFocus()}
          onBlur={() => handleBlur()}
          onChange={e => {
            setInputValue(e.target.value);
          }}
          type={
            label === "이메일"
              ? "email"
              : label.includes("비밀번호")
                ? visiblePass
                  ? "text"
                  : "password"
                : "text"
          }
          placeholder={placeholder}
        ></input>
        <BTWrapStyle>
          {label.includes("비밀번호") &&
            inputValue &&
            (!visiblePass ? (
              <FaEyeSlash
                style={{ width: "20px", height: "20px" }}
                onClick={() => setVisiblePass(true)}
              />
            ) : (
              <FaEye
                style={{ width: "20px", height: "20px" }}
                onClick={() => setVisiblePass(false)}
              />
            ))}
          {inputValue && (
            <MdCancel
              style={{ width: "20px", height: "20px" }}
              onClick={() => clearInput()}
            />
          )}
        </BTWrapStyle>
      </AuthInputWrap>
    </div>
  );
};

export default AuthInput;
