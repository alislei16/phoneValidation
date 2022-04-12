// UpdateCustomer Component for update customer data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerForm from "./CustomerForm";

// UpdateCustomer Component
const UpdateCustomer = (props) => {
  const [formValues, setFormValues] = useState({
    customerName: "",
    customerAddress: "",
    customerPhoneNumber: "",
  });

  //onSubmit handler
  const onSubmit = (customerObject) => {
    axios
      .post("http://localhost:3000/phoneValidation-api/customer/update/" + props.match.params.id, customerObject)
      .then((res) => {
        if (res.status === 200) {
          alert("Customer successfully updated");
          props.history.push("/customer-list");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get("http://localhost:3000/customer/update/" + props.match.params.id)
      .then((res) => {
        const { customerName, customerAddress, customerPhoneNumber } = res.data;
        setFormValues({ customerName, customerAddress, customerPhoneNumber });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return customer form
  return (
    <CustomerForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      Update Customer
    </CustomerForm>
  );
};

// Export UpdateCustomer Component
export default UpdateCustomer;
