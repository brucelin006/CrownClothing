import styled from "styled-components";

export const RemoveButton = styled.span`
  padding-left: 12px;
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const BaseSpan = styled.span`
  width: 23%;
`;

export const Quantity = styled(BaseSpan)`
  display: flex;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;
