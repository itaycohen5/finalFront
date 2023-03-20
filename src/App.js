import './App.css';
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import LoginPage from "./LoginPage";
import ManagePage from "./ManagePage";
import MyProductPage from "./MyProductPage";
import MyOfferPage from "./MyOfferPage";
import ProductPage from "./ProductPage";
import Index from "./NavBar/Index";
import DashboardPage from "./DashboardPage";
import InnerProduct from "./InnerProduct";

function App() {
  return (
      <BrowserRouter>
          <Index/>
          <Routes>
              <Route path={"/"} element={<LoginPage/>}/>
              <Route path={"/login"} element={<LoginPage/>}/>
              <Route path={"/manage"} element={<ManagePage/>}/>
              <Route path={"/dashboard"} element={<DashboardPage/>}/>
              <Route path={"/product"} element={<ProductPage/>}/>
              <Route path={"/my-product"} element={<MyProductPage/>}/>
              <Route path={"/my-offer"} element={<MyOfferPage/>}/>
              <Route path={"/inner-product"} element={<InnerProduct/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;