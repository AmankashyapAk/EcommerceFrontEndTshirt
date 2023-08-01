import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email: values.email, password: values.password })
      .then((data) => {
        // here we need to do something for offline
        console.log(data);
        if (data.errors) {
          setValues({ ...values, error: data.errors, loading: false });
        } else if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch();
  };

  const performRedirect = () => {
    if (values.didRedirect) {
      if (user && user.role == 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      values.loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="rows">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-3">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
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
    <Base title="Signin Page" description="A page for user to SignIn!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
