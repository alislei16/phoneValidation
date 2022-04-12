import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomerTableRow = (props) => {
  const { customerId, customerName, customerAddress, customerPhoneNumber, customerInfo } = props.obj;

  const deleteCustomer = () => {
    axios
      .post("http://localhost:3000/phoneValidation-api/customer/delete", { body: { customerId } })
      .then((res) => {
        if (res.status === 200) {
          alert("customer successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  var countryCode = "N/A";
  var countryName = "N/A";
  if (customerInfo != undefined) {
    countryCode = customerInfo.countryCode;
    countryName = customerInfo.countryName;
  }

  return (
    <tr>
      <td>{customerName}</td>
      <td>{customerAddress}</td>
      <td>{customerPhoneNumber}</td>

      <td>{countryCode}</td>
      <td>{countryName}</td>

      <td>
        <Link className="edit-link" to={"/edit-customer/" + customerId}>
          Edit
        </Link>
        <Button onClick={deleteCustomer} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default CustomerTableRow;
