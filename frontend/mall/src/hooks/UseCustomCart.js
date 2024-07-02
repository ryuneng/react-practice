import { useDispatch, useSelector } from "react-redux"
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice"
import { useRecoilState } from "recoil"
import { cartState } from "../atoms/cartState"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCartItems, postChangeCart } from "../api/cartApi"
import { useEffect } from "react"

const useCustomCart = () => {

    // *** 주석 처리 : 리액트 쿼리 사용 전
    // const cartItems = useSelector(state => state.cartSlice)

    // const dispatch = useDispatch()
    
    const [cartItems, setCartItems] = useRecoilState(cartState)

    const queryClient = useQueryClient()

    const changeMutation = useMutation((param) => postChangeCart(param), {onSuccess: (result) => {
        setCartItems(result)
    }})

    // 1시간의 staleTime을 지정하는 이유 : 외부에서 어떤 영향으로 상품의 정보가 변경될 수 있기 때문에
    //                                   자주는 아니지만 가끔은 장바구니 안에 있는 상품 정보를 다시 가져오기 위해서
    const query = useQuery(["cart"], getCartItems, {staleTime: 1000 * 60 * 60}) // 1시간

    useEffect(() => {

        if (query.isSuccess || changeMutation.isSuccess) {

            queryClient.invalidateQueries("cart")
            setCartItems(query.data)
        }
    }, [query.isSuccess, query.data])

    // const refreshCart = () => {

    //     dispatch(getCartItemsAsync())

    // }

    const changeCart = (param) => {

        changeMutation.mutate(param)
        // dispatch(postChangeCartAsync(param))

    }

    return {cartItems, /*refreshCart, */changeCart}

}

export default useCustomCart