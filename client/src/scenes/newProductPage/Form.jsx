import { useContext, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import { TextField } from "@mui/material";
import styles from "./newProductPage.module.css";
import { PopupContext } from "App";

const productSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  price: yup.string(),
  brand: yup.string(),
  shippingCost: yup.string(),
  tags: yup.string(),
  options: yup.string(),
  pictures: yup.string(),
});

const initialValuesProduct = {
  name: "",
  description: "",
  price: "",
  brand: "",
  shippingCost: "",
  tags: "",
  options: "",
  pictures: ""
};

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);


  const addProduct = async (values, onSubmitProps) => {
    
    const formData = new FormData();
    for (let value in values) {
      console.log(values[value])
      formData.append(value, values[value]);
    }
    console.log(formData)
    formData.append("picturePath", values.picture.name);
    const savedProductResponse = await fetch(
      "http://localhost:3001/products/addProduct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const savedProduct = await savedProductResponse.json();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("heresubmit");
    await addProduct(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesProduct}
      validationSchema={productSchema}
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
            <div className={styles.titleForm}>{"Aggiungi un prodotto"}</div>

            <div>
              <>
                <TextField
                  className={styles.input}
                  label="Nome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={
                    Boolean(touched.name) && Boolean(errors.name)
                  }
                  helperText={touched.name && errors.name}
                />
              </>
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
                label="Prezzo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={Boolean(touched.price) && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />
              <TextField
                label="Brand"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brand}
                name="brand"
                error={Boolean(touched.brand) && Boolean(errors.brand)}
                helperText={touched.brand && errors.brand}
              />
              <TextField
                label="Costo di spedizione"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shippingCost}
                name="shippingCost"
                error={Boolean(touched.shippingCost) && Boolean(errors.shippingCost)}
                helperText={touched.shippingCost && errors.shippingCost}
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
                label="Opzioni(separa con',')"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.options}
                name="options"
                error={Boolean(touched.options) && Boolean(errors.options)}
                helperText={touched.options && errors.options}
              />
              
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
                        >
                          <input {...getInputProps()} type="file"/>
                          {!values.picture ? (
                            <p>Inserisci l'immagine profilo</p>
                          ) : (
                            <div>{values.pictures.name}</div>
                          )}
                        </div>
                      )}
                    </Dropzone>
            </div>

            {/* BUTTONS */}
            <div>
              <button className="mainButtonGreen" type="submit">
                Aggiungi
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
