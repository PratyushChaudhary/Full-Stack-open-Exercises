import React from "react";

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  const partsArr = props.parts;

  return (
    <div>
      {partsArr.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const initialVal = 0;
  const sumWithInitial = parts.reduce(
    (accumulator, currentVal) => accumulator + currentVal.exercises,
    initialVal,
  );
  return <b>total of {sumWithInitial} exercises</b>;
};

const Course = ({ course }) => {
  console.log(course);
  return (
    <>
      {course.map((courseElem) => {
        return (
          <div key={courseElem.id}>
            <Header course={courseElem.name} />
            <Content parts={courseElem.parts} />
            <Total parts={courseElem.parts} />
          </div>
        );
      })}
    </>
  );
};

export default Course;

