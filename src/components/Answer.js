import React from "react";

function Answer(props) {
  const styleDefault = {
    backgroundColor: props.userAnswer === props.answer ? "#D6DBF5" : "white",
    border:
      props.userAnswer === props.answer ? "none" : "0.794239px solid #4D5B9E",
  };
  function styleCheckedAnswers() {
    if (props.correctAnswer === props.answer)
      return {
        backgroundColor: "#94D7A2",
        border: "none",
      };
    else if (props.userAnswer === props.answer)
      return {
        backgroundColor: "#F8BCBC",
        border: "none",
        opacity: 0.5,
      };
    else
      return {
        opacity: 0.5,
      };
  }

  return (
    <div className="answer-container">
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.answer}
        onChange={props.onClickAnswer}
        checked={props.userAnswer === props.answer}
      />
      <label
        htmlFor={props.id}
        className="answer"
        style={props.checkAnswers ? styleCheckedAnswers() : styleDefault}
      >
        {props.answer}
      </label>
    </div>
  );
}

export default Answer;
