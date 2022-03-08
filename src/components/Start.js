import React from "react";

function Start(props) {
  return (
    <div className="start">
      <p className="start--title">Quizzical</p>
      <button className="start--btn" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}

export default Start;
