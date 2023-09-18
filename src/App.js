import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Adminlogin from "./admin/Adminlogin";
import Adminhome from "./admin/Adminhome";
import Adminuserinfo from "./admin/Adminuserinfo";
import Profile from "./components/Profile";
import Addnewprod from "./components/Addnewprod";
import Reqprod from "./admin/Reqprod";
import AdminProdinfo from "./admin/AdminProdinfo";
import Profileprodcardview from "./components/Profileprodcardview";
import Homeprodview from "./components/Homeprodview";
import Wishlistdisplaying from "./components/Wishlistdisplaying";
import Wishlistproductdetails from "./components/Wishlistproductdetails";
import ProfileProductslist from "./admin/ProfileProductslist";
import Adminallproddetailsdisp from "./admin/Adminallproddetailsdisp";
import Pagenotfound from "./components/Pagenotfound";
import Adminprocardveiw from "./admin/Adminprocardveiw";
import Edit from "./components/Edit";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/adminhome" element={<Adminhome />} />
        <Route path="/adminuserinfo/:eml" element={<Adminuserinfo />} />
        <Route path="/profile/:email" element={<Profile />} />
        <Route path="/addnewprod" element={<Addnewprod />} />
        <Route path="/reqprod" element={<Reqprod />} />
        <Route path="/adminprodinfo/:id" element={<AdminProdinfo />} />
        <Route
          path="/profileprodcardview/:id"
          element={<Profileprodcardview />}
        />
        <Route path="/adminprocardveiw/:id" element={<Adminprocardveiw />} />
        <Route path="/homeprodview/:id" element={<Homeprodview />} />
        <Route
          path="/Wishlistdisplaying/:id"
          element={<Wishlistdisplaying />}
        />
        <Route
          path="/Wishlistproductdetail/:id"
          element={<Wishlistproductdetails />}
        />
        <Route path="/profileProductslist" element={<ProfileProductslist />} />
        <Route
          path="/adminallproddetailsdisp/:id"
          element={<Adminallproddetailsdisp />}
        />
        <Route path="/edit/:email" element={<Edit />} />
        <Route path={"*"} element={<Pagenotfound />} />
      </Routes>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
