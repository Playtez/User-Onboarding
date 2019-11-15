import React from "react";

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// import formik component
// create HOC
// import Forms Field Label

const FormComp = ({ values, touched, errors, status }) => {
  const [userInfo, setUserInfo] = React.useState([]);

  React.useEffect(() => {
    status && setUserInfo(item => [...item, status]);
  }, [status]);

  return (
    <div>
      <h1>hello World!</h1>
      <Form>
        <h3>Login</h3>
        <div className="top-section">
          <label className="form_name space">
            <Field
              type="text"
              placeholder="Type Name"
              name="name"
              value={values.name}
            />
            {touched.name && errors.name && <p> {errors.name}</p>}
          </label>
          <label className="form_email space">
            <Field
              type="email"
              placeholder="Type email"
              name="email"
              value={values.email}
            />
            {touched.email && errors.email && <p> {errors.email} </p>}
          </label>
          <label className="form_password space">
            <Field
              type="password"
              placeholder="Type password"
              name="password"
              value={values.password}
            />
            {touched.password && errors.password && <p> {errors.password} </p>}
          </label>

          <label className="checkbox-container">
            Terms of Service
            <Field type="checkbox" name="termsbox" checked={values.termsbox} />
            <span className="checkmark"> </span>
          </label>

          <button className="button" type="submit">
            Submit!
          </button>
        </div>
      </Form>
      <div>
        {userInfo.map(user => (
          <ul>
            <li>ID:{user.id}</li>
            <li>Name:{user.name}</li>
            <li>Email:{user.email}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

const FormikFormComp = withFormik({
  mapPropsToValues({ name, email, password, termsbox }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      termsbox: termsbox || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  }), // closing braket of shape

  handleSubmit(values, { setStatus, resetForm }) {
    // values is our object with all our data on it
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        resetForm({});
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  } // end of handlesubmit
})(FormComp);

export default FormikFormComp;

console.log("this is HOC", FormikFormComp);
