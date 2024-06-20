import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>
const TodoList = lazy(() => import("../pages/todo/ListPage"))
const TodoRead = lazy(() => import("../pages/todo/ReadPage"))
const TodoAdd = lazy(() => import("../pages/todo/AddPage"))
const TodoModify = lazy(() => import("../pages/todo/ModifyPage"))

const todoRouter = () => {
    
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><TodoList/></Suspense>
        },
        {
            // <Navigate>의 replace 속성을 이용해 특정 경로로 진입 시에 자동으로 리다이렉션 처리
            // ---> 브라우저에서 'Todo' 메뉴를 선택하거나 '/todo/' 경로를 호출하는 경우, 자동으로 '/todo/list'로 이동됨
            path: "",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:tno",
            element: <Suspense fallback={Loading}><TodoRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><TodoAdd/></Suspense>
        },
        {
            path: "modify/:tno",
            element: <Suspense fallback={Loading}><TodoModify/></Suspense>
        }
    ]

}

export default todoRouter;