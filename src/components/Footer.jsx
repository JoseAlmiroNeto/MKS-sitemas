import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
    width: 100%;
    height: 34px;
    background: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const Authorial = styled.p`
    font-size: 12px;
    color: #000000;
  `;

export const MainFooter = () => {
  return (
    <FooterContainer>
      <Authorial>MKS sistemas © Todos os direitos reservados</Authorial>
    </FooterContainer>
  );
};
