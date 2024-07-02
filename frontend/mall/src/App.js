import {RouterProvider} from "react-router-dom";
import root from "./router/root";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 리액트 쿼리 기본 설정의 시작 - QueryClient 지정
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={root}/>

      <ReactQueryDevtools initialIsOpen={true} /> {/* initialIsOpen 속성 : 애플리케이션 구동 시에 개발 도구를 오픈한 상태에서 시작하는 것을 지정 */}

    </QueryClientProvider>
  );
}

export default App;