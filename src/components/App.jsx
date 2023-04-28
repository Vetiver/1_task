import React, { useState, useRef, useEffect } from 'react'
import getTimeRemaining from '../functions/functions';



const App = () => {
	const Ref = useRef(null);
	const [timer, setTimer] = useState('00:00:00');
  const [inputValue, setInputValue] = useState(null);

  const onChange = (e) => {
    setInputValue(e.currentTarget.value);
  };


  const convertTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
        setTimer(
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
    }
}

  const clearTimer = (e) => {
        setInputValue(null)
        setTimer('00:00:00');
        if (Ref.current){
          clearInterval(Ref.current);
        } 
        const id = setInterval(() => {
          convertTimer(e);
        }, 1000)
        Ref.current = id;
    }
    
    const getDeadLine = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + Number(inputValue));
        return deadline;
    }

	useEffect(() => {
		clearTimer(getDeadLine());
	}, []);

	const createTimerAnimator = () => {
		clearTimer(getDeadLine());
	}

	return (
    <section>
		<input placeholder="Seconds" type="number" onChange={onChange}/>

    <button onClick={createTimerAnimator}>Start</button>

    <br />
    <br />

    <span>{timer}</span>
    </section>
	)
}

export default App;
