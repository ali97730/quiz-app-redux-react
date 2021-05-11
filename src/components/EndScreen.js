import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Header from './Header';
import "./EndScreen.css";
function EndScreen() {
  const score = useSelector((state) => state.score)
  const questions = useSelector((state) => state.questions)
  const history = useHistory()
  const dispatch = useDispatch()
  
  const replay = () => {
    localStorage.clear();
    dispatch({
      type: 'SET_INDEX',
      index: 0,
    })

    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  const settings = () => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: [],
    })

    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  const logout = () => {
    history.push("/login")
    dispatch({
      type: 'SET_USER',
      user: null
    })
  }

  
   var src1 = "https://static.vecteezy.com/system/resources/previews/000/680/151/original/gold-trophy-with-the-name-plate.jpg"
   var txt1= "Hurray! You Had a Great Score"
 
     var txt2="OOps! It Seems Like you need some more Practice"
    var src2="https://th.bing.com/th/id/Rb82a73c89eed7747b3c2a58033947490?rik=0Ecq7TXH7k05vg&riu=http%3a%2f%2fclipartmag.com%2fimages%2foops-emoticon-36.png&ehk=TDSM%2f35kKfCiY9586VfTsARVQw7lSK8a8mUyXA4AkeY%3d&risl=&pid=ImgRaw"
  


  return (
    <div className="end">
      <Header />
      <div className="topImage">
        <img src={score > questions.length/2?src1:src2} alt="" />
        <h3>{ score > questions.length/2?txt1:txt2}</h3>
      </div>
      <h3>Final Score: {score}</h3>
      <button className="tryagain" onClick={replay}><Link to="/questions" >Try Again</Link></button>
      <button className="backto__set" onClick={settings}><Link to="/">Back to settings</Link></button>
      <button className="logout" onClick={logout}>Logout</button>
    </div>
  )
}
export default EndScreen