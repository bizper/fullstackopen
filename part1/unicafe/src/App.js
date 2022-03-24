import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}> {text} </button>
  )
}

const Satistics = ({ good, neutral, bad, total, average }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" number={good}></StatisticLine>
          <StatisticLine text="neutral" number={neutral}></StatisticLine>
          <StatisticLine text="bad" number={bad}></StatisticLine>
          <StatisticLine text="all" number={total}></StatisticLine>
          <StatisticLine text="average" number={total === 0 ? 0 : average / total}></StatisticLine>
          <StatisticLine text="positive" number={total === 0 ? "0%" : (good / total * 100 + "%")}></StatisticLine>
        </tbody>
      </table>
    )
  }
}

const StatisticLine = ({ text, number }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
}


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>
      <h1>satistics</h1>
      <Satistics good={good} neutral={neutral} bad={bad} total={total} average={average}></Satistics>
    </div>
  );
}

export default App;
