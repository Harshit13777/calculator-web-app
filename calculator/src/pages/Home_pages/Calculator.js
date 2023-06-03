import React, { useState } from 'react';
import './Calculator.css';
import { Parser } from 'expr-eval';


const Calculator = ({DataChange}) => {
  //save result of calculation and its expression 
  const [result, setResult] = useState('');
  const [expression,setexpression]=useState('');

  //when click on any button then save in result
  const handleClick = (value) => {
    if(value=='+/-'){
      setResult(parseFloat(result*-1));
      return;
    }  
    setResult(result + value);
  };

  //clear the result variable
  const handleClear = () => {
    setResult('');
  };

  //when equal button click then calculate the result
  const handleCalculate = () => {
    try {
      const parser = new Parser();
      const expression = parser.parse(result);
      setexpression(result);
      setResult(expression.evaluate().toString());
    } catch (error) {
      setResult('Error');
    }
  };

  //callback function will send the data to its parent to save the data in right component
  const callbackdata=({name})=>{

    DataChange({name,result,expression});
   
  }

  return (
    <>
    <div className="container-fluid  wrapper p-2 mx-auto w-75">
      <h1 className='mt-2'>Caculator</h1>
      <div className="calculator-display mt-3 "><h1 className='result'>{result}</h1></div>
      <div className="calculator-buttons">
        <div className="row">
          <button className="col-3 btn  btnfirst" onClick={handleClear}>AC</button>
          <button className="col-3 btn  btnfirst" onClick={() => handleClick('+/-')}>+/-</button>
          <button className="col-3 btn  btnfirst" onClick={() => handleClick('%')}>%</button>
          <button className="btn  col-3 btnlast" onClick={() => handleClick('/')}>/</button>
        </div>
        <div className="row">
          <button className="col-3 btn " onClick={() => handleClick('7')}>7</button>
          <button className="col-3 btn " onClick={() => handleClick('8')}>8</button>
          <button className="col-3 btn " onClick={() => handleClick('9')}>9</button>
          <button className="btn  col-3 btnlast" onClick={() => handleClick('*')}>x</button>
        </div>
        <div className="row">
          <button className="col-3 btn " onClick={() => handleClick('4')}>4</button>
          <button className="col-3 btn " onClick={() => handleClick('5')}>5</button>
          <button className="col-3 btn " onClick={() => handleClick('6')}>6</button>
          <button className="btn  col-3 btnlast" onClick={() => handleClick('-')}>-</button>
        </div>
        <div className="row">
          <button className="col-3 btn " onClick={() => handleClick('1')}>1</button>
          <button className="col-3 btn " onClick={() => handleClick('2')}>2</button>
          <button className="col-3 btn " onClick={() => handleClick('3')}>3</button>
          <button className="btn  col-3 btnlast" onClick={() => handleClick('+')}>+</button>
        </div>
        <div className="row">
          <button className="col-6 btn btnzero" onClick={() => handleClick('0')}>0</button>
          <button className="col-3 btn " onClick={() => handleClick('.')}>.</button>
          <button className="btn  col-3 btnlast" onClick={handleCalculate}>=</button>
        </div>
      </div>
    </div>
    <EnterName callback={callbackdata}  />
    </>
    
    
  );
};

//calculation name component 
const EnterName=({callback})=>{
  const [name, setname] = useState('');

  //when save button click then data send to its parent by callback
  function handleSubmit(event) {
    event.preventDefault();
    
    if (name!='') {  
      callback({name});
      setname('');
    }
    else{alert('enter name');}
  }

  return(
    <div>
      <form>
          <label className="form mt-5 mx-5 text-lg font-weight-bold" htmlFor="username"><h1> Calculation Name </h1></label>
          <div className="col-12 d-flex flex-row ">
              <input
                type="text"
                className="form-control border w-50 bg-light"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <button className="btn bg-primary mx-5 " onClick={handleSubmit}>
                  <h3>Save</h3>
              </button>
         </div>
       </form>
    </div>
  )
}

export default Calculator;
