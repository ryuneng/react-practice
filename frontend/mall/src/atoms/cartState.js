import { atom, selector } from "recoil";

// * 장바구니 데이터 처리
//   : 서버와 연동해야 하는 부분은 리액트 쿼리를 이용해서 처리하고,
//     장바구니 아이템에 대한 상태 처리는 리코일 이용
export const cartState = atom({
    key: 'cartState',
    default: []
})

// 리코일의 Atom이 데이터 자체를 의미한다면, Selector는 데이터를 이용해서 처리할 수 있는 기능을 의미
// 아래는 해당 상품의 가격과 수량을 이용해서 전체 장바구니의 총액을 구하는 기능
export const cartTotalState = selector({
    key: "cartTotalState",
    get: ({get}) => {
        const arr = get(cartState)

        const initialValue = 0

        const total = arr.reduce((total, current) => total + current.price * current.qty, initialValue)

        return total
    }
})