import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import CustomerTableRow from "./CustomerTableRow";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/phoneValidation-api/customer/get-All")
      .then(({ data }) => {
        setCustomers(data.Customers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DataTable = () => {
    return customers.map((res, i) => {
      return <CustomerTableRow obj={res} key={i} />;
    });
  };

  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Adress</th>
            <th>PhoneNumber</th>
            <th>countryCode</th>
            <th>countryName</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default CustomerList;
