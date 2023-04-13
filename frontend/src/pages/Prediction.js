import React, { useState } from 'react';
import axios from 'axios';

import { Container, Row, Col } from "react-bootstrap";
import StudentList from "../components/gradeAndAttendance";
import '../styles/Predict.css'
function Prediction() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [result, setResult] = useState('');
  const [studentId, setStudentId] = useState("");

  const getStudentIdHandler = (id) => {
      setStudentId(id);
  };

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
            <Container>
                <Row>
                    <Col>
                        <StudentList getStudentId={getStudentIdHandler} />
                    </Col>
                </Row>
            </Container>
      <form onSubmit={handleSubmit} className='sumbit'>
        <label>
          Grade 1:
          <input min='0' max='100'name ='grade1'type="number" value={input1} onChange={handleInput1Change} />
        </label>
        <br></br>
        <label>
        Grade 2:
          <input min='0' max='100'type="number" value={input2} onChange={handleInput2Change} />
        </label>
        <br></br>
        <label>
          Attendance between 1 and 5:
          <input min='1' max='5'type="number" value={input3} onChange={handleInput3Change} />
        </label>
        <br></br>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <p className='predic'>The predicted grade is: {result}</p>
      )}
    </div>

  );
  
}

export default Prediction;
