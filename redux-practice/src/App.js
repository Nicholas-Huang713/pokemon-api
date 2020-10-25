import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, signin, signout, addname, removename} from './actions';

function App() {
  const counter = useSelector(state => state.counter);
  const loginState = useSelector(state => state.isLogged);
  const nameList = useSelector(state => state.addName);
  const dispatch = useDispatch();
  
  return (
    <div className="App">
      <h1>Counter {counter} </h1>
      <input type="number" value="" />
      <button onClick={() => dispatch(increment(5))}>+</button>
      <button onClick={() => dispatch(decrement(5))}>-</button>
      <h1>Logged In? : {loginState}</h1>
      {
        loginState ? 
        <button onClick={() => dispatch(signout())}>Signout</button> :
        <button onClick={() => dispatch(signin())}>Signin</button>
      }
      <br></br>
      
      <button onClick={() => dispatch(addname())}>Add Name to list</button> |
      <button onClick={() => dispatch(removename())}>Remove Name from list</button>
      <ul>
        {
          nameList.map((name, index)=>{
            return <li key={index}>
                      {name}
                   </li>
          })
        }
      </ul>
      
      
    </div>
  );
}

export default App;
