import { useParams } from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () => {

    const {tno} = useParams() // tno 변수로 전달되는 값 추출 (PathVariable처럼 사용 가능)

    return (
        <div className="font-extrabold w-full bg-white mt-6">

            <div className="text-2xl">
                Todo Read Page Component {tno}
            </div>

            <ReadComponent tno={tno}></ReadComponent>
        </div>
    );

}

export default ReadPage;