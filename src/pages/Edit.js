import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {

    //링크 태그를 안눌러도 이동시킬 수 있다!
    const navigate = useNavigate();

    //setSearchParams는 searchParams를 변경 시키는 역할을 한다 (쿼리스트링을 바꿀 수 있다)
    // [] 안에 비구조할당 이름은 아무거나 써도 되지만 useSearchParams()은 꼭 이렇게 이름 써야함!
    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get('id');
    console.log(id);

    const mode = searchParams.get('mode');
    console.log(mode);

    return (
        <div>
            <h1>Edit</h1>
            <p>이 곳은 일기 수정 페이지입니다.</p>
            <button onClick={() => setSearchParams({who: "MJ"})}>쿼리스트링 바꾸기!</button>

            <button onClick={() => {navigate("/home");}}>홈으로 이동</button>
            <button onClick={() => {navigate(-1);}}>뒤로가기</button>

        </div>
    );
};

export default Edit;