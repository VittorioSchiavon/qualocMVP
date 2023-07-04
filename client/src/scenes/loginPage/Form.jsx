import { useContext, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import { TextField } from "@mui/material";
import styles from "./loginPage.module.css";
import Popup from "components/Popup";
import { PopupContext } from "App";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string(),
  address: yup.string(),
  phone: yup.string(),
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
  picture: "",
  phone: "",
  address: ""
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
  const [popup, setPopup] = useContext(PopupContext);

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    
    const formData = new FormData();
    for (let value in values) {
      console.log(values[value])
      formData.append(value, values[value]);
    }
    console.log(formData)
    values?.picture?.name && formData.append("picturePath", values.picture.name);
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/registerUser",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
        setPopup({ type: "success", message: "Account creato con successo, per favore accedi" });      
    }else{
      setPopup({ type: "error", message: "Account NON creato, per favore riprova" });
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (loggedInResponse.ok){
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    console.log("here oklgofk");
    console.log(loggedIn);
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    }
  }else{
    setPopup({ type: "error", message: "Accesso non eseguito. I dati inseriti non sono corretti" });

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
              <div className={styles.titleForm}>
                {isLogin ? "Accedi" : "Registrati"}
              </div>

              <div className={styles.inputContainer}>
                { }
              <Field
                  className={styles.input}
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
                {isRegister && (
                  <>
                    <Field
                      className={styles.input}
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
                    <Field
                      className={styles.input}
                      type="text"
                      label="Cognome"
                      placeholder="Cognome"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      helperText={touched.lastName && errors.lastName}
                    />
                  </>
                )}

                <Field
                  className={styles.input}
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

                {isRegister && <>
                
                  <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                      
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className={styles.dropFile}
                        >
                          <input {...getInputProps()} type="file" />
                          {!values.picture ? (
                            <p >
                              <svg xmlns="http://www.w3.org/2000/svg" className={styles.addImageIcon} viewBox="0 0 24 24"><path d="M18 15V18H15V20H18V23H20V20H23V18H20V15H18M13.3 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V13.3C20.4 13.1 19.7 13 19 13C17.9 13 16.8 13.3 15.9 13.9L14.5 12L11 16.5L8.5 13.5L5 18H13.1C13 18.3 13 18.7 13 19C13 19.7 13.1 20.4 13.3 21Z" /></svg>Inserisci l'immagine profilo (Opzionale)</p>
                          ) : (
                            <div className={styles.dropFile}>{values.picture.name}</div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                    
                    <Field
                      className={styles.input}
                      type="text"
                      label="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                      placeholder="Telefono (Opzionale)"
                      error={
                        Boolean(touched.phone) && Boolean(errors.phone)
                      }
                      helperText={touched.phone && errors.phone}
                    />
                    
                    <Field
                      className={styles.input}
                      type="text"
                      label="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      name="address"
                      placeholder="Indirizzo completo (Opzionale)"
                      error={
                        Boolean(touched.address) && Boolean(errors.address)
                      }
                      helperText={touched.address && errors.address}
                    />
                </>}
              </div>

              {/* BUTTONS */}
              <div>
                <button className="mainButtonGreen" type="submit">
                  {isLogin ? "Accedi" : "Registrati"}
                </button>
                <div
                  className={styles.changeType}
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
