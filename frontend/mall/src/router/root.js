import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter"; // '/todo/'와 관련된 children 설정을 담고 있는 라우팅 설정은 todoRouter를 호출하도록 설정
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";

// root.js : createBrowserRouter()를 통해 어떤 경로(path)에는 어떤 컴포넌트를 보여줄 것인지를 결정하는 역할을 함
const { createBrowserRouter } = require("react-router-dom");

// 아직 컴포넌트의 처리가 끝나지 않았다면, 화면에 'Loading....' 메시지 표시
const Loading = <div>Loading....</div>

const Main = lazy(() => import("../pages/MainPage"))

const About = lazy(() => import("../pages/AboutPage"))

const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))

const ProductsIndex = lazy(() => import("../pages/products/IndexPage"))

// <Suspense>와 lazy()는 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연로딩을 위해서 사용
/* SPA 방식의 리액트 애플리케이션은 처음에 필요한 모든 컴포넌트를 로딩하기 때문에 초기 실행 시간이 오래 걸리는 단점이 있음.
   이를 해결하기 위해 <Suspense>와 <Lazy>를 이용해서 분할 로딩을 하는데, 이를 '코드 분할(Code Splitting)'이라고 함 */
const root = createBrowserRouter([

    {
        // 경로가 '/' 혹은 아무것도 없을 때는 MainPage 컴포넌트 표시
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        children: todoRouter() // '/todo/'와 경로와 관련된 설정은 todoRouter()를 이용하도록 설정
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><ProductsIndex/></Suspense>,
        children: productsRouter()
    },
    {
        path: "member",
        children: memberRouter()
    }
])

export default root;