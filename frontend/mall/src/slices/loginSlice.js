import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
    email: ''
}

const loadMemberCookie = () => { // 쿠키에서 로그인 정보 로딩

    const memberInfo = getCookie("member")

    // 닉네임 처리
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }

    return memberInfo
}

// createAsyncThunk()를 사용해 memberApi.js에 선언된 loginPost()를 호출하도록 구성
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {

    return loginPost(param)
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState, // 쿠키가 없다면 초기값 사용
    reducers: {
        login: (state, action) => {
            console.log("login....")

            // {email, pw로 구성}
            const data = action.payload

            // 새로운 상태
            return {email: data.email}
        },
        logout: (state, action) => {
            console.log("logout....")

            removeCookie("member") // 로그아웃 시 member 쿠키 삭제

            return {...initState}
        }
    },
    // 비동기 통신의 상태(fulfilled(완료), pending(처리중), rejected(에러))에 따라 동작하는 함수
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled")
            
            // 로그인 후처리 (API 서버에서 로그인 시에 전송되는 데이터들을 상태 데이터로 보관하도록 처리)
            const payload = action.payload

            // 로그인에 성공하면 결과를 쿠키로 보관 *로그인 결과는 객체지만, 쿠키에는 문자열만 들어갈 수 있기 때문에 JSON.stringify() 사용
            // 정상적인 로그인 시에만 저장
            if (!payload.error) {
                setCookie("member", JSON.stringify(payload), 1) // 1일간 쿠키 보관 유지
            }
            return payload
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending")
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected")
        })
    }
})

export const {login, logout} = loginSlice.actions

export default loginSlice.reducer