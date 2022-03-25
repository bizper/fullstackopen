const Header = (props) => (
  <>
    <h1>{props.name}</h1>
  </>
)

const Content = ({ parts }) => {

  const result = [];

  parts.forEach((item) => {
    result.push(<Part key={item.id} name={item.name} number={item.exercises} />)
  });
  return (
    <>
      {result}
    </>
  )
}

const Part = ({ name, number }) => {
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
      <b>total of {total} exercises</b>
    </>
  )

}

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total number={course.parts} />
  </>
)

export default Course;