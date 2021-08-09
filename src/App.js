import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { Form, Field, FormSpy } from 'react-final-form'

import data from './data/workoutData.json';

import './scss/index.scss';

function App() {
  const [day, setDay] = useState(null)

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const date = new Date();

    const dateDetails = {
      number: date.getDay(),
      day: days[date.getDay()],
      hours: date.getHours(),
      minutes: date.getMinutes(),
    }
    
    setDay(dateDetails);
  }, [])

  const onSubmit = (vals) => {
    console.log(vals)
  }

  return (
    <div className="App">
      <div className="nav">
        <p>{day ? day.day : 'Loading...'}</p>
        <p className="time">{day ? day.hours + ':' + (day.minutes < 10 ? `${0}${day.minutes}` : day.minutes): ''}</p>
      </div>
      <div className="content">
        <Form onSubmit={onSubmit} render={({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            {day ? data[day.number].map((workout, i) => {
              return (
                <div key={workout+i} className="workout-box">
                  <div className="workout-name">
                    <p>{workout.name}</p>
                    <FontAwesomeIcon icon={faImage} />
                  </div>
                  <div className="workout-data">
                    <p>Sets: {workout.sets}</p>
                    <p>Reps: {workout.reps}</p>
                    <p>PR: N/A atm</p>
                  </div>
                  <div className="workout-data">
                    <p>Record Weight:</p>
                    <Field name={workout.name.split(" ").join("")} render={({input, meta}) => (
                      <input className="workout-input" type='number' {...input} placeholder={"XX KG"} />
                    )} />
                  </div>
                </div>
              )
            }): ''}
            <button className='submit-button'><FontAwesomeIcon icon={faPaperPlane} /> &nbsp; &nbsp; Submit</button>
          </form>
        )} />
      </div>
    </div>
  );
}

export default App;
