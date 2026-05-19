import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ value, text }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total }) => {
  if (total > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine value={good} text="good" />
            <StatisticLine value={neutral} text="neutral" />
            <StatisticLine value={bad} text="bad" />
            <StatisticLine value={total} text="all" />
            <StatisticLine value={(good - bad) / total} text="average" />
            <StatisticLine value={(good * 100) / total} text="positive" />
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(good + updatedNeutral + bad);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(good + neutral + updatedBad);
  };

  return (
    <div>
      <section>
        <h1>give feedback</h1>
        <div>
          <Button onClick={handleGood} text="good" />
          <Button onClick={handleNeutral} text="neutral" />
          <Button onClick={handleBad} text="bad" />
        </div>
      </section>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
