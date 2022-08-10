import { useContext } from 'react';
import {ProductCardCotainer, Img, Footer, Name, Price,CustomButton} from './product-card.styles';
import { CartContext } from '../../contexts/cart.context';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';


const ProductCard =({product})=>{

    const {name, price, imageUrl} = product
    const {addItemToCart} = useContext(CartContext)
    
    const addProductToCart = ()=> addItemToCart(product)
    
    return(
        <ProductCardCotainer>
            <Img src={imageUrl} />
            <Footer>
                
                <Name>{name}</Name>
                <Price className='price'>{price}</Price>            
            </Footer>
            <CustomButton buttonType={BUTTON_TYPE_CLASSES.InvertedButton} onClick={addProductToCart}>Add to card</CustomButton>
        </ProductCardCotainer>
    )
}

export default ProductCard