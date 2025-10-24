const express = require("express");
const moment = require("moment-timezone");
const { db } = require("./connect");

const createEmployees = (req, res) => {
  try {
    const { name, department, salary } = req.body;
    const dateTime = moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");

    if ((!name, !department, !salary)) {
      return res.send("required field is missing");
    }

    const insertQuery = `insert into employees (name, department, salary, created_at) values (?,?,?,?)`;
    const insertParams = [name, department, salary, dateTime];

    db.query(insertQuery, insertParams, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      return res
        .status(201)
        .json({ success: true, message: "Employees data added successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEmployeeData = (req, res) => {
  try {
    const selectQuery = "select * from employees";
    db.query(selectQuery, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      return res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteEmployeeData = (req, res) => {
  try {
    const empId = req.params.empId;
    const deleteQuery = `delete from employees where id = ?`;
    db.query(deleteQuery, empId, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: "No employee data found to delete",
        });
      }

      return res
        .status(200)
        .json({ success: true, message: "employee data deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateEmpDatabyID = (req, res) => {
  try {
    const { empId } = req.params;
    const { name, department, salary } = req.body;
    const dateTime = moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
    const selectQuery = `select * from employees where id = ?`;
    db.query(selectQuery, empId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }

      if (result && result.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "no data found" });
      } else {
        const updateQuery = `update employees set name = ?, department = ?, salary = ?, updated_at = ? where id = ?`;
        const updateParams = [name, department, salary, dateTime];
        db.query(updateQuery, updateParams, (updateErr, updateResult) => {
          if (updateErr) {
            return res
              .status(400)
              .json({ success: false, message: updateErr.message });
          }
          return res.status(200).json({
            success: true,
            message: "Employees data updated successfully",
          });
        });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEmployees,
  getEmployeeData,
  deleteEmployeeData,
  updateEmpDatabyID,
};
