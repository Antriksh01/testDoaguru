const express = require("express");
const {
  createEmployees,
  getEmployeeData,
  deleteEmployeeData,
  updateEmpDatabyID,
} = require("./controller");

const router = express.Router();

router.post("/createEmployees", createEmployees);
router.get("/getEmployeeData", getEmployeeData);
router.delete("/deleteEmployeeData/:empId", deleteEmployeeData);
router.put("/updateEmpDatabyID/:empId", updateEmpDatabyID);

module.exports = router;
