import { useDispatch, useSelector } from "react-redux";
import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { useRecoilState, useResetRecoilState } from "recoil";
import signinState from "../atoms/signinState";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";
import { cartState } from "../atoms/cartState";

const useCustomLogin = () => {

    const navigate = useNavigate()
    
    const [loginState, setLoginState] = useRecoilState(signinState)

    const resetState = useResetRecoilState(signinState)

    const resetCartState = useResetRecoilState(cartState) // 로그아웃 시 장바구니 비우기

    // *** 주석 처리 : 리코일 사용 전
    // const dispatch = useDispatch()

    // const loginState = useSelector(state => state.loginSlice) // --------로그인 상태

    const isLogin = loginState.email ? true : false // --------로그인 여부

    const doLogin = async (loginParam) => { // --------로그인 함수

        const result = await loginPost(loginParam)

        console.log(result)
        
        saveAsCookie(result)

        return result

        // const action = await dispatch(loginPostAsync(loginParam))

        // return action.payload
    }

    const saveAsCookie = (data) => {

        setCookie("member", JSON.stringify(data), 1) // 1일

        setLoginState(data)
    }

    const doLogout = () => { // --------로그아웃 함수

        removeCookie('member')
        resetState()
        resetCartState()

        // dispatch(logout())
    }

    const moveToPath = (path) => { // --------페이지 이동
        navigate({pathname: path}, {replace: true})
    }

    const moveToLogin = () => { // --------로그인 페이지로 이동
        navigate({pathname: '/member/login'}, {replace: true})
    }

    const moveToLoginReturn = () => { // --------로그인 페이지로 이동 컴포넌트
        return <Navigate replace to="/member/login"/>
    }
    
    const exceptionHandle = (ex) => {

        console.log("Exception---------------------------------")

        console.log(ex)

        const errorMsg = ex.response.data.error

        const errorStr = createSearchParams({error: errorMsg}).toString()

        if (errorMsg === 'REQUIRE_LOGIN') {
            alert("로그인 해야만 합니다.")
            navigate({pathname: '/member/login', search: errorStr})
            return
        }

        if (ex.response.data.error === 'ERROR_ACCESSDENIED') {
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.")
            navigate({pathname: '/member/login', search: errorStr})
            return
        }
    }

    return {loginState, isLogin, doLogin, doLogout, saveAsCookie,
            moveToPath, moveToLogin, moveToLoginReturn, exceptionHandle}
}

export default useCustomLogin