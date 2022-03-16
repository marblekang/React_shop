import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';

// 상품정보
let prodInfo = [{id:0, name:'awesomeShoes', quan:2},{id:1, name:'awesomeSnack', quan:1}]

// reducer - 수량 증감을 위한 state
function reducer(state = prodInfo, action){
  let copy = [...state];

  if (action.type === 'incQuan'){

   copy[0].quan++;
    return copy;
  }else if(action.type === 'decQuan'){
  
    copy[0].quan--;
    return copy;
  }else{
    return state;
  }
}

// reducer - 알림창 상태 저장해서 보여주고 숨기는 state
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
