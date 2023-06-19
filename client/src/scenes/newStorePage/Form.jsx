import { useContext, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsOwner, setLogin } from "state";
import Dropzone from "react-dropzone";
import styles from "./newStorePage.module.css";
import { PopupContext } from "App";
const storeSchema = yup.object().shape({
  name: yup.string(),
  tags: yup.string(),
  description: yup.string(),
  street: yup.string(),
  streetNumber: yup.string(),
  city: yup.string(),
  country: yup.string(),
  postalCode: yup.string(),
  phone: yup.string(),
});


const initialValues= {
  name: "",
  tags: "",
  description: "",
  street: "",
  streetNumber:"",
  city: "",
  country: "",
  postalCode: "",
  phone: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popup, setPopup] = useContext(PopupContext);
  const token = useSelector((state) => state.token);
  const [images, setImages] = useState([]);

  const createStore = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    
    const formData = new FormData();
    for (let value in values) {
      console.log(values[value])
      formData.append(value, values[value]);
    }
    //values?.picture?.name && formData.append("picture", values.picture.name);
    images.forEach((image) => {
      console.log("picture",image)
      formData.append("picture", image);
    });
    for (const value of formData.values()) {
      console.log(value);
    }

    const savedStoreResponse = await fetch(
      "http://localhost:3001/stores/createStore",
      {
        method: "POST",
        headers: {
          //"Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      
      }
    );
    const savedStore = await savedStoreResponse.json();
    //onSubmitProps.resetForm();
    if (savedStore) {
        dispatch(
          setIsOwner()
        );
        setPopup({ type: "success", message: "Negozio creato con successo" });      
        //navigate("/")
    }else{
      setPopup({ type: "error", message: "Negozio NON creato, per favore riprova" });
    }
    
  };


  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("here");
    await createStore(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={storeSchema}
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
                Crea il tuo Negozio!
              </div>

              <div>
                <Field
                  className={styles.input}
                  type="text"
                  label="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  placeholder="name"
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                    <Field
                      className={styles.input}
                      type="text"
                      label="tags"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.tags}
                      name="tags"
                      placeholder="tags"
                      error={
                        Boolean(touched.tags) && Boolean(errors.tags)
                      }
                      helperText={touched.tags && errors.tags}
                    />
                    <Field
                      className={styles.input}
                      type="text"
                      label="description"
                      placeholder="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      name="description"
                      error={
                        Boolean(touched.description) && Boolean(errors.description)
                      }
                      helperText={touched.description && errors.description}
                    />
                    
    

                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple
                      onDrop={(acceptedFiles) =>
                        acceptedFiles.forEach((file) => {
                          setImages((prevState) => [...prevState, file]);
                        })}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} type="file" />
                          {images.length==0? (
                            <p className={styles.dropFile}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.addImageIcon}
                                viewBox="0 0 24 24"
                              >
                                <path d="M18 15V18H15V20H18V23H20V20H23V18H20V15H18M13.3 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V13.3C20.4 13.1 19.7 13 19 13C17.9 13 16.8 13.3 15.9 13.9L14.5 12L11 16.5L8.5 13.5L5 18H13.1C13 18.3 13 18.7 13 19C13 19.7 13.1 20.4 13.3 21Z" />
                              </svg>
                              Inserisci l'immagine del negozio
                            </p>
                          ) : (
                            <div className={styles.dropFile}>
                              {images.length} immagini caricate
                            </div>
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
                      placeholder="phone"
                      error={
                        Boolean(touched.phone) && Boolean(errors.phone)
                      }
                      helperText={touched.phone && errors.phone}
                    />

                    <Field
                      className={styles.input}
                      type="text"
                      label="street"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.street}
                      name="street"
                      placeholder="Strada"
                      error={
                        Boolean(touched.street) && Boolean(errors.street)
                      }
                      helperText={touched.street && errors.street}
                    />

<Field
                      className={styles.input}
                      type="text"
                      label="streetNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.streetNumber}
                      name="streetNumber"
                      placeholder="streetNumber"
                      error={
                        Boolean(touched.streetNumber) && Boolean(errors.streetNumber)
                      }
                      helperText={touched.streetNumber && errors.streetNumber}
                    />

                <Field
                  className={styles.input}
                  label="city"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  placeholder="city"
                  error={Boolean(touched.city) && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
                                <Field
                  className={styles.input}
                  label="country"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country}
                  name="country"
                  placeholder="country"
                  error={Boolean(touched.country) && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                />
                                <Field
                  className={styles.input}
                  label="postalCode"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.postalCode}
                  name="postalCode"
                  placeholder="postalCode"
                  error={Boolean(touched.postalCode) && Boolean(errors.postalCode)}
                  helperText={touched.postalCode && errors.postalCode}
                />

              </div>

              {/* BUTTONS */}
              <div>
                <button className="mainButtonGreen" type="submit">
                  Crea
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
