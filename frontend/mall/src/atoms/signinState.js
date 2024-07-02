// Atom은 공유하고 싶은 데이터를 atom()을 이용해서 생성하고 컴포넌트에서는 이를 구독한다.
// Atom으로 유지되는 데이터가 변경되면 이를 구독하는 컴포넌트들은 다시 렌더링이 이루어진다.
import { atom } from "recoil";
import { getCookie } from "../util/cookieUtil";

const initState = {
    email: '',
    nickname: '',
    social: false,
    accessToken: '',
    refreshToken: ''
}

// 새로고침으로 인해서 로그인한 모든 정보가 사라지는 현상을 처리하기 위해
// Atom의 초기 상태를 쿠키를 이용해서 체크
const loadMemberCookie = () => {

    const memberInfo = getCookie("member")

    // 닉네임 처리
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }

    return memberInfo
}

// 초기값 지정
const signinState = atom({
    key: 'signinState',
    default: loadMemberCookie() || initState
})

export default signinState