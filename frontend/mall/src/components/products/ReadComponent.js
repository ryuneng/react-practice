import { useEffect, useState } from "react";
import { getOne } from "../../api/productsApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomLogin from "../../hooks/UseCustomLogin";
import useCustomCart from "../../hooks/UseCustomCart";
import { useQuery } from "@tanstack/react-query";

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    uploadFileNames: []
}

const host = API_SERVER_HOST

const ReadComponent = ({pno}) => {

    // *** 주석 처리 : 리액트 쿼리 사용 전
    // const [product, setProduct] = useState(initState)
    
    // 화면 이동용 함수
    const {moveToList, moveToModify} = useCustomMove()

    const {loginState} = useCustomLogin()

    const {cartItems, changeCart} = useCustomCart()

    // isFetching : 서버와 비동기 통신 중인지 확인 가능, data는 서버에서 처리된 결과 데이터
    // - 별도의 useState() 없이 FetchingModal 표시 가능
    const {isFetching, data} = useQuery(
        ['products', pno],
        () => getOne(pno),
        {
            staleTime: 1000 * 10,
            retry: 1
        }
    )

    // // fetching
    // const [fetching, setFetching] = useState(false)

    // // 장바구니 기능
    // const {changeCart, cartItems} = useCustomCart()

    // // 로그인 정보
    // const {loginState} = useCustomLogin()

    const handleClickAddCart = () => {

        let qty = 1

        const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0]

        if (addedItem) {
            if (window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?") === false) {
                return
            }
            qty = addedItem.qty + 1
        }

        changeCart({email: loginState.email, pno:pno, qty:qty})
    }

    // useEffect(() => {

    //     setFetching(true)

    //     getOne(pno).then(data => {
    //         setProduct(data)
    //         setFetching(false)
    //     })
    // }, [pno])

    const product = data || initState

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            {/* {fetching ? <FetchingModal/> : <></>} */} {/* 리액트 쿼리 사용 전 */}
            {isFetching ? <FetchingModal/> : <></>}

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pno}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pname}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.price}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pdesc}</div>
                </div>
            </div>
            <div className="w-full justify-center flex flex-col m-auto items-center">
                {product.uploadFileNames.map((imgFile, i) =>
                    <img alt="product"
                         key={i}
                         className="p-4 w-1/2"
                         src={`${host}/api/products/view/${imgFile}`}/>
                )}
            </div>
            <div className="flex justify-end p-4">
                <button type="button"
                        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
                        onClick={handleClickAddCart}>
                    Add Cart
                </button>
                <button type="button"
                        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                        onClick={() => moveToModify(pno)}>
                    Modify
                </button>
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                        onClick={moveToList}>
                    List
                </button>
            </div>
        </div>
    )
}

export default ReadComponent