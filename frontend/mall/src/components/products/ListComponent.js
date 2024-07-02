// import { useEffect, useState } from "react";
import { getList } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/UseCustomLogin";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const host = API_SERVER_HOST

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const ListComponent = () => {

    const {moveToLoginReturn} = useCustomLogin()

    const {page, size, refresh, moveToList, moveToRead} = useCustomMove()

    const {isFetching, data, error, isError} = useQuery(
        ['products/list', {page, size, refresh}],
        () => getList({page, size}),
        {staleTime: 1000 * 5} // staleTime을 이용해서 약간의 시간 동안 반복적으로 서버를 호출하는 것을 막고, refresh를 이용해서 동일한 페이지에 대한 쿼리 키값 변경
    )

    const queryClient = useQueryClient() // 리액트 쿼리 초기화를 위한 현재 객체

    const handleClickPage = (pageParam) => {

        if (pageParam.page === parseInt(page)) {
            queryClient.invalidateQueries("products/list") // 리액트 쿼리가 보관하는 데이터 무효화시키기 (동일 페이지 서버 호출 갱신을 위해)
        }

        moveToList(pageParam)
    }

    if (isError) {
        console.log(error)
        return moveToLoginReturn()
    }

    const serverData = data || initState

    // *** 주석 처리 : 리액트 쿼리 사용 전
    // const { exceptionHandle } = useCustomLogin()
    
    // const [serverData, setServerData] = useState(initState)

    // for FetchingModal
    // const [fetching, setFetching] = useState(false)

    // useEffect(() => {

    //     setFetching(true)

    //     getList({page, size}).then(data => {
    //         console.log(data)
    //         setServerData(data)
    //         setFetching(false)
    //     }).catch(err => exceptionHandle(err))

    // }, [page, size, refresh])

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">

            {isFetching ? <FetchingModal/> : <></>}
            {/* {fetching ? <FetchingModal/> : <></>} */}

            <div className="flex flex-wrap mx-auto p-6">
                {serverData.dtoList.map(product => 
                    <div key={product.pno}
                         className="w-1/2 p-1 rounded shadow-md border-2"
                         onClick={() => moveToRead(product.pno)}>
                        <div className="flex flex-col h-full">
                            <div className="font-extrabold text-2xl p-2 w-full">{product.pno}</div>
                            <div className="text-1xl m-1 p-2 w-full flex flex-col">
                                <div className="w-full overflow-hidden">
                                    <img alt="product" className="m-auto rounded-md w-60"
                                         src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`} />
                                </div>
                                <div className="bottom-0 font-extrabold bg-white">
                                    <div className="text-center p-1">이름: {product.pname}</div>
                                    <div className="text-center p-1">가격: {product.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* <PageComponent serverData={serverData} movePage={moveToList}></PageComponent> */}
            {/* movePage 속성값으로는 handleClickPage를 전달 */}
            <PageComponent serverData={serverData} movePage={handleClickPage}></PageComponent>
        </div>
    )
}

export default ListComponent;