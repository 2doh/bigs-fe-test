import React from "react";
import styled from "@emotion/styled";

const ViewPost = () => {
  return (
    <Container>
      <Title>게시글 제목입니다</Title>

      <MetaInfo>
        <span>작성자: 홍길동</span>
        <span>작성일: 2024.01.01</span>
      </MetaInfo>

      <ContentArea>게시글 내용이 여기에 표시됩니다.</ContentArea>

      <ImageWrapper>
        <img
          src="https://via.placeholder.com/600x400"
          alt="게시글 이미지"
          style={{ maxWidth: "100%" }}
        />
      </ImageWrapper>

      <ActionButtons>
        <Button>수정</Button>
        <Button>목록</Button>
      </ActionButtons>
    </Container>
  );
};

export default ViewPost;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  margin-bottom: 20px;
`;

const ContentArea = styled.div`
  min-height: 300px;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 15px;
  border: none;
  cursor: pointer;
`;
