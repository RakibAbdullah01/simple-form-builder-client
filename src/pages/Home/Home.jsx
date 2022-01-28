import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.scss";

const Home = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await axios.get("https://safe-brook-78895.herokuapp.com/form");
      setData(data.data);
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <>
      {!loading ? (
        <Container className="mt-5">
          <Table striped bordered hover size="sm">
            <thead>
              <tr className="text-center">
                <th>SL</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <Link to={`/form/${item._id}`}>{item.name}</Link>
                  </td>
                  <td className="text-center">
                    {" "}
                    <Link
                      to={`/formdata/${item._id}?name=${item.name}`}
                      className="btn btn-success"
                    >
                      {" "}
                      Reports
                    </Link>{" "}
                  </td>
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

export default Home;
