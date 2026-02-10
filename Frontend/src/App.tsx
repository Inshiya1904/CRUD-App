import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";

function App() {
  return (
    
    <BrowserRouter>
    <Toaster position="top-right" />
      <Navbar />

      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
