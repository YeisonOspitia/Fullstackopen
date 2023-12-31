const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
const Content = ({course}) => { 
    return (
        <div>
            {course.parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
  
const Total = ({course}) => {
    const totalExercises = course.parts.reduce( (sum, part) => sum + part.exercises, 0 )
    return (
        <strong>Number of exercises {totalExercises}</strong>
    )
}

const OneCourse = ({course}) => {
    return (
        <div>
            <Header course = {course}/>
            <Content course = {course} />
            <Total course = {course} />
        </div>
    )
}

const Courses = ({courses}) => {
    return (
        <div>
            {courses.map(course => {
               return  <OneCourse course = {course}/>
            })}
        </div>
    )
}

export default Courses
