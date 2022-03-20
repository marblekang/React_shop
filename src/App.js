/* eslint-disable */
import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import './App.css';
import Data from './data.js'
import {Link,Route,Switch} from 'react-router-dom';

//import Detail from './Detail.js';
let Detail = lazy(()=>{ return import('./Detail.js')}); // Detail 컴포넌트가 필요할 때만 import Detail.js 해옴

import Cart from './Cart.js';
import Navi from './Nav.js';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export let stockContext = React.createContext();


/* ///////////////////////////////////////////////////////////// */
function App() {
  let [shoes,setShoes] = useState(Data);
  let arr = [2,3,4]
  let newArr;
  let [loading,setLoading] = useState(false);
  let [stock,setStock] = useState([10]);
//  /* /////////변수, 스테이트////////////////////////////////// *////////



/* return */
  return (
    <div className="App">
      {/* nav */}
      <Navi></Navi>
      {/* ////////////////////////////// */}
      
     
   
      <Switch>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
      
       {/* Detail page */}
       <Route path="/detail/:id">

        <stockContext.Provider value={stock}>
          <Suspense fallback={<div>로딩중...</div>}> {/* detail 페이지가 로딩되기 전에 보여줄 HTML */}
            <Detail shoes={shoes} stock={stock} setStock={setStock}/>
          </Suspense>
        </stockContext.Provider>      
      </Route>

      {/* Main page */}
      <Route path="/">
          {/* jumbotron */}	
          <div className="bg-light p-5 rounded-lg m-3 background">	
            <h1 className="display-4">20% Season Off</h1>	
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>	
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>	
          </div>
          {/* ///////////////////////// /////////////*/}
          
          {/* Card */}
          <stockContext.Provider value={stock}>
          <div className='container'>
            <div className='row'>
            {shoes.map(function(a,i){
              return(
                <Card shoes={shoes} i={i} key={i}></Card>
              )
            })}
            </div>
          </div>
          </stockContext.Provider>
          { loading === true
            ?<div >로딩중입니다.</div>
            : null  }
          <button className="btn btn-primary" onClick={()=>{
            setLoading(true); // 로딩 UI 창 보이게.
            // ajax 요청으로 해당 url 에서 데이터 가져옴.
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{ // 가져온 데이터는 result에 담김.
              setLoading(false); // 로딩 완료되면 로딩UI 창 안보이게
              /* 괄호벗기기 문법. */
              /* state 데이터 사본 생성없이 원하는 데이터 추가 */
              /* 원래 shoes에 있던 데이터 + result.data의 새로운 데이터 추가 */
              setShoes([...shoes,...result.data])
            })
          }}>더보기</button>
          <Test2></Test2>
          {/* //////////////////////////////////////////// */}
          
      </Route>
     
    

      {/*  */}
      <Route path="/:id">
        <div>새로 만든 route 입니다.</div>
      </Route>
    </Switch>        
    </div>
  );
} /// App components 끝


 /*//////// components ///////////*/

 /* card */
 function Card(props){

  let stock = useContext(stockContext); // 범위 입력
  let history = useHistory();
  return(

    <div className='col-md-4' onClick={()=>{
     history.push('/detail/' + props.shoes[props.i].id)}}>  {/* 정확히 3등분 쪼개기 */}
      <img src={'https://codingapple1.github.io/shop/shoes'+(props.shoes[props.i].id+1)+'.jpg'} width="100%" />
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].content}</p>
      <p>{props.shoes[props.i].price}</p>
    </div>
  )  
}

function Test(){
  let stock = useContext(stockContext)
  return(
    <p>재고 : {stock}</p>
  )
}
///////////
// 비동기처리 연습.
function Test2(){
  let [count,setCount] = useState(0);
  let [age,setAge] = useState(20);
  {
    useEffect(()=>{  // useEffect 는 처음 렌더링 할때도 실행되므로 age가 +1이 되어 21 로 나옴. 그래서 count가 0 이 아닐때 (클릭한 후) 와 3보다 작을때 만 실행하게 함. 
     if(count != 0 && count < 3){
     setAge(age+1)
    }
  },[count])
 }
  return(
    <div>
      <div>안녕하세요 저는 {age} 살 입니다.</div>
      <div>count:{count}</div>
      <button onClick={()=>{setCount(count+1)}
      }>누르면 한살먹기</button>
      
    </div>
  )
}

 

/////////////////////////////////////////////



/* 컴포넌트 반복문
1) 컴포넌트 만들기
2) 반복문 돌리기
3) props 이용해서 상위컴포넌트의 map 파라미터와 statte를 하위 컴포넌트에서 받기 */




   {/* jumbotron */}	
      {/* <div class="bg-light p-5 rounded-lg m-3">	
        <h1 class="display-4">Hello, world!</h1>	
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>	
        <hr class="my-4" />	
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>	
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>	
      </div>
 */}



export default App;
