const Header = (props) => (
  <>
    <h1>{props.name}</h1>
  </>
)

const Content = ({parts}) => {

  const result = [];

  parts.forEach((item, index) => {
    result.push(<Part key={index} name={item.name} number={item.exercises} />)
  });
  return (
    <>
      {result}
    </>
  )
}

const Part = ({name, number}) => {
  return (
    <>
      <p>{name} {number}</p>
    </>
  )
}

const Total = (props) => {

  let total = 0

  props.number.forEach(item => {
    total += item.exercises
  })

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )

}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total number={course.parts} />
    </div>
  )
}
export default App;
