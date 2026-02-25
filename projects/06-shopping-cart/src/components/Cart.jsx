import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./icons";    
import './Cart.css'
import { useCart } from "../hooks/useCart";

function CartItem ({ thumbnail, price, title, quantity, addToCart }) {
    return (
        <li>
            <img src={thumbnail} alt={title} 
            />
        
        <div>
            <strong>{title}</strong> -${price}
        </div>

        <footer>
            <small>
                Qty: {quantity}
            </small>
            <button className="plus" onClick={addToCart}>+</button>
        </footer>
        </li>
    )
}

export function Cart (){
    const cartCheckboxId = useId()
    const  { cart, clearCart, addToCart } = useCart()

    return (
        <>
        <label className="cart-button" htmlFor={cartCheckboxId}>
            <CartIcon />
        </label>
        <input id={cartCheckboxId} type="checkbox" hidden />

        <aside className="cart">
            <ul>
                {cart.map(product => (
                <CartItem  
                key={product.id}
                addToCart={() => addToCart(product)} 
                {...product}/> //funcío que se la pasamos como prop para añadir especificamente ese producto

                ))}
            </ul>
               

            <button onClick={clearCart}>
                <ClearCartIcon />
            </button>
        </aside>
        </>
    )
}