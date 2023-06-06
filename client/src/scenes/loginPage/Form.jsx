import { useContext, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import { TextField } from "@mui/material";
import styles from "./loginPage.module.css"
import Popup from "components/Popup";
import { PopupContext } from "App";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [popup, setPopup] =useContext(PopupContext)

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    /*
    const formData = new FormData();
    for (let value in values) {
      console.log(values[value])
      formData.append(value, values[value]);
    }
    console.log(formData)
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/registerUser",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
      
    }*/
    setPopup({type:"info", message:"ciao" })

  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    console.log("here oklgofk")
    console.log(loggedIn)
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user? loggedIn.user : loggedIn.store, 
          token: loggedIn.token,
        })
      );
      navigate("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };


  return (
    <>

    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
          <div className={styles.titleForm}>{isLogin
                ? "Accedi"
                : "Registrati"}</div>

          <div>
            {isRegister && (
              <>
                <Field className={styles.input}
                                type="text"

                  label="Nome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  placeholder="Nome"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                /> 
                <Field className={styles.input}
                type="text"
                  label="Cognome"
                  placeholder="Cognome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />

                <div></div>
              </>
            )}

            <Field className={styles.input}
                            type="email"

              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              placeholder="Email"
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field className={styles.input}
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              placeholder="Password"

              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
          </div>

          {/* BUTTONS */}
          <div>
            <button className="mainButtonGreen" type="submit">{isLogin ? "Accedi" : "Registrati"}</button>
            <div className={styles.changeType}
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
            >
              {isLogin
                ? "Non hai un account? Registrati."
                : "Hai già un account? Accedi."}
            </div>
          </div>
          </div>
        </form>
      )}
    </Formik>
    </>
  );
};

export default Form;
