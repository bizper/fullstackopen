const Header = (props) => (
  <>
    <h1>{props.name}</h1>
  </>
)

const Content = (props) => {

  const result = [];

  Object.keys(props.parts).forEach((item, index) => {
    result.push(<Part key={index} name={item} number={props.parts[item]} />)
  });
  return (
    <>
      {result}
    </>
  ) 
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.number}</p>
    </>
  )
}

const Total = (props) => (
  <>
    <p>Number of exercises {props.number.reduce((total, curr) => (total + curr))}</p>
  </>
)


const App = () => {

  const course = 'Half Stack application development'

  const datas = {
    'Fundamentals of React': 10,
    'Using props to pass data': 7,
    "State of a component": 14
  }

  return (
    <div>
      <Header name={course} />
      <Content parts={datas}/>
      <Total number={Object.values(datas)} />
    </div>
  )
}
export default App;
