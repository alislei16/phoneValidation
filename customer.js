const router = require("express").Router();
const { ADDCustomer, GetAllCustomers, UpdateCustomer, DeleteCustomer } = require("./../../utils/customer-repo");

//Create Customer
router.post("/ADD", async (req, res) => {
  await ADDCustomer(req.body, res);
});

//Get All Customers
router.get("/get-All", async (req, res) => {
  await GetAllCustomers(res);
});

// router
//   .route("/update/:id")
//   // Get Single customer
//   .get((req, res) => {
//     CustomerSchema.findById(req.params.id, (error, data) => {
//       if (error) {
//         return next(error);
//       } else {
//         res.json(data);
//       }
//     });
//   })

//   // Update customer Data
//   .put((req, res, next) => {
//     CustomerSchema.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       (error, data) => {
//         if (error) {
//           return next(error);
//           console.log(error);
//         } else {
//           res.json(data);
//           console.log("Customer updated successfully !");
//         }
//       }
//     );
//   });

// // Delete Customer
// router.delete("/delete/:id", (req, res, next) => {
//   CustomerSchema.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data,
//       });
//     }
//   });
// });

router.post("/update/:id", async (req, res) => {
  await UpdateCustomer(req.body, res);
});

router.post("/delete/:id", async (req, res) => {
  await DeleteCustomer(req.body.customerId, res);
});

module.exports = router;
