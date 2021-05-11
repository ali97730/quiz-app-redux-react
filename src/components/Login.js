import { Button } from '@material-ui/core';
import React from 'react'
import { auth,provider } from '../firebase';
import { useDispatch} from "react-redux"
import { useHistory } from "react-router-dom";
import "./Login.css";


const Login=() =>{

    const history = useHistory();
    const dispatch = useDispatch()
    const signIn =()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            console.log(result)
                dispatch({
                    type:"SET_USER",
                    user:result.user
                    
                })
            history.push("/")
        })
            .catch(error => { alert(error.message) });
        
    }

    return (
        <div className="login">
                <div className="login__container">
                    <img src="https://www.onlineinterviewquestions.com/storage/categories/May2020/mcq.jpg"
                     alt="Logo"/>
               
                    <h1>Welcome To The Quiz App!</h1>
                    <h2>All the Best</h2>
                    <Button onClick={signIn}>Sign In With Google </Button>
                </div>
        </div>
    )
}

export default Login;
