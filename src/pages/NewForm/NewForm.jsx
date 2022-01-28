import React, { useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const NewForm = () => {
  const [text, setText] = useState(false);
  const [number, setNumber] = useState(false);
  const [date, setDate] = useState(false);
  const [textarea, setTextArea] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  let navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("https://safe-brook-78895.herokuapp.com/form", data)
      .then((response) => {
        console.log(response);
        if (response.data.acknowledged) {
          alert("Form Created Successfully! ");
          reset();
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col sm={8}>
            <div className="left-section">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div id="name" className="m-1">
                  <Form.Label>Form Name</Form.Label>
                  <Form.Control
                    className="w-25"
                    {...register("name")}
                    type="text"
                  />
                </div>

                {text && (
                  <div id="text" className="m-1">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                      className="w-25"
                      {...register("text")}
                      type="text"
                    />
                  </div>
                )}
                {number && (
                  <div id="number" className="m-1">
                    <Form.Label>Number</Form.Label>
                    <Form.Control
                      className="w-25"
                      {...register("number")}
                      type="text"
                    />
                  </div>
                )}

                {date && (
                  <div id="date" className="m-1">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      className="w-25"
                      {...register("date")}
                      type="text"
                    />
                  </div>
                )}

                {textarea && (
                  <div id="text-area" className="m-1">
                    <Form.Label>Text Area</Form.Label>
                    <Form.Control
                      className="w-25"
                      {...register("textarea")}
                      type="text"
                    />
                  </div>
                )}

                {(textarea || date || number || text) && (
                  <input
                    className="btn btn-success m-1 mt-2"
                    type="submit"
                    value="Generate"
                  />
                )}
              </Form>
            </div>
          </Col>
          <Col sm={4}>
            <div className="right-section d-flex flex-column">
              <button
                className="btn btn-primary w-50 m-1"
                onClick={() => setText(!text)}
              >
                {" "}
                Text{" "}
              </button>
              <button
                className="btn btn-primary w-50 m-1"
                onClick={() => setNumber(!number)}
              >
                {" "}
                Number{" "}
              </button>
              <button
                className="btn btn-primary w-50 m-1"
                onClick={() => setDate(!date)}
              >
                {" "}
                Date{" "}
              </button>
              <button
                className="btn btn-primary w-50 m-1"
                onClick={() => setTextArea(!textarea)}
              >
                {" "}
                Text Area{" "}
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewForm;
