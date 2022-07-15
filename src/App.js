import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {isModalOpen, waiting, loading, questions, index, correct,handleNextQuestion,checkAnswer } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (waiting) {
    return <SetupForm />;
  }
  

  const { question, incorrect_answers, correct_answer } = questions[index];
  // console.log(tempIndex);
  const answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random()*4);
if(tempIndex===3){
  answers.push(correct_answer);
}else{
  answers.push(answers[tempIndex]);
  answers[tempIndex] = correct_answer;
}
  return (
    <main>
      {isModalOpen && <Modal />}
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  onClick={()=>{
                  checkAnswer(correct_answer === answer)
                  }}
                  key={index}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button onClick={handleNextQuestion} className="next-question">next question</button>
      </section>
    </main>
  );
}

export default App;
