import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/board";
import userState from "../store/userState";

type Category = {
  title: string;
  category: string;
};

const Header = () => {
  const navi = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const { userId, userName } = userState();
  const handleGetCategories = async () => {
    const result = await getCategories();
    console.log(result);
    if (result.status === 200) {
      const categorieArr: Category[] = [];
      for (const [title, category] of Object.entries(result.data)) {
        categorieArr.push({ title, category: category as string });
      }
      console.log(categorieArr);
      setCategories(categorieArr);
    }
    if (result === "토큰이 만료되었습니다") {
      alert("로그인 만료 기간이 지났습니다. 다시 시도해 주세요");
      navi("/");
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <HeaderWrapStyle>
      {categories.map((item, index) => (
        <CategoryItem key={index}>{item.category}</CategoryItem>
      ))}
      <UserStateWrapStyle>
        <UserStateStyle>{userId}</UserStateStyle>
        <UserStateStyle>{userName}</UserStateStyle>
      </UserStateWrapStyle>
    </HeaderWrapStyle>
  );
};

export default Header;

const HeaderWrapStyle = styled.div`
  width: 100%;
  height: 50px;
  background-color: #d6d9e0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 16px;
`;

const CategoryItem = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
`;

const UserStateWrapStyle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const UserStateStyle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
