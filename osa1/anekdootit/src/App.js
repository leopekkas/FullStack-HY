import React, { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const Screen = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdote}</p>
      <p> has {props.votes} votes </p>
    </div>
  )
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
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [votes, setVotes] = useState(new Array(7).fill(0))
  const [selected, setSelected] = useState(0)

  const mostvotes = Math.max(...votes)
  const mostvotesindex = votes.indexOf(mostvotes)

  const handleRandomClick = () => {
    const num = getRandomInt(7)
    setSelected(num)
  }

  const handleVoteClick = () => {
    setVotes(previousVotes => {
      const copy = [...previousVotes];
      copy[selected] = (copy[selected]) + 1;
      setVotes(copy);
      return (
        copy
      )
    })
  }

  return (
    <div>
      <Screen anecdote={anecdotes[selected]} votes={votes[selected] || 0} />  
      <p>
        <Button handleClick={handleVoteClick} text='vote'/>
        <Button handleClick={handleRandomClick} text='next anecdote' />
      </p>
      <h1>Anecdote with the most votes</h1> 
      <p>
        {anecdotes[mostvotesindex]}
      </p>
      <p>
        has {mostvotes} votes
      </p>
    </div>
  )
}

export default App