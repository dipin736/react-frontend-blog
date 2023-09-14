import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogdetails from "./Components/Blog/Blogdetails";
import Navbar from "./Components/Navbar/Navbar";
import ViewBlog from "./Components/Blog/viewBlog";
import Editblog from "./Components/Blog/Editblog";
import Addpost from "./Components/Blog/Addpost";
import "./App.css";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider } from "./Components/Auth/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Navbar bg="dark" />
        <Routes>
          <Route element={<PrivateRoute/>}>
          <Route path="/BlogDetail/:id" element={<Blogdetails />} />
          <Route path="/EditDetail/:id" element={<Editblog />} />
          <Route path="add/" element={<Addpost />} />
          <Route path="/Home" element={<ViewBlog />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="register/" element={<Register />} />
        </Routes>
      </Router>
      </AuthProvider>
    </>
  );
}

export default App;
