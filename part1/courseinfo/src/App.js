import logo from './logo.svg';
import './App.css';

const Hello = (props) => {
  return (
    <div>
      <p>Hello world! {props.name}</p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Hello name="orange" />
      </header>
      
    </div>
  );
}

export default App;
