import { useState } from 'react'
function Button({text, handleclick}) {
  return (
    <button type="button" onClick={handleclick}>{text}</button>
  )
}
function Votacion({votos}) {
  return (
    <span>has <b>{votos}</b> votes</span>
  )
}

function Title({text}) {
  return (
      <h1>{text}</h1>
  )
}

function MejorVotacion({title = 'There are no registered votes', votos = 0}){
  return (
    <div>
      <Title text={'Anecdote with more votes'}></Title>
      <p>{title}</p>
      <span>has <b>{votos}</b> votes</span>
    </div>
  )
}

const puntosiniciales = [
  0,0,0,0,0,0,0,0
]

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [puntos, setPuntos] = useState(puntosiniciales)
  const [masVotado, setMasVotado] = useState()

  const funcionAleatorio = () => {
    return () =>{
      let numeroAleatorio = Math.floor(Math.random()*anecdotes.length);
      setSelected(numeroAleatorio)
    }
  }
  const funcionVotar = (selected) => {
    return () =>{
      let copyPuntos = [...puntos]
      copyPuntos[selected] += 1
      const numeroMayor = Math.max(...copyPuntos)
      const posicion = copyPuntos.indexOf(numeroMayor);
      setMasVotado(posicion)
      setPuntos(copyPuntos)
    }
  }
  return (
    <div className=''>
      <Title text={'Anecdote of the day'}></Title>
      <p>{anecdotes[selected]}</p>   
      <div>
        <Votacion votos={puntos[selected]}></Votacion>
      </div>
      <div>
        <Button handleclick={funcionVotar(selected)} text="vote"></Button>
        <Button handleclick={funcionAleatorio()} text="next anecdote"></Button>
      </div>
      <MejorVotacion title={anecdotes[masVotado]} votos={puntos[masVotado]}></MejorVotacion>
    </div>
  )
}

export default App
