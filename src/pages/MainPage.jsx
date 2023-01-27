import React, { useState, useEffect } from "react";
import axios from "axios";
import { MainHeader } from "../components/Header";
import { MainFooter } from "../components/Footer";
import { CardShop } from "../components/CardShop";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { HiShoppingBag } from "react-icons/hi";
import { addCardProduct, increment } from "../app/slices/TodoSlice";


const HeaderSkeleton = styled.div`
  height: 101px;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const FooterSkeleton = styled.div`
  height: 34px;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 4px;
`;
const WholePage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
`;
const ProductCard = styled.div`
  width: 218px;
  height: 285px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 8px;
`;
const ProductPhoto = styled.img`
  width: 111px;
  height: 138px;
`;
const ProductRow = styled.div`
  display: flex;
  gap: 4px;
`;
const ProductName = styled.p`
  width: 124px;
  height: 38px;
  font-size: 16px;
`;
const ProductPrice = styled.div`
  width: 64px;
  height: 26px;
  background: #373737;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  color: #ffffff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductDescription = styled.p`
  width: 192px;
  height: 25px;
  font-size: 10px;
`;
const ButtonAdd = styled.button`
  border: none;
  background: transparent;
  display: flex;
  position: absolute;
  bottom: 0;
  background: #0f52ba;
  width: 218px;
  height: 31px;
  align-items: center;
  justify-content: center;
  border-radius: 0px 0px 8px 8px;
  cursor: pointer;
  color: #ffffff;
  gap: 14px;

  &:hover {
    background-color: #3B7FE4;
  }
`;
const TitleBuy = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

export const MainPage = () => {
  const card = useSelector((state) => state.todo.open);
  const [datas, setDatas] = useState(null);

  const dispatch = useDispatch();

  const handleIncrement = (name, id, price, photo, amount) => {
    dispatch(addCardProduct({ name, id, price, photo, amount }));
  };

  useEffect(() => {
    axios
      .get(
        "https://mks-challenge-api-frontend.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC"
      )
      .then((response) => setDatas(response.data.products))
      .catch((error) => console.log(error));
  }, []);

  if (!datas) {
    return (
      <WholePage>
        <HeaderSkeleton />
        <ProductsContainer>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductsContainer>
        <FooterSkeleton />
      </WholePage>
    );
  }

  return (
    <WholePage>
      <MainHeader />
      {card && <CardShop />}
      <ProductsContainer>
        {datas.map((data) => {
          return (
            <ProductCard key={data.id}>
              <ProductPhoto src={data.photo} alt="img product" />
              <ProductRow>
                <ProductName>{data.name}</ProductName>
                <ProductPrice>R${parseInt(data.price)}</ProductPrice>
              </ProductRow>
              <ProductDescription>{data.description}</ProductDescription>
              <ButtonAdd
                onClick={() =>
                  handleIncrement(
                    data.name,
                    data.id,
                    parseInt(data.price),
                    data.photo,
                    1,
                  )
                }
              >
                <HiShoppingBag />
                <TitleBuy>Comprar</TitleBuy>
              </ButtonAdd>
            </ProductCard>
          );
        })}
      </ProductsContainer>
      <MainFooter />
    </WholePage>
  );
};
