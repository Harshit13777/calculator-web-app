import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favorite, setFavorite] = useState("");
  const [password, setPassword] = useState("");
  const locat = useLocation();
  const navigat = useNavigate();
  useEffect(() => { }, [navigat, locat]);

  function validateForm() {
    if (username === "" && email === "") {
      alert("Fill the form");
      return false;
    }

    const pattern = [
      /\w{7,14}/,
      /[A-Z]/,
      /[a-z]/,
      /\d/
    ];

    for (let x of pattern) {
      if (x.test(password) === false) {
        alert("Password must fulfill the requirements");
        return false;
      }
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, favorite, password })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); //convert json to object
        }).then(data => {
          if (data.hasOwnProperty('Error')) {
            alert(data.Error);
            return;
          }
          setUsername('');
          setEmail('');
          setFavorite('');
          setPassword('');
          sessionStorage.setItem('login', true);
          sessionStorage.setItem('userId', data.userId);
          navigat('/');
        });
    }
  }

  return (
    <>
      <div className="container-fluid bg-dark vh-100 p-2">
        <div className="formdiv mx-auto my-5 border w-50 rounded0">
          <h1 className="text-center text-white mt-5">SIGN UP</h1>
          <form>
            <div className="form-group group0  m-auto w-75 mt-5">
              <label className="form text-light" htmlFor="username">NAME</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group group1 m-auto w-75 mt-3">
              <label className="form text-light" htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group group1 m-auto w-75 mt-3">
              <label className="form text-light" htmlFor="favorite">FAVORITE THING</label>
              <input
                type="text"
                className="form-control"
                id="favorite"
                name="favorite"
                value={favorite}
                onChange={(e) => setFavorite(e.target.value)}
              />
            </div>
            <div className="form-group group2 m-auto w-75 mt-3">
              <label className="form text-light" htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="testresult text-white">
                Password must contain:
                <br />
                at least 1 capital letter
                <br />
                digit: 1-9
                <br />
                max size 14, min size 7
              </p>
            </div>
            <div className="col-12 d-flex flex-column mt-3">
                <button className="btn btn-primary mt-3 w-50 mx-auto" onClick={handleSubmit}>
                  <h3>Submit</h3>
                </button>
                <Link to="/login" className="btn btn-primary mt-3 w-50 mx-auto">
                  <h3>Login</h3>
                </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
