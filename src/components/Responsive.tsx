import React from "react";
import styled from "styled-components";

const ResponsiveBlock = styled.div`
  margin: 0 auto;
  width: calc(100% - 120px);
  max-width: 100%;
  @media (min-width: 1256px) {
    width: 1136px;
  }
  @media (max-width: 1024px) {
    width: calc(100% - 120px);
  }
  @media (max-width: 768px) {
    width: calc(100% - 80px);
  }
  @media (max-width: 375px) {
    width: calc(100% - 30px);
  }
`;

type ResponsiveProps = {
    children: React.ReactNode;
};

const Responsive = ({ children, ...rest }: ResponsiveProps) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
