import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "@emotion/styled";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { writingPost } from "../api/board";

export interface PostData {
  title: string;
  content: string;
  //   image: File | null;
  category: string;
}

const WritePost = () => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    content: "",
    // image: null,
    category: "NOTICE",
  });

  const categories = {
    NOTICE: "공지",
    FREE: "자유",
    QNA: "Q&A",
    ETC: "기타",
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, title: e.target.value });
  };

  //   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files ? e.target.files[0] : null;
  //     setPostData({ ...postData, image: file });
  //   };

  const handleChange = (value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setPostData({ ...postData, content: sanitizedValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postData.content === "<p><br></p>" || postData.title === "") {
      alert("제목 또는 내용을 입력해주세요.");
      return;
    }
    console.log("제출된 데이터:", postData);
    // 글 등록 후 response 처리 필요
    const result = await writingPost(postData);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPostData({ ...postData, category: e.target.value });
  };

  return (
    <PageWrapper>
      <Container>
        <Form onSubmit={e => handleSubmit(e)}>
          <TitleInput
            placeholder="제목을 입력하세요"
            value={postData.title}
            onChange={handleTitleChange}
          />

          <CategorySelect
            value={postData.category}
            onChange={handleCategoryChange}
          >
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </CategorySelect>

          <ReactQuill
            style={{ height: "300px", marginBottom: "70px" }}
            value={postData.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
          />
          {/* <ImageUploadWrapper>
            <UploadButton>
              이미지 업로드
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </UploadButton>
          </ImageUploadWrapper> */}

          <SubmitButton type="submit">작성 완료</SubmitButton>
        </Form>
      </Container>
    </PageWrapper>
  );
};

export default WritePost;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

// const ImageUploadWrapper = styled.div`
//   display: flex;
//   margin-bottom: 20px;
// `;

// const UploadButton = styled.button`
//   padding: 10px 15px;
//   background-color: #f2f2f2;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   cursor: pointer;
// `;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const CategorySelect = styled.select`
  width: 25vw;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;
