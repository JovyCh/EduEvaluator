import React, { useState } from 'react';
import axios from 'axios';

function Prediction() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [result, setResult] = useState('');

  const handleInput1Change = event => {
    setInput1(event.target.value);
  };

  const handleInput2Change = event => {
    setInput2(event.target.value);
  };

  const handleInput3Change = event => {
    setInput3(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:5000/calculate', {
      input1: input1,
      input2: input2,
      input3: input3
    })
      .then(response => {
        setResult(response.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Input 1:
          <input type="text" value={input1} onChange={handleInput1Change} />
        </label>
        <label>
          Input 2:
          <input type="text" value={input2} onChange={handleInput2Change} />
        </label>
        <label>
          Input 3:
          <input type="text" value={input3} onChange={handleInput3Change} />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <p>The predicted grade is: {result}</p>
      )}
    </div>
  );
}

export default Prediction;
