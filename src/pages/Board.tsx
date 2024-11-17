import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { checkListPost } from "../api/board";
import { useNavigate } from "react-router-dom";

interface PostItem {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

const Board = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [totalPages, setToTalPages] = useState<number>(0);
  const navi = useNavigate();

  const createDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const formatCategories = (categoryString: string) => {
    if (categoryString === "NOTICE") {
      return "공지";
    }
    if (categoryString === "FREE") {
      return "자유";
    }
    if (categoryString === "ETC") {
      return "기타";
    }
  };

  const handleWriteClick = () => {
    // 글쓰기 버튼 클릭 시 처리할 로직
    // console.log("글쓰기 버튼 클릭됨");
    navi("/write");
  };

  const handleGetListPost = async () => {
    const result = await checkListPost();
    if (!result || !result.data) {
      console.log("에러 발생. 문의 부탁드립니다.");
      return;
    }
    console.log(result);
    setToTalPages(result.data.totalPages);
    setPosts(result.data.content);
  };

  useEffect(() => {
    handleGetListPost();
  }, []);

  return (
    <PageWrapper>
      <BoardContainer>
        <Header />
        <WriteButton onClick={handleWriteClick}>글쓰기</WriteButton>
        <BoardTable>
          <thead>
            <tr>
              <TableHeader>번호</TableHeader>
              <TableHeader>카테고리</TableHeader>
              <TableHeader>제목</TableHeader>
              <TableHeader>작성시간</TableHeader>
            </tr>
          </thead>
          <tbody>
            {posts.map(item => (
              <tr key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{formatCategories(item.category)}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{createDate(item.createdAt)}</TableCell>
              </tr>
            ))}
          </tbody>
        </BoardTable>
        <PaginationContainer>
          {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => (
            <PageButton key={index + 1}>{index + 1}</PageButton>
          ))}
        </PaginationContainer>
      </BoardContainer>
    </PageWrapper>
  );
};

export default Board;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const BoardContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const BoardTable = styled.table`
  width: 100%;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const WriteButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  margin-bottom: 10px;

  &:hover {
    background-color: #45a049;
  }
`;
