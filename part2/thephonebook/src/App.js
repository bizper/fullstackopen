import { useEffect, useState } from 'react'
import axios from 'axios'

const Persons = ({ person }) => {
  return (
    <>
      {person.map((item) => <p key={item.id}> {item.name} {item.number} </p>)}
    </>
  )
}

const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      filter shown with: <input placeholder="input name here" value={search} onChange={handleSearch} />
    </div>
  )
}

const OperatePanel = ({ handleSubmit, newName, newNumber, handleInput, handleNewNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleInput} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(resp => {
      setPersons(resp.data)
    })
  }, [])

  const personsToShow = search.length > 0 ?
    persons.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) : persons

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.filter(item => item.name === newName).length >= 1) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))
  }

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <OperatePanel handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleInput={handleInput} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons person={personsToShow}></Persons>
    </div>
  );
}

export default App;
