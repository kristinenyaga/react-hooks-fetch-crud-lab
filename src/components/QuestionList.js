import React from "react";
import QuestionItem from "./QuestionItem"
function QuestionList({questionsData,deleteQuestion,updateQuestion}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsData.map(question =>{
       return  <QuestionItem key={question.id} deleteQuestion={deleteQuestion} question={question} updateQuestion={updateQuestion}/>

      })}</ul>
    </section>
  );
}

export default QuestionList;
