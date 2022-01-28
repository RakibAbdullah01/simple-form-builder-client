import React from "react";
import "./FormMake.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FormMake = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const { formID } = useParams();
  const [form, setForm] = useState();
  let navigate = useNavigate();
  // Get Form Details
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await axios.get(`https://safe-brook-78895.herokuapp.com/form/${formID}`);
      console.log(data.data);
      setForm(data.data);
      setLoading(false);
    };
    getData();
  }, []);

  //   Post Form Data
  const onSubmit = (data) => {
    data.fname = form.name;
    setLoading(true);
    axios
      .post("https://safe-brook-78895.herokuapp.com/formdata", data)
      .then((response) => {
        if (response.data.acknowledged) {
          alert("Form Data Input Successfully!");
          navigate(`/formdata/${formID}?name=${form?.name}`);
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="form-maker">
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-title">{form?.name}</h2>
          {form?.text && (
            <fieldset className="text">
              <legend>{form?.text}</legend>
              <input {...register("text")} type="text" />
            </fieldset>
          )}

          {form?.number && (
            <fieldset className="number">
              <legend>{form?.number}</legend>
              <input {...register("number")} type="number" />
            </fieldset>
          )}

          {form?.date && (
            <fieldset className="date">
              <legend>{form?.date}</legend>
              <input {...register("date")} type="date" />
            </fieldset>
          )}

          {form?.textarea && (
            <fieldset className="text-area">
              <legend>{form?.textarea}</legend>
              <textarea {...register("textarea")} type="text" />
            </fieldset>
          )}

          <input type="submit" value="Submit" className="btn btn-success m-2" />
        </form>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </div>
      )}
    </div>
  );
};

export default FormMake;
