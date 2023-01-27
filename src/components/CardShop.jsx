import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addCardProduct,
  closeShopCard,
  exclusionProduct,
  incrementDecrementProduct,
} from "../app/slices/TodoSlice";

const Content = styled.div`
  width: 480px;
  height: 100vh;
  background: #0f52ba;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 0 7px rgb(0 0 0 / 0.05);
  z-index: 40;
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 927px;
  justify-content: space-between;
  padding-top: 36px;
  padding-bottom: 42px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 35px;
  padding-right: 35px;
`;

const ColumnProducts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 600px;
  gap: 22px;
`;

const Products = styled.div`
  width: 379px;
  height: 95px;
  background: #ffffff;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

const ImgProduct = styled.img`
  width: 46px;
  height: 57px;
`;

const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AmountTitle = styled.p`
  font-size: 10px;
  width: 11px;
  height: 6px;
`;

const AmountIncrement = styled.div`
  width: 65px;
  height: 28px;
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 15px;
`;

const PriceProduct = styled.div`
  width: 62px;
  height: 17px;
  font-weight: 700;
  font-size: 14px;
`;

const PriceTotal = styled.div`
  font-weight: 700;
  font-size: 28px;
  color: #ffffff;
`;

const NameProduct = styled.div`
  width: 133px;
  height: 33px;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 27px;
  width: 180px;
  height: 56px;
  color: #ffffff;
`;

const ButtonClose = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 99px;
  background: #000000;
  color: #ffffff;
  font-size: 28px;
  cursor: pointer;
`;

const ButtonDecrement = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 99px;
  background: #000000;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

const ButtonFinished = styled.button`
  width: 100%;
  height: 97px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  background: #000000;
  color: #ffffff;
  font-weight: 700;
  font-size: 28px;
`;

const ButtonAmount = styled.button`
  background: transparent;
  border: none;
  width: 10px;
  border-radius: 2px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export function CardShop() {
  const arrContext = useSelector((state) => state.todo.productsShop);
  const [arrProducts, setArrProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setArrProducts([...arrContext])
  }, [arrContext])

  const uniqueData = [...new Set(arrProducts.map((item) => item.id))].map(
    (id) => arrProducts.find((item) => item.id === id)
  );

  const valueOfEach = uniqueData.map(({ amount, price }) => {
    return amount * price
  });

  const totalToPay = valueOfEach.reduce(
    (acctualValue, currentValue) => acctualValue + currentValue,
    0
  );

  const handleIncreDecreAmount = (id, increment) => {
    const productsCopy = JSON.parse(JSON.stringify(uniqueData));
    const product = productsCopy.find((product) => product.id === id);
    if (!product) return;
    if (increment) {
      product.amount += 1;
    } else {
      if (product.amount > 1) {
        product.amount -= 1;
      }
    }
    setArrProducts(productsCopy);
    dispatch(incrementDecrementProduct(productsCopy))
  };

  const handleExclusion = (id) => {
    let index = uniqueData.findIndex((x) => x.id === id);
    const exclusionObj = uniqueData.splice(index, 1);
    setArrProducts([...exclusionObj])
    dispatch(exclusionProduct(uniqueData));
  };

  const handleCloseCard = () => {
    dispatch(closeShopCard());
  };

  return (
    <Content>
      <ContentInfo>
        <Row>
          <Title>Carrinho de Compras</Title>
          <ButtonClose onClick={handleCloseCard}>X</ButtonClose>
        </Row>
        <ColumnProducts>
          {uniqueData.map((product) => {
            return (
              <Products key={product.id}>
                <ImgProduct src={product.photo}></ImgProduct>
                <NameProduct>{product.name}</NameProduct>
                <AmountContainer>
                  <AmountTitle>Qtd:</AmountTitle>
                  <AmountIncrement>
                    <ButtonAmount
                      onClick={() => handleIncreDecreAmount(product.id)}
                    >
                      -
                    </ButtonAmount>{" "}
                    | {product.amount} |
                    <ButtonAmount
                      onClick={() =>
                        handleIncreDecreAmount(product.id, "increment")
                      }
                    >
                      +
                    </ButtonAmount>
                  </AmountIncrement>
                </AmountContainer>
                <PriceProduct>R${product.price}</PriceProduct>
                <ButtonDecrement onClick={() => handleExclusion(product.id)}>
                  X
                </ButtonDecrement>
              </Products>
            );
          })}
        </ColumnProducts>
        <Row>
          <PriceTotal>Total:</PriceTotal>
          <PriceTotal>R${totalToPay}</PriceTotal>
        </Row>
      </ContentInfo>
      <ButtonFinished>Finalizar Compras</ButtonFinished>
    </Content>
  );
}
