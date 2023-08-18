import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstPage from "./FirstPage.tsx";
import SecondPage from "./SecondPage.tsx";

function App() {
  <Router>
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/second" element={<SecondPage />} />
    </Routes>
  </Router>;
}

export default App;
