import React, { useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// Components
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type) {
    case 'INIT' :{
      return action.data;
    }
    case 'CREATE' :{
      newState = [...action.data, ...state];
      break;
    }
    case 'REMOVE' :{
      newState = state.filter((it)=> it.id !== action.targetId);
      break;
    }
    case 'EDIT' :{
      newState = state.map((it) => it.id === action.data.id ? {...action.date}: it);
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  }

  //Edit
  const onEdit = (targetId, date, content, emotion)=> {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      },
    });
  };

  //Remove
  const onRemove = (targetId) => {
    dispatch({ type: "DELETE", targetId})
  };

  return (
    <DiaryStateContext.Provider value = {data}>
      <DiaryDispatchContext.Provider value = {{
        onCreate, onEdit, onRemove
      }}>
        <BrowserRouter>
          <div className="App">
            <MyHeader headText={"App"} 
            leftChild={<MyButton text={"왼쪽 버튼"} onClick={() => alert("왼쪽 버튼")}/>} 
            rightChild={<MyButton text={"오른쪽 버튼"} onClick={() => alert("오른쪽 버튼")}/>}
            />
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path='/new' element={ <New />} />
              <Route path='/edit' element={ <Edit />} />
              <Route path='/diary/:id' element={ <Diary />} />
            </Routes>

          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
