import { useNavigate } from "react-router-dom";
import { useRef, useState, useContext, useEffect } from "react";
import { DiaryDispatchContext } from "./../App.js";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "오늘 뭔 날??",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "우왕굳",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "먼 일이고..",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "힐링이 필요해..",
  },
];

const getStringDate = (date) => {
  // toISOString은 date객체를 yyyy-mm-dd(hh:mm:ss)로 문자열로 반환해줌
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  // 날짜 상태
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();

  // 오늘의 감정을 클릭시 상태값을 변화하는 함수!
  const [emotion, setEmotion] = useState(3);
  const handClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  // textarea의 state를 맵핑하기 위한 새로운 state
  const [content, setContent] = useState("");
  const contentRef = useRef(); // 사용자가 아무것도 안적고 저장을 누를때 포커스 기능을 위한 useRef

  // 작성완료(저장) 함수
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <div>
        <MyHeader
          headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
          leftChild={
            <MyButton
              text={"< 뒤로가기"}
              onClick={() => navigate(-1)}
            ></MyButton>
          }
        ></MyHeader>
        <div>
          <section>
            <h4>오늘은 언제인가요?</h4>
            <div className="input_box">
              <input
                className="input_date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              ></input>
            </div>
          </section>
          <section>
            <h4>오늘의 감정</h4>
            <div className="input_box emotion_list_wrapper">
              {emotionList.map((it) => (
                <EmotionItem
                  key={it.emotion_id}
                  {...it}
                  onClick={handClickEmote}
                  isSelected={it.emotion_id === emotion}
                ></EmotionItem>
              ))}
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="input_box text_wrapper">
              <textarea
                placeholder="오늘은 어땠나요?"
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </section>

          <section>
            <div className="control_box">
              <MyButton
                text={"취소하기"}
                onClick={() => navigate(-1)}
              ></MyButton>
              <MyButton
                text={"작성완료"}
                type={"positive"}
                onClick={handleSubmit}
              ></MyButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditor;
