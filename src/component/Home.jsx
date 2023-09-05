import React, { useState } from "react";
const Home = ({ startTimer }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (!name) {
      setNameError("Name is required");
      return;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }

    // If validation passes, you can proceed with your form submission logic here
    console.log("Name:", name);
    console.log("Email:", email);
    startTimer();
    window.location.href = "/quiz";
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className='home'>
      <h1>Welcome To Quiz</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          id='name'
          placeholder='Enter your Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className='error'>{nameError}</p>}

        <input
          type='email'
          id='email'
          value={email}
          placeholder='enter your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className='error'>{emailError}</p>}

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Home;
