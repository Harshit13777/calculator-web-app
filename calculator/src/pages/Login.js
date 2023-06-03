import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const locat = useLocation();
  const navigat = useNavigate();
  useEffect(() => { }, [navigat, locat]);

  function handleSubmit(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all fields");
    } else {
      // Perform login logic here

      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          return response.json();//convert json to object
        }).then(data => {

          if (data.hasOwnProperty('Error')) {
            alert(data.Error);
            return;
          }


          setEmail('');

          setPassword('');

          sessionStorage.setItem('login', true);
          sessionStorage.setItem('userId', data.userId);


          navigat('/');
        });
    }
  };

  const handleForgetPassword = () => {
    // Perform forget password logic here
    console.log("Forgot password clicked");
  };

  return (
    <>
      <div className="container-fluid bg-dark vh-100 p-2 border">
        <div className="formdiv mx-auto my-5 border w-50 rounded0  ">
          <h1 className="text-center text-light mt-5">LOGIN UP</h1>
          <form>
            <div className="form-group group0 m-auto w-75 mt-5">
              <label className="label text-light " htmlFor="email">
                <h2>Email address</h2>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group group1 m-auto w-75 mt-5">
              <label className="label text-light" htmlFor="password">
                <h2>Password</h2>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12 d-flex flex-column">
                <button className="btn btn-primary mt-3 w-50 mx-auto" onClick={handleSubmit}>
                  <h3>submit</h3>
                </button>
                <button className="btn btn-primary mt-3 w-50 mx-auto" onClick={handleForgetPassword}>
                  <h3>Forget Password</h3>
                </button>
                <Link to="/signup" className="btn btn-primary mt-3 w-50 mx-auto">
                  <h3>Signup</h3>
                </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;