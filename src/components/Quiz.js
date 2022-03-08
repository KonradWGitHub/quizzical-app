import React, { useEffect, useState } from "react";
import Question from "./Question";
import Answer from "./Answer";
import { nanoid } from "nanoid";

function Quiz() {
  const [quizData, setQuizData] = useState();
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuizData(
          data.results.map((result) => {
            return {
              question: result.question,
              questionID: nanoid(),
              correctAnswer: result.correct_answer,
              userAnswer: "",
              checkAnswers: false,
              answers: [result.correct_answer]
                .concat(result.incorrect_answers)
                .sort((a, b) => 0.5 - Math.random())
                .map((answer) => ({
                  answer: answer,
                  id: nanoid(),
                })),
            };
          })
        );
      });
  }, []);

  function handleChange(event, id) {
    const { value } = event.target;

    setQuizData((prevQuizData) =>
      prevQuizData.map((prevQuestion) =>
        prevQuestion.questionID === id
          ? { ...prevQuestion, userAnswer: value }
          : prevQuestion
      )
    );
  }

  function submitAnswers(event) {
    event.preventDefault();
    let score = 0;
    quizData.forEach((question) =>
      question.correctAnswer === question.userAnswer ? score++ : score
    );
    setScore(score);
    setQuizData((prevQuizData) =>
      prevQuizData.map((prevQuestion) => ({
        ...prevQuestion,
        checkAnswers: !prevQuestion.checkAnswers,
      }))
    );
  }

  return (
    <div>
      {quizData && (
        <div className="quiz">
          {quizData &&
            quizData.map((question) => (
              <div key={nanoid()}>
                <Question question={question.question} key={nanoid()} />
                <form className="quiz--answers">
                  {question.answers.map((answer) => (
                    <Answer
                      answer={answer.answer}
                      key={answer.id}
                      id={answer.id}
                      name={question.questionID}
                      userAnswer={question.userAnswer}
                      correctAnswer={question.correctAnswer}
                      onClickAnswer={(event) =>
                        handleChange(event, question.questionID)
                      }
                      checkAnswers={question.checkAnswers}
                    />
                  ))}
                </form>
              </div>
            ))}
          {quizData[0] && quizData[0].checkAnswers && (
            <span className="quiz--score">
              You scored {score}/10 correct answers
            </span>
          )}
          <button className="quiz--btn" onClick={submitAnswers}>
            Check answers
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
