import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from "./Header";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import "./Question.css"
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import EndScreen from './EndScreen';


const decodeHTML = function (html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

function Question() {

  const history = useHistory();
  const [questions, setQuestions] = useState([])
  const [answerSelected, setAnswerSelected] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [options, setOptions] = useState([])

  const score = useSelector((state) => state.score)
  const encodedQuestions = useSelector((state) => state.questions)
  const [min, setMin] = useState(localStorage.getItem("MIN")?localStorage.getItem("MIN"):5);
  const [sec, setSec] = useState(localStorage.getItem("SEC") ? localStorage.getItem("SEC") - 1 : 0);
  
  const questionIndex = useSelector((state) => state.index)

  const dispatch = useDispatch()
  
  const question = questions[questionIndex]

  
  
  const answer = question && question.correct_answer

  setTimeout(() => {
    
    localStorage.setItem("MIN", min);
    localStorage.setItem("SEC", sec);
    if ((min <= 0 && sec <= 0) || questionIndex + 1 === questions.length) {
      localStorage.clear();
      history.push("/end");
    }
    if (sec <= 0) {
      setSec(59)
      setMin(min-1)
      
    } else {
      setSec(sec - 1)

    }
    
  }, 1000)
  
  

  useEffect(() => {
    
    const decodedQuestions = encodedQuestions.map(q => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(a => decodeHTML(a))
      }
    
    })

    setQuestions(decodedQuestions)
  }, [encodedQuestions])
 

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers]
    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer)

    setOptions(answers)
  }, [question])

  const handleListItemClick = (event) => {
    setAnswerSelected(true)
    setSelectedAnswer(event.target.textContent)

    
      if (event.target.textContent === answer) {
        
        dispatch({
          type: 'SET_SCORE',
          score: score + 1,
        })
      }
   

    if (questionIndex + 1 <= questions.length) {
      setTimeout(() => {
        setAnswerSelected(false)
        setSelectedAnswer(null)

        dispatch({
          type: 'SET_INDEX',
          index: questionIndex + 1,
        })
      }, 500)
    }
  }

  const handlePreviousClick = () => {
    
    questionIndex === 0 ? dispatch({
      type: 'SET_INDEX',
      index: questionIndex ,
    }): dispatch({
      type: 'SET_INDEX',
      index: questionIndex - 1,
    })
  }

 
  const finishTest = () => {
    history.push("/end")
  }


  const getClass = option => {
    if (!answerSelected) {
      return `item`;
    }

    if (option === answer) {
      return `correct`
    }

    if (option === selectedAnswer) {
      return `selected`
    }
  }

  if (!question) {
    
    return <div>
     Loading
    </div>
  }


    return (

      <div class="question">
        <Header />
            <div className="questionNumber">
                  <h1 >Question No.{questionIndex + 1}/{questions.length} </h1>
            </div>
          <div className="top">
          <ArrowBackIosIcon className="previousbutton" fontSize="large" onClick={handlePreviousClick}/>
       
            <div className="time">{`${Math.ceil(min)}`}Min :{` ${sec} `}Sec left</div>
            
            
            
          <CancelPresentationIcon className="quitbutton" fontSize="large" onClick={finishTest}/>
          </div>
            <h3 className="fullquestion">{question.question}</h3>
        
            <div className="options">
                  <div className="list">
                    {options.map((option, i) => (
                      <h3 key={i} onClick={handleListItemClick} className={getClass(option)}>
                        {option}
                      </h3>
                    ))}
                  </div>
            </div>
           
       
       
          </div>)
      
    
  
}
export default Question