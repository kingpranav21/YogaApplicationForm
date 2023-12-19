import React, { useState } from "react";
import "./YogaForm.css"; // Import the stylesheet
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "./components/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51OP7QzSH1uIu4rum4TGbxqg0JeGH8wICyh8EpvtpTSLC70Mqil9nlv9cKcOXRpGSoo1WLf0n34s6QYR6uSks0bBQ00dQtAwHXw"
);
console.log(stripePromise);
const FormComponent = () => {
  const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      age: "",
    
    selectedBatch: "6-7AM",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Validate age
    if (formData.age < 18 || formData.age > 65) {
      alert("Age must be between 18 and 65.");
      return;
    }
    
    
   
  };

  return (
    <div className="yoga-form-container">
      <h1>Yoga Class Admission Form</h1>
      <form>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="Number">Contact:</label>
        <input
          type="text"
          id="Number"
          name="Number"
          value={formData.Number}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          min="18"
          max="65"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor="selectedBatch">Select Batch:</label>
        <select
          id="selectedBatch"
          name="selectedBatch"
          value={formData.selectedBatch}
          onChange={handleChange}
          required
        >
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
        
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
          </form>
          
          
      </div>
      

  );
};

export default FormComponent;
