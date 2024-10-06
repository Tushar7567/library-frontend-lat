import React, { useState } from "react";
import Switch from '@mui/material/Switch';
import axios from 'axios'; // Import axios for API calls
import "../styles/LoginPage.css";

function Login() {
  const [isStudent, setIsStudent] = useState(true); // Toggle between student and staff
  const [loginForm, setLoginForm] = useState({
    username: "",
    admissionId: "",
    employeeId: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });



  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  // const API_URL = "process.env.REACT_APP_BASE_URL"; // Your backend URL
  const API_URL = process.env.REACT_APP_BASE_URL; // Your backend URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginForm.password !== loginForm.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage("");
    setIsLoading(true); // Show loading during API request

    // Prepare user data based on whether user is a student or staff
    const userData = {
      userFullName: loginForm.username,
      userType: isStudent ? "Student" : "Staff",
      admissionId: isStudent ? loginForm.admissionId : null,
      employeeId: !isStudent ? loginForm.employeeId : null,
      phoneNumber: loginForm.phoneNumber,
      email: loginForm.email,
      password: loginForm.password,
    };

    try {
      const response = await axios.post(API_URL + "api/auth/register", userData);
      console.log("Response from server:", response.data);

      // Handle successful submission
      alert("Account created successfully!");
      setIsLoading(false); // Stop loading
      resetForm(); // Reset form after submission
    } catch (err) {
      alert("Account creation failed!");
      console.error("Error creating account:", err);
      setErrorMessage("Error creating account. Please try again.");
      setIsLoading(false); // Stop loading
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setLoginForm({ ...loginForm, phoneNumber: value });
    }
  };

  // Reset form function
  const resetForm = () => {
    setLoginForm({
      username: "",
      admissionId: "",
      employeeId: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setIsStudent(true); // Reset toggle to default "Student"
    setErrorMessage(""); // Clear any error message
  };

  return (
    <div className="login-container">
      <br />
      <br />
      <div className="login-card">
        <h2 className="login-title">Create Account</h2>
        <hr />

        {/* Toggle for Student or Staff */}
        <div className="persontype-question">
          <p>Are you a Staff member?</p>
          <Switch
            checked={!isStudent}
            onChange={() => setIsStudent(!isStudent)}
            color="primary"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-fields">
            <label htmlFor="username">Username</label>
            <input
              className="login-textbox"
              type="text"
              name="username"
              value={loginForm.username}
              onChange={handleChange}
              required
            />

            {/* Conditionally render Admission ID or Employee ID based on toggle */}
            {isStudent ? (
              <>
                <label htmlFor="admissionId">Admission ID</label>
                <input
                  className="login-textbox"
                  type="text"
                  name="admissionId"
                  value={loginForm.admissionId}
                  onChange={handleChange}
                  required
                />
              </>
            ) : (
              <>
                <label htmlFor="employeeId">Employee ID</label>
                <input
                  className="login-textbox"
                  type="text"
                  name="employeeId"
                  value={loginForm.employeeId}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <label htmlFor="email">Email ID</label>
            <input
              className="login-textbox"
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              className="login-textbox"
              type="tel"
              name="phoneNumber"
              value={loginForm.phoneNumber}
              onChange={handlePhoneNumberChange}
              maxLength="10"
              pattern="[0-9]{10}"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              className="login-textbox"
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="login-textbox"
              type="password"
              name="confirmPassword"
              value={loginForm.confirmPassword}
              onChange={handleChange}
              required
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Processing..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="signup-option">
          <p className="signup-question">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
