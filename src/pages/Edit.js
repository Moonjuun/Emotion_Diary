import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();

  //링크 태그를 안눌러도 이동시킬 수 있다!
  const navigate = useNavigate();
  const { id } = useParams();

  // DiaryStateContext가 제공하는 diaryList를 불러온다
  const diaryList = useContext(DiaryStateContext);

  // 컴포넌트가 마운트가 됐을때 수행함
  // id와 diaryList가 변할때만 리스트를 불러옴
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);
  return (
    <div>
      <h1>Edit</h1>
      <div>
        {originData && <DiaryEditor isEdit={true} originData={originData} />}
      </div>
    </div>
  );
};

export default Edit;
