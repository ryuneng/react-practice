import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/UseCustomLogin";

const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams()
    
    // *** 주석 처리 : 리코일 사용 전
    // const {moveToPath} = useCustomLogin()

    // const dispatch = useDispatch()
    
    const {moveToPath, saveAsCookie} = useCustomLogin()

    const authCode = searchParams.get("code")

    useEffect(() => {

        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken)

            // AccessToken 받은 후 getMemberWithAccessToken() 호출
            getMemberWithAccessToken(accessToken).then(memberInfo => {

                console.log("--------------------")
                console.log(memberInfo)

                // API 서버에서 전송한 결과를 dispatch()를 이용해서 login() 호출
                // dispatch(login(memberInfo))
                
                saveAsCookie(memberInfo)
                if (memberInfo && !memberInfo.social) { // 소셜 회원이 아니라면 홈으로 이동
                    moveToPath("/")
                } else {
                    moveToPath("/member/modify")
                }
            })
        })
    }, [authCode])

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    )
}

export default KakaoRedirectPage;