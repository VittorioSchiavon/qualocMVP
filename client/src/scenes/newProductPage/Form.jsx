import { useContext, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
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
});

const initialValuesProduct = {
  name: "",
  description: "",
  price: "",
  brand: "",
  shippingCost: "",
  tags: "",
  options: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [writingTag, setWritingTag] = useState("");
  const [options, setOptions] = useState([]);
  const [writingOptions, setWritingOptions] = useState("");

  const addProduct = async (values, onSubmitProps) => {
    values.options=options.toString()
    values.tags=tags.toString()
    const formData = new FormData();
    for (let value in values) {
      console.log(values[value]);
      formData.append(value, values[value]);
    }
    console.log(formData);
    //formData.append("picture", values.picture.name);
    images.forEach((image) => {
      console.log("picture", image);
      formData.append("picture", image);
    });
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
  const removeTag = (index) => {
    var tempTags= tags
    tempTags.splice(index, 1)
    console.log(tempTags)
    setTags(tempTags);
  };
  const addTag = (event) => {
    console.log("i'm hereee")
    event.preventDefault()
    setTags([...tags, writingTag]);
    setWritingTag("");
  };
  const removeOption = (index) => {
    var tempTags= options
    tempTags.splice(index, 1)
    console.log(tempTags)
    setOptions(tempTags);
  };
  const addOption = (event) => {
    console.log("i'm hereee")
    event.preventDefault()
    setOptions([...options, writingOptions]);
    setWritingOptions("");
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

            <div className={styles.inputContainer}>
              <div>

              
                <Field
                  className={styles.input}
                  label="Nome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  placeholder="nome"
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              <Field
                className={styles.input}
                as="textArea"
                label="Descrizione"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                placeholder="descrizone"
                name="description"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
              />
              <Field
                className={styles.input}
                label="Prezzo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                placeholder="prezzo"
                error={Boolean(touched.price) && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />
              </div>
              <div>
              <Field
                className={styles.input}
                label="Brand"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brand}
                name="brand"
                placeholder="marca"
                error={Boolean(touched.brand) && Boolean(errors.brand)}
                helperText={touched.brand && errors.brand}
              />
              <Field
                className={styles.input}
                label="Costo di spedizione"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shippingCost}
                name="shippingCost"
                placeholder="costi di spedizione"
                error={
                  Boolean(touched.shippingCost) && Boolean(errors.shippingCost)
                }
                helperText={touched.shippingCost && errors.shippingCost}
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
                    {images.length == 0 ? (
                      <p className={styles.dropFile}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.addImageIcon}
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 15V18H15V20H18V23H20V20H23V18H20V15H18M13.3 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V13.3C20.4 13.1 19.7 13 19 13C17.9 13 16.8 13.3 15.9 13.9L14.5 12L11 16.5L8.5 13.5L5 18H13.1C13 18.3 13 18.7 13 19C13 19.7 13.1 20.4 13.3 21Z" />
                        </svg>
                        Inserisci le immagini del prodotto
                      </p>
                    ) : (
                      <div className={styles.dropFile}>
                        {images.length} immagini caricate
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
              </div>
              <form className={styles.tagForm} onSubmit={addTag}>
                  {tags.map((tag,index) => {
                    return (<div className={styles.tag}>
                      <div className={styles.tagText}>{tag}</div>
                      <div
                        className={styles.removeTag}
                        onClick={() => {
                          removeTag(index);
                        }}
                      >
                        x
                      </div>
                    </div>)
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
                  <button className={styles.tagButton} onClick={addTag}></button>
                </form>
                
                <form className={styles.tagForm} onSubmit={addOption}>
                  {options.map((tag,index) => {
                    return (<div className={styles.tag}>
                      <div className={styles.tagText}>{tag}</div>
                      <div
                        className={styles.removeTag}
                        onClick={() => {
                          removeOption(index);
                        }}
                      >
                        x
                      </div>
                    </div>)
                  })}
                  <input
                    type="text"
                    className={styles.tagInput}
                    placeholder="Inserisci le opzioni del prodotto (premere invio ogni categoria)"
                    value={writingOptions}
                    onChange={(event) => {
                      setWritingOptions(event.target.value);
                    }}
                  />
                  <button className={styles.tagButton} onClick={addOption}></button>
                </form>
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
