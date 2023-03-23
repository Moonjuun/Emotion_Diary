import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const getStringDate = (date) => {
  // toISOString은 date객체를 yyyy-mm-dd(hh:mm:ss)로 문자열로 반환해줌
  return date.toISOString().slice(0, 10);
};

const New = () => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  return (
    <div>
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}></MyButton>
        }
      ></MyHeader>
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input-box">
            <input
              className="input-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            ></input>
          </div>
        </section>
      </div>
    </div>
  );
};

export default New;
