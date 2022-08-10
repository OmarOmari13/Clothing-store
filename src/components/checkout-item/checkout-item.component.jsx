import { useContext } from 'react'
import {Arrow, CheckOutItemContainer, ImageContainer, Img, Name, Price, Quantity, RemoveButton} from './checkout-item.styles'

import { CartContext } from '../../contexts/cart.context'

const CheckOutItem = ({cartItem})=>{
    const {name,price, imageUrl, quantity} = cartItem

    const {clearItemToCart , addItemToCart, removeItemToCart} = useContext(CartContext)

    const clearCartHandler=()=> clearItemToCart(cartItem);
    const addItemHandler =()=> addItemToCart(cartItem)
    const removeToCartHandler=()=>removeItemToCart(cartItem)
    return(
        <CheckOutItemContainer>
            <ImageContainer>
                <Img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name>{name}</Name>
            
            
            <Quantity>
                <Arrow onClick={removeToCartHandler}>
                    &#10094;
                </Arrow>
                &nbsp;&nbsp;
                {quantity}

                &nbsp;&nbsp;

                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
                
                </Quantity>
            
            
            <Price>{price}</Price>
            <RemoveButton onClick={clearCartHandler}>&#10005;</RemoveButton>
        </CheckOutItemContainer>
    )
}

export default CheckOutItem