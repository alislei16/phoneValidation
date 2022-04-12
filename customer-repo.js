const CustomerModel = require("./../models/customer");
const { v4: uuidv4 } = require("uuid");
const { isValid } = require("../helper/validation");

const ADDCustomer = async (customer, res) => {
  try {
    let result = await isValid(customer.customerPhoneNumber);
    console.log(result);
    if (result.valid == false) {
      returnres.status(404).json({
        message: "invalid phone number",
        success: false,
      });
    }

    if (!customer) {
      return res.status(400).json({
        message: "Invalid input",
        success: false,
      });
    }
    let customerToCreate = new CustomerModel({
      ...customer,
      customerInfo: {
        countryCode: result.country_code,
        countryName: result.country_name,
        operatorName: result.country_name,
      },

      customerId: uuidv4(),
    });
    await customerToCreate.save();
    return res.status(201).json({
      message: `Successfully created a customer`,
      success: true,
      customerToCreate,
    });
  } catch (err) {
    return res.status(500).json({
      message: `ERROR ${err}`,
      success: false,
    });
  }
};

const GetAllCustomers = async (res) => {
  try {
    let Customers = await CustomerModel.find();
    if (!Customers) {
      return res.status(400).json({
        message: "Customer Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Successfully retrieved Customers",
      success: true,
      Customers,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Something went wrong ${err}`,
      success: false,
    });
  }
};

const UpdateCustomer = async (customer, res) => {
  try {
    let NewModel = {
      ...customer,
    };
    let updatedCustomer = await CustomerModel.findOneAndUpdate({ customerId: customer.customerId }, NewModel, { upsert: true });
    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Successfully updated the customer",
      success: true,
      NewModel,
    });
  } catch (err) {
    return res.status(500).json({
      message: `ERROR ${err}`,
      success: false,
    });
  }
};

const DeleteCustomer = async (customerId, res) => {
  try {
    if (!customerId) {
      return res.status(400).json({
        message: "Invalid input",
        success: false,
      });
    }
    let deletedObject = await CustomerModel.findOneAndDelete({ customerId: customerId });
    if (!deletedObject) {
      return res.status(404).json({
        message: "Customer not found",
        success: false,
      });
    }
    console.log(deletedObject);
    return res.status(200).json({
      message: "Successfully deleted the customer",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `ERROR ${err}`,
      success: false,
    });
  }
};

const DoesCustomerExist = async (customerId) => {
  try {
    let customerFromDb = await CustomerModel.findOne({ customerId: customerId });
    if (customerFromDb) return true;
    else return false;
  } catch (err) {
    return false;
  }
};

module.exports = {
  ADDCustomer,
  GetAllCustomers,
  DeleteCustomer,
  UpdateCustomer,
};
