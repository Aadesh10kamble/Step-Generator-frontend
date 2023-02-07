import './App.css';
import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import { TextField, Button } from '@mui/material';

function App() {
  const [firstNum, setFirstNumber] = React.useState('');
  const [secondNum, setSecondNumber] = React.useState('');
  const [generatedSteps, setSteps] = React.useState({});

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const firstNumber = +firstNum > +secondNum ? firstNum : secondNum;
    const secondNumber = +firstNum < +secondNum ? firstNum : secondNum;

    if (!firstNumber || !secondNumber) return window.alert('Invalid Input');
    const payload = { firstNumber, secondNumber };

    axios.post(`http://localhost:8000/`, payload)
      .then(res => {
        if (!res.data.isSuccess) return console.log('error');
        setSteps(res.data.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='App-header'>
      <h1>Step Addition</h1>
      <form onSubmit={onSubmitHandler} className='form-style'>

        <TextField label={'First Number'} size="union"
          sx={{ marginTop: '30px' }}
          type='number' value={firstNum} variant='standard'
          onChange={(event) => setFirstNumber(event.target.value)} />

        <TextField label={'Second Number'} type='number'
          sx={{ marginTop: '30px' }}
          value={secondNum} variant='standard'
          onChange={(event) => setSecondNumber(event.target.value)} />

        <Button type='submit'
          sx={{ marginTop: '30px' }}
          variant='contained'>Generate Steps</Button>
      </form>
      {!_.isEmpty(generatedSteps) && (
        <div className='step-box'>
          <div>
            <pre>
              {JSON.stringify(generatedSteps, null, '\t')}
            </pre>
          </div>
        </div>)}
    </div>
  );
}

export default App;
