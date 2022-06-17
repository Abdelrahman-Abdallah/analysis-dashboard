import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SchoolItemView from "./Pages/SchoolItemView";

function App() {
  return (
    <Routes>
      <Route path="/item/:id" element={<SchoolItemView />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
