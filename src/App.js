/* eslint-disable */
import React, { useContext, useState } from 'react';
import './App.css';
/* import { Navbar,Container,Nav,NavDropdown,Form,Button,FormControl } from 'react-bootstrap'; */
import Data from './data.js'
import {Link,Route,Switch} from 'react-router-dom';
import Detail from './Detail.js';
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
  let [stock,setStock] = useState([10,11,12]);
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
        <Detail shoes={shoes} stock={stock} setStock={setStock}/>
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

  return(

    <div className='col-md-4'>  {/* 정확히 3등분 쪼개기 */}
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
