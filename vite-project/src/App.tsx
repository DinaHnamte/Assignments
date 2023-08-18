import "./App.css";
import { useState } from "react";

function App() {
  interface Form_Data {
    name: string;
    email: string;
    phone: string;
  }

  const [form_data, set_form_data] = useState<Form_Data>({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    set_form_data((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="form">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={handleChange} />
        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" onChange={handleChange} />

        <div>
          <p>Name: {form_data.name}</p>
          <p>Email: {form_data.email}</p>
          <p>Phone: {form_data.phone}</p>
        </div>
      </div>
    </>
  );
}

export default App;
