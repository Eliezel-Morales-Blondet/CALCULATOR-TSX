import { useState } from 'react';
import './App.css'

function App() {

  const [expression, setExpression] = useState<string>('');

  const handleClick = (value:string) => {
    if (expression === "Error"){
      clear();
    }
    setExpression((prev) => prev + value);

  };

  const clear = () => {
    setExpression('');
  }

  const clear_entry = () => {
    const r: string = expression.substring(0, expression.length - 1);
    setExpression(r);
  }

  const calculate = () => {
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
        <div className='display'>
          <input type="text" value={expression} readOnly/>
        </div>
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
