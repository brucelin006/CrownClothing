import { FC } from "react";

import { ItemDetails, CartItemContainer } from "./cart-item.styles.jsx";

import { CartItem } from "../../store/cart/cart.types.js";

type CartItemProps = {
  cartItem: CartItem;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
