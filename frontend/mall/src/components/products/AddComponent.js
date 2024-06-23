import { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    pname: '',
    pdesc: '',
    price: 0,
    files: []
}

const AddComponent = () => {

    const [product, setProduct] = useState({...initState})

     // useRef() : 기존의 자바스크립트에서 document.getElementById()와 유사한 역할을 함.
     // 리액트의 컴포넌트는 태그의 id 속성을 활용하면 나중에 동일한 컴포넌트를 여러 번 사용해서 화면에 문제가 생기기 때문에 useRef()를 이용해서 처리
    const uploadRef = useRef()

    // for FetchingModal
    const [fetching, setFetching] = useState(false)

    // for ResultModal
    const [result, setResult] = useState(null)

    const {moveToList} = useCustomMove() // 이동을 위한 함수

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }

    const handleClickAdd = (e) => {

        // useRef를 이용할 때는 current라는 속성을 활용해 현재 DOM 객체를 참조하게 되고,
        // Ajax를 전송할 때는 FormData 객체를 통해 모든 내용을 담아서 전송하게 됨
        const files = uploadRef.current.files
        
        const formData = new FormData()
        
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        // other data
        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)

        console.log(formData)

        setFetching(true) // API 서버 호출할 때는 fetching 상태를 true로 설정

        postAdd(formData).then(data => {
            setFetching(false) // 데이터를 가져온 후에는 false로 변경해서 화면에서 사라지도록 설정
            setResult(data.result)
        })
    }

    const closeModal = () => { // ResultModal 종료
        setResult(null)
        
        moveToList({pgae:1}) // 모달 창이 닫히면 이동
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            {fetching ? <FetchingModal/> : <></>}

            {result ? <ResultModal title={'Product Add Result'}
                                   content={`${result}번 등록 완료`}
                                   callbackFn={closeModal}/>
                    : <></>}

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="pname"
                           type={'text'}
                           value={product.pname}
                           onChange={handleChangeProduct}>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Description</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                           name="pdesc"
                           rows="4"
                           onChange={handleChangeProduct}
                           value={product.pdesc}>
                        {product.pdesc}
                    </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="price"
                           type={'number'}
                           value={product.price}
                           onChange={handleChangeProduct}>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input ref={uploadRef}
                           className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           type={'file'} multiple={true}>
                    </input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                            onClick={handleClickAdd}>
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );

}

export default AddComponent;