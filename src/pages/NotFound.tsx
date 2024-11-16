import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navi = useNavigate();
  return (
    <BackGroundStyle>
      <TextWrapStyle>
        <TextStyle>404 Not Found</TextStyle>
        <BtnStyle onClick={() => navi("/")}>홈으로</BtnStyle>
      </TextWrapStyle>
    </BackGroundStyle>
  );
};

export default NotFound;

const BackGroundStyle = styled.div`
  background-color: #f3f4f6;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const TextWrapStyle = styled.div`
  position: absolute;
  top: 35%;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const TextStyle = styled.h1`
  font-size: 80px;
  font-weight: 700;
`;

const BtnStyle = styled.button`
  margin-top: 50px;
  width: 400px;
  height: 70px;
  /* background-color: red; */
  font-size: 30px;
`;
