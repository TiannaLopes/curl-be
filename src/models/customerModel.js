const { db } = require("../firebase/firebase.js");
const { collection, getDocs } = require("firebase/firestore");

const getAllCustomers = async () => {
  try {
    const customersCollection = collection(db, "customers");
    const querySnapshot = await getDocs(customersCollection);

    const customers = [];
    querySnapshot.forEach((doc) => {
      customers.push({ id: doc.id, ...doc.data() });
    });

    return customers;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllCustomers };
