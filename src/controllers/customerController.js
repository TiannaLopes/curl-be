// src/controllers/customerController.js
import { getAllCustomers as getAllCustomersFromModel } from "../models/customerModel.js";

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomersFromModel();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
