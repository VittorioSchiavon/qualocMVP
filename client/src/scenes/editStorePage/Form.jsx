import { useContext, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsOwner, setLogin } from "state";
import Dropzone from "react-dropzone";
import styles from "./editStorePage.module.css";
import { PopupContext } from "App";
const storeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  tags: yup.string(),
  description: yup.string(),
  street: yup.string().required("Street is required"),
  streetNumber: yup.string().required("Street number is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  postalCode: yup.string().required("Postal code is required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
});

const Form = ({ existingStore }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popup, setPopup] = useContext(PopupContext);
  const token = useSelector((state) => state.token);
  const [images, setImages] = useState(existingStore?.picture);
  const [tags, setTags] = useState(existingStore?.tags);
  const [writingTag, setWritingTag] = useState("");

  const initialValues = {
    name: existingStore?.name,
    tags: existingStore?.tags.toString(),
    description: existingStore?.description,
    street: existingStore?.street,
    streetNumber: existingStore?.streetNumber,
    city: "Padova",
    country: "Italia",
    postalCode: existingStore?.postalCode,
    phone: existingStore?.phone,
  };

  const createStore = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    values.tags = tags.toString();
    values._id = existingStore._id;
    const formData = new FormData();
    for (let value in values) {
      console.log(values[value]);
      formData.append(value, values[value]);
    }
    //values?.picture?.name && formData.append("picture", values.picture.name);
    images.forEach((image) => {
      console.log("picture", image);
      formData.append("picture", image);
    });
    for (const value of formData.values()) {
      console.log(value);
    }

    const savedStoreResponse = await fetch(
      "http://localhost:3001/stores/editStore",
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
      dispatch(setIsOwner());
      setPopup({ type: "success", message: "Negozio creato con successo" });
      //navigate("/")
    } else {
      setPopup({
        type: "error",
        message: "Negozio NON creato, per favore riprova",
      });
    }
  };

  const removeTag = (index) => {
    var tempTags = tags;
    tempTags.splice(index, 1);
    console.log(tempTags);
    setTags(tempTags);
  };
  const addTag = (event) => {
    console.log("i'm hereee");
    event.preventDefault();
    setTags([...tags, writingTag]);
    setWritingTag("");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
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
                Modifica {existingStore.name}
              </div>

              <div className={styles.inputContainer}>
                <div>
                  <Field
                    className={styles.input}
                    type="text"
                    label="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Nome Negozio"
                    name="name"
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <Field
                    className={styles.input}
                    as="textarea"
                    label="description"
                    placeholder="Descrizione"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={
                      Boolean(touched.description) &&
                      Boolean(errors.description)
                    }
                    helperText={touched.description && errors.description}
                  />

                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple
                    onDrop={(acceptedFiles) =>
                      acceptedFiles.forEach((file) => {
                        setImages((prevState) => [...prevState, file]);
                      })
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} type="file" />
                        {images?.length == 0 ? (
                          <p className={styles.dropFile}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={styles.addImageIcon}
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 15V18H15V20H18V23H20V20H23V18H20V15H18M13.3 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V13.3C20.4 13.1 19.7 13 19 13C17.9 13 16.8 13.3 15.9 13.9L14.5 12L11 16.5L8.5 13.5L5 18H13.1C13 18.3 13 18.7 13 19C13 19.7 13.1 20.4 13.3 21Z" />
                            </svg>
                            Inserisci l'immagine del negozio (Opzionale)
                          </p>
                        ) : (
                          <div className={styles.dropFile}>
                            {images?.length} immagini caricate
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  <div className={styles.removeImages}onClick={()=>setImages([])}>rimuovi immagini inserite</div>

                </div>
                <div>
                  <Field
                    className={styles.input}
                    type="text"
                    label="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    placeholder="Telefono"
                    error={Boolean(touched.phone) && Boolean(errors.phone)}
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
                    error={Boolean(touched.street) && Boolean(errors.street)}
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
                    placeholder="Numero civico"
                    error={
                      Boolean(touched.streetNumber) &&
                      Boolean(errors.streetNumber)
                    }
                    helperText={touched.streetNumber && errors.streetNumber}
                  />

                  <Field
                    className={styles.input}
                    label="city"
                    type="text"
                    onBlur={handleBlur}
                    value={"Padova"}
                    name="city"
                    placeholder="Città"
                    error={Boolean(touched.city) && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                  />
                  <Field
                    className={styles.input}
                    label="postalCode"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.postalCode}
                    name="postalCode"
                    placeholder="Codice Postale"
                    error={
                      Boolean(touched.postalCode) && Boolean(errors.postalCode)
                    }
                    helperText={touched.postalCode && errors.postalCode}
                  />
                </div>
                <form className={styles.tagForm} onSubmit={addTag}>
                  {tags?.map((tag, index) => {
                    return (
                      <div className={styles.tag}>
                        <div className={styles.tagText}>{tag}</div>
                        <div
                          className={styles.removeTag}
                          onClick={() => {
                            removeTag(index);
                          }}
                        >
                          x
                        </div>
                      </div>
                    );
                  })}
                  <input
                    type="text"
                    className={styles.tagInput}
                    placeholder="Inserisci le categorie delle merci (premere invio ogni categoria)"
                    value={writingTag}
                    onChange={(event) => {
                      setWritingTag(event.target.value);
                    }}
                  />
                  <button
                    className={styles.tagButton}
                    onClick={addTag}
                  ></button>
                </form>
              </div>

              {/* BUTTONS */}
              <div>
                <button className="mainButtonGreen" type="submit">
                  Crea Negozio
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
