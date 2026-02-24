import { useId } from "react";
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from "./icons";    
import './Cart.css'

export function Cart (){
    const cartCheckboxId = useId()

    return (
        <>
        <label className="cart-button" htmlFor={cartCheckboxId}>
            <CartIcon />
        </label>
        <input id={cartCheckboxId} type="checkbox" hidden />

        <aside className="cart">
            <ul>
                <li>
                    <img 
                    src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp" 
                    alt="Essence máscara de pestañas" 
                    />
                    <div>
                        <strong>Iphone</strong> -$1499
                    </div>

                    <footer>
                        <small>Qty: 1

                        </small>
                        <button>+</button>
                    </footer>
                </li>
            </ul>

            <button>
                <ClearCartIcon />
            </button>
        </aside>
        </>
    )
}