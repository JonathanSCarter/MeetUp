import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true)
  const { closeModal } = useModal();

  useEffect(() => {
    if(username.length < 4 || password.length < 6) setDisabled(true)
    else setDisabled(false)
  }, [username, password])



  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="loginModal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>

          <input
          placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        {errors.email && <p>{errors.email}</p>}
          <input
          placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        {errors.username && <p>{errors.username}</p>}

          <input
          placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
        {errors.firstName && <p>{errors.firstName}</p>}

          <input
          placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            />
        {errors.lastName && <p>{errors.lastName}</p>}

          <input
          placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        {errors.password && <p>{errors.password}</p>}

          <input
          placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
          )}
        <button type="submit" disabled={disabled}>Sign Up</button>
        <div>{errors.path}</div>
      </form>
    </div>
  );
}

export default SignupFormModal;
