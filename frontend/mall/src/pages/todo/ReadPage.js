import { useCallback } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";

const ReadPage = () => {

    const {tno} = useParams() // tno 변수로 전달되는 값 추출 (PathVariable처럼 사용 가능)

    const navigate = useNavigate()

    const [ queryParams ] = useSearchParams() // useSearchParams()을 통해 쿼리스트링으로 전달된 데이터 확인

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10

    const queryStr = createSearchParams({page,size}).toString()

    const moveToModify = useCallback((tno) => {

        navigate({
            pathname:`/todo/modify/${tno}`,
            search: queryStr
        })

    },[tno, page, size])
    
    const moveToList = useCallback(() => {
        navigate({pathname:`/todo/list`, search: queryStr})
    }, [page, size])

    return (
        <div className="text-3xl font-extrabold">
            Todo Read Page Component {tno}

            <div>
                <button onClick={() => moveToModify(tno)}>Test Modify</button>

                <button onClick={() => moveToList()}>Test List</button>
            </div>
        </div>
    );

}

export default ReadPage;