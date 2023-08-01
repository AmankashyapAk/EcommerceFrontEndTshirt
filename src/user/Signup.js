import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    mail: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    signup({
      name: values.fname,
      lastName: values.lname,
      email: values.mail,
      password: values.password,
    }).then((data) => {
      if (data.errors) {
        setValues({ ...values, error: data.errors, success: false });
      } else if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          fname: "",
          lname: "",
          mail: "",
          password: "",
          success: true,
        });
      }
    });
    //.catch(console.log("Error in signup"));
  };

  const successMessage = () => {
    return (
      <div className="rows">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: values.success ? "" : "none" }}
          >
            New Accout created successfully. Please{" "}
            <Link to="./signin">Click here</Link> to sign in.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="rows">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: values.error ? "" : "none" }}
          >
            {values.error}
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="rows">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-3">
              <label className="text-light">First Name</label>
              <input
                className="form-control"
                type="text"
                value={values.fname}
                onChange={handleChange("fname")}
              />
            </div>
            <div className="form-group mb-3">
              <label className="text-light">Last Name</label>
              <input
                className="form-control"
                type="text"
                value={values.lname}
                onChange={handleChange("lname")}
              />
            </div>
            <div className="form-group mb-3">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={values.mail}
                onChange={handleChange("mail")}
              />
            </div>
            <div className="form-group mb-4">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block form-control mb-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup Page" description="A page for user to SignUp!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
