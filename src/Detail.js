/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components' // styled-components
import './Detail.scss';
import {stockContext} from './App.js';
import {Nav} from 'react-bootstrap';

let Box = styled.div`
padding:20px;
background-color:${ props => props.backgroundColor};  
`

let Title = styled.div`
font-size:25px`

function Detail(props){

    let stock = useContext(stockContext);
    let history = useHistory();  
    let { id } = useParams(); /* 꺼내올 url파라미터 명 입력, 이름 같아야함. 
                                 /detail/:파라미터명    이면 같은 파라미터명 입력*/
    
    let [alertOpen,setAlertOpen] = useState(true);
    /* ES6 문법 find - Array안에서 원하는 자료 찾고싶을때 사용 */   
    //                           
    let findedProd = props.shoes.find(function(a){
        return a.id == id })  // url 파라미터에 넣은 값과 id가 같은 데이터만 리턴해서 
                            // findProd 변수에 담는다.  변수에는 url파라미터에 넣은 숫자와 같은 id를 가진 데이터만 담겨있다.
    //////////////////////////////////////////////////////////////////////////////////////////////////
   
    
     // useEffect 
     //              useEffect 를 사용하면
    //               1)컴포넌트가 mount될때(컴포넌트가 첫등장해서 로딩이 끝난 후에 )
     //              2)컴포넌트가 재렌더링(update) 되고난 후에 
     //               특정 코드를 실행할 수 있다.
    
     useEffect(()=>{
       let timer = setTimeout(()=>{setAlertOpen(false)},2000)
       // 컴포넌트가 사라지면 setTileout 제거해야 버그가 덜생김. 
       return ()=>{clearTimeout(timer)}
     },[/* useEffect 실행조건 입력가능 */ alertOpen /* 이 useEffect는 이제 alertOpen이라는 state가 변경될때만 실행  , 조건 입력하려면 스테이트가 이것보다 위에 있어야함.*/]);
     /* 만약 조건에 아무것도 안넣고 []  만 입력하면 일종의 트릭으로 컴포넌트가 업데이트 될때 이 useEffect는 실행되지 않음*/
      
     
     let [inputData,setInputData] = useState('');  

     let [pushedTab,setPushedTab] = useState(0);
     

    return(
    
        <div className="container">
        
        <div className="row">
          <div className="col-md-6">                                
            <img src={"https://codingapple1.github.io/shop/shoes"+(findedProd.id+1)+".jpg"} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            {/* useEffect 조건 테스트용 */}
            {/* {inputData}
            <input type="text" onChange = {(e)=>{setInputData(e.target.value)}} /> */}
            <h4 className="pt-5">{findedProd.title}</h4>
           {
            alertOpen === true 
            ? <div className="my-alert">재고가 얼마 남지 않았습니다.</div>
            :  null
            }
            
            <p>{findedProd.content}</p>
            <p>{findedProd.price}</p>
            <Info stock={props.stock}></Info>
            {props.stock > 0
            ? <button className="btn btn-danger" onClick={function(){
              props.setStock(props.stock-1);
            }
            }>주문하기</button>
            : null}
            <div><button onClick={()=>{history.goBack()}} className="btn">뒤로가기</button></div>
         {/*    <Box backgroundColor="blue">sad</Box> */}
          </div>
        </div>
                                                {/* 기본으로 눌려진 키(탭) 설정 */}
        <Nav className='mt-5' variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={()=>{setPushedTab(0)}}>Tab 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={()=>{setPushedTab(1)}}>Tab  2</Nav.Link>
          </Nav.Item>
        </Nav>

            <TabContent pushedTab = {pushedTab}></TabContent>

{/* //////////////////// */}        
      </div> 
    )
};

function TabContent(props){
 
    if(props.pushedTab === 0){
      return(
        <div>첫번째 내용입니다.</div>
      )
      }else if(props.pushedTab === 1){
        return(
          <div>두번째 내용입니다.</div>  
        )
        
      }
  
}

function Info(props){
  return(
    <p>재고:{props.stock}</p>
  )
}
export default Detail