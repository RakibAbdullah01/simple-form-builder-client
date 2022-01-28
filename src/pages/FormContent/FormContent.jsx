import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import "./FormContent.scss"
const FormContent = () => {
  const [formData, setFormData] = useState();
  const [form, setForm] = useState();
  const [loading, setLoading] = useState(true);
  const name = useLocation().search.split("=")[1];
  const formid = useParams().id;
  // Get Form Data
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await axios.get("https://safe-brook-78895.herokuapp.com/formdata");
      setFormData(data.data);
      setLoading(false);
    };
    getData();
  }, []);

  // Get Form Details
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await axios.get(`https://safe-brook-78895.herokuapp.com/form/${formid}`);
      setForm(data.data);
      setLoading(false);
    };
    getData();
  }, []);
  const data = formData?.filter((d) => d.fname === `${name}`);
  console.log(data);
  return (
    <>
      {!loading ? (
        <Container className="mt-5">
          <h2 className="form-title">{form?.name}</h2>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>{form?.text}</th>
                <th>{form?.number}</th>
                <th>{form?.date}</th>
                <th>{form?.textarea}</th>
              </tr>
            </thead>
           <tbody>
                {data?.map((item) => (
                  <tr key={item._id}>
                    <td>{item.text}</td>
                    <td>{item.number}</td>
                    <td>{item.date}</td>
                    <td>{item.textarea}</td>
                  </tr>
                ))}
              </tbody>
          </Table>
        </Container>
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
    </>
  );
};

export default FormContent;
