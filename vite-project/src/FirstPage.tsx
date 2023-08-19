import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { Form_Data } from "./lib/types";

function FirstPage({ set_navigate_flag }: { set_navigate_flag: () => void }) {
  const [error_msg, set_error_msg] = useState("");
  const [form_data, set_form_data] = useState<Form_Data>({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const error: string = location.state?.error;

  useEffect(() => {
    if (error) {
      set_error_msg(error);
    }
  }, [error]);

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
      return;
    }
    try {
      Object.keys(form_data).forEach((key) => {
        localStorage.setItem(key, form_data[key as keyof Form_Data]);
      });
      set_navigate_flag();
      navigate("/second");
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
        <span className="error">{error_msg}</span>
      </div>
    </>
  );
}

export default FirstPage;
