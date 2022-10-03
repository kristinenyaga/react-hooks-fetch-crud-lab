import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[questionsData,setQuestionData]=useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(response => setQuestionData(response))
  },[])
    
  

  function addQuestion(newQuestion){
    setQuestionData([...questionsData,newQuestion])
  }

  function deleteQuestion(id){
 
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"DELETE"
    })
    .then(res => res.json())
    .then(() =>{
       //filter 
    const updatedList= questionsData.filter(question=> question.id !==id)
    setQuestionData(updatedList);
  
    })
  }
  
  function updateQuestion(correctIndex,id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH", 
      headers:{
        "Content-Type":"application/json"
      }, 
      body:JSON.stringify({"correctIndex": correctIndex})
    })
    .then(res => res.json())
    .then(data =>{
      setQuestionData([...questionsData,data])
    })
  }
  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion}  /> : <QuestionList questionsData={questionsData} deleteQuestion={deleteQuestion} updateQuestion={updateQuestion}/>}
    </main>
  );
}

export default App;
