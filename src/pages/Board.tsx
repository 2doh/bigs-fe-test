import styled from "@emotion/styled";
import Header from "../components/Header";
import { useEffect } from "react";

const Board = () => {
  const initArr = ["제목", "구분", "작성일자"];

  useEffect(() => {
    null;
  }, []);

  return (
    <BoardWrapStyle>
      <Header />
      <BoardStyle>
        <BoardInner>
          <BoardInnerTop>
            <BoardGuide></BoardGuide>
          </BoardInnerTop>
          <BoardInnerBottom>
            <PostStyle>11</PostStyle>
          </BoardInnerBottom>
        </BoardInner>
      </BoardStyle>
    </BoardWrapStyle>
  );
};

export default Board;

const BoardWrapStyle = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const BoardStyle = styled.div`
  background-color: azure;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BoardInner = styled.div`
  width: 70vw;
  height: 100%;
  min-height: 90vh;
  background-color: #aaaa99;
`;

const BoardInnerTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoardInnerBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoardGuide = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: flex;
`;

const PostStyle = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 30px;
`;
