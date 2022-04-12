import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";

const CustomerForm = (props) => {
  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Required"),
    customerAddress: Yup.string().required("Required"),
    customerPhoneNumber: Yup.string().required("Required"),
  });
  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <Field name="customerName" type="text" className="form-control" />
            <ErrorMessage name="customerName" className="d-block invalid-feedback" component="span" />
          </FormGroup>
          <FormGroup>
            <Field name="customerAddress" type="text" className="form-control" />
            <ErrorMessage name="customerAddress" className="d-block invalid-feedback" component="span" />
          </FormGroup>
          <FormGroup>
            <Field name="customerPhoneNumber" type="text" className="form-control" />
            <ErrorMessage name="customerPhoneNumber" className="d-block invalid-feedback" component="span" />
          </FormGroup>
          <Button variant="danger" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CustomerForm;
