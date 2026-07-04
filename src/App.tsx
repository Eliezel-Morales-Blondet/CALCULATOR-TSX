import { useState } from 'react';
import { useEffect, useRef } from "react";

import './App.css'

function App() {

  const [expression, setExpression] = useState<string>('');
  const [numbers, setNumbers] = useState(0);

  const handleClick = (value:string) => {
    
    if (expression === "Error"){
      clear();
    }else if (numbers < 15){
      setNumbers(numbers + 1);
      setExpression((prev) => prev + value);
    }else if (value === "+" || value === "-" || value === "*" || value === "/" ){
      setNumbers(0);
      setExpression((prev) => prev + value);
    }
  };



const textareaRef = useRef<HTMLTextAreaElement>(null);

useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
  }
}, [expression]);

  const clear = () => {
    setExpression('');
    setNumbers(0);
  }

  const clear_entry = () => {
    const r: string = expression.substring(0, expression.length - 1);
    setExpression(r);
    setNumbers(numbers - 1);
  }

  const calculate = () => {
    setNumbers(0)
    try {
      const evaluted = Function(`return (${expression})`)();
      setExpression(evaluted.toString());
    } catch (error) {
      setExpression(`Error`);
      console.log(error)
    }
  }

  const buttons = [
    '/',
    '7','8','9','*',
    '4','5','6','-',
    '1','2','3','+',
    '.','0','='
  ]
  return(
    <div className='container'>
      <div className='calculator'>
        <textarea rows={2} value={expression}  readOnly ref={textareaRef}></textarea>
        <div className='buttons'>
          <button className='clear' onClick={clear}>C</button>
          <button className='clear-1' onClick={clear_entry}>CE</button>
          {buttons.map((btn) => (
            <button key={btn} onClick={() => (btn === '=' ? calculate() : handleClick(btn))} className={btn === '=' ? "doble" : " "}>{btn}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
