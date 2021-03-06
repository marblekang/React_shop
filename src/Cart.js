import React from 'react';
import {Table} from 'react-bootstrap';
import {connect, useDispatch, useSelector} from 'react-redux';


function Cart(props){

  let state = useSelector((state)=>{
    return state})
    console.log(state.reducer) // reducer == prodInfo , reducer2 == alertUi (true)
  let dispatch = useDispatch()

  return (
    <div>
      <Table responsive>
        <tr>
          <th>id</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        { state.reducer.map((a,i)=>{
          return(
          <tr key={i}>
            <td>{a.id}</td>
            <td>{a.name}</td>
            <td>{a.quan}</td>
            <td><button className="btn" onClick={()=>{dispatch({type:'incQuan',payload:a.id})}}>+</button>
                <button className="btn" onClick={()=>{dispatch({type:'decQuan',payload:a.id})}}>-</button>
            </td>
          </tr> )
        })}
      </Table>
        { state.reducer2 === true
          ? (<div className="my-alert">
              <p>지금 구매하시면 20% 할인</p>
              <button onClick={()=>{dispatch({type:'closeAlert'})}}>닫기</button>
            </div>)
          :null  
          }     
    </div>
  )
}

// store 안에 있는 state 를 props로 만들어 주는 함수
/* function stateToProps(state){
  return {
    prodInfo: state.reducer,
    alert : state.reducer2
  }
}


export default connect(stateToProps)(Cart); */

// useSelector 사용
export default Cart;