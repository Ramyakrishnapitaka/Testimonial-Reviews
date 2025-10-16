import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://testimonial-reviews-1.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        console.log("Backend response:", data);

        if (response.ok) {
          alert("Login successful!");
          localStorage.setItem("user", JSON.stringify(data.user)); // ✅ store logged-in user
          navigate("/review");
           }


         else {
          alert(data.message || "Invalid email or password");
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Server error. Please try again.");
      }
    },
  });

  return (
    <div className="login-container">
      <form onSubmit={formik.handleSubmit} className="login-card">
        <h2 className="login-title">Login</h2>

        <div className="login-field">
          <label>Email:</label>
          <input type="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email && (
            <p className="login-error">{formik.errors.email}</p>
          )}
        </div>

        <div className="login-field">
          <label>Password:</label>
          <input type="password" {...formik.getFieldProps("password")} />
          {formik.touched.password && formik.errors.password && (
            <p className="login-error">{formik.errors.password}</p>
          )}
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

