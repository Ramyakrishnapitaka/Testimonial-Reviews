import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "../App.css"
import { useNavigate } from "react-router-dom";


function Signup() {
    var navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      username: yup
        .string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form Submitted:", values);
      alert("Form submitted successfully!");
      try {
        const response = await fetch("http://localhost:4900/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // send form data as JSON
        });

        const data = await response.json();
        console.log("Response from backend:", data);

        if (response.ok) {
       alert("Signup successful!");
       localStorage.setItem("user", JSON.stringify(data.user)); // ✅ save entire user object
       navigate("/login");
       formik.resetForm();
        }
        else if (data.message === "Email already registered") {
      alert("Email already registered. Redirecting to login...");
      navigate("/login"); 
        }
         else {
          alert(data.message || "Signup failed");
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("An error occurred. Please try again.");
      }
    },
    
  });

  return (
     <div className="signup-container">
    <form onSubmit={formik.handleSubmit} className="signup-form">
      <div className="form-group">
        <label>Email:</label>
        <input type="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email ? (
          <p className="error">{formik.errors.email}</p>
        ) : null}
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" {...formik.getFieldProps("username")} />
        {formik.touched.username && formik.errors.username ? (
          <p className="error">{formik.errors.username}</p>
        ) : null}
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" {...formik.getFieldProps("password")} />
        {formik.touched.password && formik.errors.password ? (
          <p className="error">{formik.errors.password}</p>
        ) : null}
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input type="password" {...formik.getFieldProps("confirmPassword")} />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <p className="error">{formik.errors.confirmPassword}</p>
        ) : null}
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
    </div>
  );
}

export default Signup;


