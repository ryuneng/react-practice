import useCustomLogin from "../hooks/UseCustomLogin";
import BasicLayout from "../layouts/BasicLayout";

const AboutPage = () => {

    const {isLogin, moveToLoginReturn} = useCustomLogin()

    // 로그인하지 않은 사용자는 로그인 페이지로 이동
    if (!isLogin) {
        return moveToLoginReturn()
    }
    
    return (
        <BasicLayout>
            <div className=" text-3xl">About Page</div>
        </BasicLayout>
    );
}

export default AboutPage;