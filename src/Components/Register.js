import React, { useState } from 'react'
import styles from './Register.module.css';
import {FaUserShield}  from 'react-icons/fa6';
import {useNavigate} from "react-router-dom"

const Register = ({ onGameLevelChange, initialGameLevel }) => {
  const navigate = useNavigate();

  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[number,setNumber] = useState("");
  const[gamelevel,setGameLevel] = useState(initialGameLevel);
  const[nameError,setNameError] = useState("");
  const[emailError,setEmailError] = useState("");
  const[numberError,setNumberError] = useState("");
  const[error,setError] =  useState("");

  const handleName = (e)=>{
    const newName = e.target.value;
    if(newName.length>=6){
      setNameError("");
    } else{
      setNameError("length should be greater than or equal to 6");
    }
    setName(newName);
    setError("");
  }
  const handleEmail = (e)=>{
    const newEmail = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   if(!emailPattern.test(newEmail)){
    setEmailError("Invalid email pattern");
   } else{
    setEmailError("")
   }
   setEmail(newEmail);
   setError("");
  }

  const handleNumber = (e)=>{
    const newNumber = e.target.value;
    if(newNumber.length===10){
      setNumberError("");
    } else{
      setNumberError("number should be 10 digits");
    }
    setNumber(newNumber);
    setError("");
  }

  const handleGameLevel = (e)=>{
    const selectedGameLevel = e.target.value;
    setGameLevel(selectedGameLevel);
    onGameLevelChange(selectedGameLevel);
    setError("");
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (name.length >= 6 && emailError === '' && number.length === 10) {
      // All fields are valid, navigate to /squidgame
      setError('');
      navigate('/squidgame');
    } else {
      setError('Please fill out all fields correctly.');
    }
  }

  return (
    <div className={styles.maindiv}>
        <FaUserShield size={70} color='lightslategray'/>
        <h1> Registration Form</h1><br/><br/>
        <form onSubmit={handleSubmit}>
            <input className={styles.inputfield} type='text' placeholder='Enter Name' value={name} onChange={handleName}/><br/><br/>
            {nameError&&<p className={styles.errormssg}>{nameError}</p>}
            <input className={styles.inputfield} type='email' placeholder='Enter Email' value={email} onChange={handleEmail}/><br/><br/>
            {emailError&&<p className={styles.errormssg}>{emailError}</p>}
            <input className={styles.inputfield} type='text' placeholder='Enter Mobile Number' value={number} onChange={handleNumber}/><br/><br/>
            {numberError&&<p className={styles.errormssg}>{numberError}</p>}
            <select className={styles.inputfield} value={gamelevel} onChange={handleGameLevel}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            </select><br/><br/>
            {error&&<p className={styles.errormssg}>{error}</p>}
            <button type='submit' className={styles.button}>Submit</button>
        </form>
        
    </div>
  );
}

export default Register