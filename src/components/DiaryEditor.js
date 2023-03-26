import { useNavigate } from "react-router-dom";
import { useRef, useState, useContext, useEffect, useCallback } from "react";
import { DiaryDispatchContext } from "./../App.js";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";

// util
import { getStringDate } from "../util/data.js";
import { emotionList } from "../util/emotion.js";

const DiaryEditor = ({ isEdit, originData }) => {
  // 날짜 상태
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();

  // 오늘의 감정을 클릭시 상태값을 변화하는 함수!
  const [emotion, setEmotion] = useState(3);
  const handClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  // textarea의 state를 맵핑하기 위한 새로운 state
  const [content, setContent] = useState("");
  const contentRef = useRef(); // 사용자가 아무것도 안적고 저장을 누를때 포커스 기능을 위한 useRef

  // 작성완료(저장) 함수
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
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

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
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
          rightChild={
            isEdit && (
              <MyButton
                text={"삭제하기"}
                type={"negative"}
                onClick={handleRemove}
              ></MyButton>
            )
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
