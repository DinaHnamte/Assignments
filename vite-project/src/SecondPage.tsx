import "./App.css";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TableComponent from "./lib/components/TableComponent";
import Departments from "./lib/components/Departments";

function SecondPage({ navigate_flag }: { navigate_flag: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!navigate_flag) {
      localStorage.clear();
      navigate("/", {
        replace: true,
        state: {
          error: "You must enter their details before accessing the page.",
        },
      });
    }
  }, [navigate_flag, navigate, location]);

  return (
    <div className="container">
      <TableComponent />
      <Departments />
    </div>
  );
}

export default SecondPage;
