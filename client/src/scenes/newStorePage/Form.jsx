import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import { TextField } from "@mui/material";
import styles from "./newStorePage.module.css";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),

  name: yup.string(),
  tags: yup.string(),
  description: yup.string(),
  street: yup.string(),
  streetNumber: yup.string(),
  city: yup.string(),
  country: yup.string(),
  postalCode: yup.string(),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  name: "",
  tags: "",
  description: "",
  street: "",
  city: "",
  country: "",
  postalCode: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (values, onSubmitProps) => {
    console.log("here");
    console.log(values);
    values={...values, isOwner: true }
    const savedStoreResponse = await fetch(
      "http://localhost:3001/auth/registerUser",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedStore = await savedStoreResponse.json();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("here")
    await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
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
            <div className={styles.titleForm}>{"Crea un nuovo negozio"}</div>

            <div>
              <>
                <TextField
                  className={styles.input}
                  label="Nome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  label="Cognome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
              </>

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
                          <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
              <TextField
                label="Nome negozio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                label="Tags(separa con',')"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tags}
                name="tags"
                error={Boolean(touched.tags) && Boolean(errors.tags)}
                helperText={touched.tags && errors.tags}
              />
              <TextField
                label="Descrizione"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
              />
              <TextField
                label="Via"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street}
                name="street"
                error={Boolean(touched.street) && Boolean(errors.street)}
                helperText={touched.street && errors.street}
              />
                            <TextField
                label="Numero"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.streetNumber}
                name="streetNumber"
                error={Boolean(touched.streetNumber) && Boolean(errors.streetNumber)}
                helperText={touched.streetNumber && errors.streetNumber}
              />
              <TextField
                label="Città"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={Boolean(touched.city) && Boolean(errors.city)}
                helperText={touched.city && errors.city}
              />
              <TextField
                label="Stato"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name="country"
                error={Boolean(touched.country) && Boolean(errors.country)}
                helperText={touched.country && errors.country}
              />
              <TextField
                label="ZIP"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.postalCode}
                name="postalCode"
                error={Boolean(touched.postalCode) && Boolean(errors.postalCode)}
                helperText={touched.postalCode && errors.postalCode}
              />
            </div>

            {/* BUTTONS */}
            <div>
              <button className="mainButtonGreen" type="submit">
                Registrati
              </button>
              <div
                className={styles.changeType}
                onClick={() => {
                  navigate("/login");
                }}
              >
                {"Hai già un account? Accedi."}
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
