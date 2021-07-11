import React, { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )  
}

const Statistics = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let all = good + neutral + bad
  let average = (good - bad)/all
  let positive = good/all

  if (all === 0) {
    return <div>No feedback given</div>
  } else {
    return (
      <div>
        <tr> 
          <td><StatisticsLine text="good" value={good} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="neutral" value={neutral} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="bad" value={bad} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="all" value={all} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="average" value={average} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text="positive" value={positive} /></td>
        </tr>
      </div>  
    )
  }
}

const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback </h1>

      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <h1>Statistics </h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App