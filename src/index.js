import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';

// 상품정보
let prodInfo = [];

// reducer - 수량 증감을 위한 state
function reducer(state = prodInfo, action){
  
  if(action.type === 'add'){
    let isThereNo = state.findIndex((a)=>{return a.id === action.payload.id});
      if (isThereNo >= 0){
        let copy = [...state];
        copy[isThereNo].quan++
        return copy;
      }else {
        let copy = [...state];
        copy.push(action.payload);
        return copy;
      }
  }else if (action.type === 'incQuan'){
    let copy = [...state];
   copy[action.payload].quan++;
    return copy;
  }else if(action.type === 'decQuan'){
    let copy = [...state];
    copy[action.payload].quan--;
    return copy;
  }else{
    return state;
  }
}

// reducer2 - 알림창 상태 저장해서 보여주고 숨기는 state
let alertUi = true;

function reducer2(state = alertUi,action){
  if (action.type === 'closeAlert'){
    return false;
  }else{
    return state;
  }
}
///////////


// redux 로 state 만들기 - createStore  
                              //combineReducers - reducer 여러개 만들어야 될때 사용.
let store = createStore( combineReducers({reducer,reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store = {store}>
    <App />
    </Provider> 
    {/* Provider import 한 후에 state값 공유를 원하는 컴포넌트를 다 감싸면 됨. */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
