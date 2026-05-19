const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ obj1 }) => {
  const arr1 = obj1.parts;
  return (
    <>
      <Part part={arr1[0].name} exercises={arr1[0].exercises} />
      <Part part={arr1[1].name} exercises={arr1[1].exercises} />
      <Part part={arr1[2].name} exercises={arr1[2].exercises} />
    </>
  );
};

const Total = ({ obj1 }) => {
  const arr1 = obj1.parts;
  let sum = 0;
  for (let i = 0; i < arr1.length; i++) {
    sum = sum + arr1[i].exercises;
  }
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content obj1={course} />
      <Total obj1={course} />
    </div>
  );
};

export default App;
