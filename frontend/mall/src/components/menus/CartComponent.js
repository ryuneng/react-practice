import { useEffect, useMemo } from "react";
import useCustomLogin from "../../hooks/UseCustomLogin";
import useCustomCart from "../../hooks/UseCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

const CartComponent = () => {

    const {isLogin, loginState} = useCustomLogin();

    const {refreshCart, cartItems, changeCart} = useCustomCart();

    const total = useMemo(() => {

        let total = 0

        for (const item of cartItems) {
            total += item.price * item.qty
        }

        return total
    }, [cartItems])

    useEffect(() => {

        if (isLogin) {

            refreshCart()
        }
    }, [isLogin])

    return (
        <div className="w-full">
            {isLogin ?

            <div className="flex flex-col">

                <div className="w-full flex">
                    <div className="font-extrabold text-2xl w-4/5">
                        {loginState.nickname}'s Cart
                    </div>
                    <div className="bg-orange-600 w-9 text-center text-white font-bold rounded-full m-2">
                        {cartItems.length}
                    </div>
                </div>
                
                <div>
                    <ul>
                        {cartItems.map( item => <CartItemComponent {...item}
                                                            key={item.cino}
                                                            changeCart={changeCart}
                                                            email={loginState.email}/> )}
                    </ul>
                </div>

                <div className="text-2xl text-right font-extrabold">
                    TOTAL: {total} 원
                </div>
                
            </div>

            :
            
            <></>
            }
        </div>
    );
}

export default CartComponent;