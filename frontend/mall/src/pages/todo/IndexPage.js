import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {

    // useNavigate() : 페이지 이동 함수
    /* React-Router를 이용하면 고정된 링크로 이동할 때도 있지만, 대부분은 상황에 따라서 동적으로 데이터를 처리해서 이동하는 경우가 더 많음.
       이럴 때는 <Navigate>나 <Link> 대신에 useNavigate()를 이용해서 해결함 */
    const navigate = useNavigate()

    const handleClickList = useCallback(() => {
        navigate({ pathname:'list' })
    })

    const handleClickAdd = useCallback(() => {
        navigate({ pathname:'add' })
    })

    return (
        <BasicLayout>
            <div className="w-full flex m-2 p-2">
                <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline" onClick={handleClickList}>LIST</div>
                <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline" onClick={handleClickAdd}>ADD</div>
            </div>

            <div className="flex flex-wrap w-full">
                <Outlet/>
            </div>
        </BasicLayout>
    );
}

export default IndexPage;