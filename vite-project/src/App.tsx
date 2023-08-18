import "./App.css";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

function App() {
  interface Form_Data {
    name: string;
    email: string;
    phone: string;
  }

  const [error_msg, set_error_msg] = useState("");
  const [form_data, set_form_data] = useState<Form_Data>({
    name: "",
    email: "",
    phone: "",
  });

  const clearError = () => {
    set_error_msg("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    set_form_data((prev) => ({ ...prev, [name]: value }));
    clearError();
  };

  const handleSubmit = () => {
    if (
      form_data.name === "" ||
      form_data.email === "" ||
      form_data.phone === ""
    ) {
      set_error_msg("Please enter all the fields");
    }
    try {
      Object.keys(form_data).forEach((key) => {
        localStorage.setItem(key, form_data[key as keyof Form_Data]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const clearStorage = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
  };
  return (
    <>
      <div className="form">
        <label htmlFor="name">Name</label>
        <TextField type="text" name="name" onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <TextField type="text" name="email" onChange={handleChange} />
        <label htmlFor="phone">Phone</label>
        <TextField type="text" name="phone" onChange={handleChange} />
        <Button className="button" onClick={handleSubmit}>
          Submit
        </Button>
        <Button onClick={clearStorage}>Clear</Button>
        <p className="error">{error_msg}</p>
      </div>
    </>
  );
}

export default App;
