import React from "react";
import styled from "styled-components";
import CardShop from "../assets/card.svg";
import { useSelector, useDispatch } from "react-redux";
import { openShopCard } from "../app/slices/TodoSlice";

const HeaderContent = styled.div`
    width: 100%;
    height: 101px;
    background-color: #0f52ba;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
const TitleContent = styled.div`
    padding-left: 65px;
    display: flex;
    align-items: center;
    gap: 10px;
  `;
const Title = styled.p`
    font-weight: 600;
    font-size: 40px;
    color: #ffffff;
  `;
const SubTitle = styled.p`
  font-weight: 300;
  font-size: 20px;
  color: #ffffff;
`;
const ButtonContainer = styled.div`
    padding-right: 65px;
  `;
const ButtonShop = styled.button`
    min-width: 90px;
    min-height: 45px;
    border: none;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    background: #ffffff;

    &:hover {
      background-color: #E0E0E0;
    }
  `;

export const MainHeader = () => {
  const counter = useSelector((state) => state.todo.productsShop);
  const dispatch = useDispatch();

  const handleOpenCard = () => {
    dispatch(openShopCard());
  };

  return (
    <HeaderContent>
      <TitleContent>
        <Title>MKS</Title>
        <SubTitle>Sistemas</SubTitle>
      </TitleContent>
      <ButtonContainer>
        <ButtonShop onClick={handleOpenCard}>
          <img src={CardShop} alt="card-shop" />
          {counter.length}
        </ButtonShop>
      </ButtonContainer>
    </HeaderContent>
  );
};
