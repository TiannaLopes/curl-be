// testScript.js
const { getAllCustomers } = require("./src/models/customerModel");

async function testGetAllCustomers() {
  try {
    const customers = await getAllCustomers();
    console.log("All Customers:", customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
}

testGetAllCustomers();
