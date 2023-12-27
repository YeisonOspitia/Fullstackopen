import { useState } from "react"

function Header({text}){
  return (
    <h1>{text}</h1>
  )
}

function Parrafo({text}){
  return (
    <p>{text}</p>
  )
}

function Button({text, handleclick}){
  return (
    <button onClick={handleclick}>{text}</button>
  )
}

function StatisticLine({text, variable}){
  return (
    <tr>
      <td className="f-900">{text}</td>
      <td>{variable}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if(all === 0){
    return (
      <>
        <Parrafo text="No feedback given"></Parrafo>
      </>
    )
  }else{
    return (
      <table>
          <tbody>
            <StatisticLine text="Good" variable={good}></StatisticLine>
            <StatisticLine text="Neutral" variable={neutral}></StatisticLine>
            <StatisticLine text="Bad" variable={bad}></StatisticLine>
            <StatisticLine text="All" variable={all}></StatisticLine>
            <StatisticLine text="Average" variable={average}></StatisticLine>
            <StatisticLine text="Positive" variable={positive}></StatisticLine>
        </tbody>
      </table>
    );
  }
};

let acumulado = 0;

function App() {
  // Guarda los clics de cada boton en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const FuncionButton = (variable, modificador, valor) => {
    return () => {
      let total = all+1;
      modificador(variable+1)
      acumulado = acumulado+(valor)
      setAverage(((acumulado)/(total)))
      setAll(total)
      valor > 0 ? setPositive((((good+valor)/(total))*100).toFixed(1)+ "%") : setPositive((((good)/(total))*100).toFixed(1)+ "%")
    }
  }
  return (
    <div className="container">
      <Header text="give feedback"></Header>
      <Button text="Good" handleclick={FuncionButton(good,setGood,1)}></Button>
      <Button text="Neutral" handleclick={FuncionButton(neutral,setNeutral,0)}></Button>
      <Button text="Bad" handleclick={FuncionButton(bad,setBad,-1)}></Button>
      <Header text="Statistics"></Header>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average.toFixed(1)} positive={positive} />
    </div>
  )
}

export default App
