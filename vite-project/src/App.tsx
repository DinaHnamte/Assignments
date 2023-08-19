import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import FirstPage from "./FirstPage.tsx";
import SecondPage from "./SecondPage.tsx";

function App() {
  const [navigate_flag, set_navigate_flag] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <FirstPage set_navigate_flag={() => set_navigate_flag(true)} />
          }
        />
        <Route
          path="/second"
          element={<SecondPage navigate_flag={navigate_flag} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
