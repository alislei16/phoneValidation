// CreateCustomer Component for add new customer

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerForm from "./CustomerForm";

// CreateCustomer Component
const CreateCustomer = () => {
  const [formValues, setFormValues] = useState({ customerName: "", customerAddress: "", customerPhoneNumber: "" });
  // onSubmit handler
  const onSubmit = (customerObject) => {
    axios
      .post("http://localhost:3000/phoneValidation-api/customer/ADD", customerObject)
      .then((res) => {
        if (res.status === 201) alert("customer successfully created");
        else Promise.reject();
        console.log(res);
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Return customer form
  return (
    <CustomerForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      Create Customer
    </CustomerForm>
  );
};

// Export CreateCustomer Component
export default CreateCustomer;
