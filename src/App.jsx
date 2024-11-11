import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";

import HomePage from "./pages/Homepage";
import AboutPage from "./pages/Aboutpage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import instance from "./axios";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";
import RegisterPage from "./pages/RegisterPage";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/products");
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //themm
  const handleSubmit = (data) => {
    (async () => {
      try {
        const res = await instance.post("/products", data);
        console.log(res.data);
        setProducts([...products, res.data]);
        if (confirm("Add product successfully, redirect to admin page!")) {
          nav("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  // sua
  const handleSubmitEdit = (data) => {
    (async () => {
      try {
        const res = await instance.patch(`/products/${data.id}`, data);
        const newDatas = await instance.get(`/products`);
        console.log(newDatas);
        setProducts(newDatas.data);
        if (confirm("Add product successfully, redirect to admin page!")) {
          nav("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  // xoa
  const removeProduct = (id) => {
    (async () => {
      try {
        if (confirm("Are you sure?")) {
          await instance.delete(`/products/${id}`);
          const newData = products.filter((item) => item.id !== id && item);
          setProducts(newData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage data={products} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/admin" element={<PrivateRouter />}>
            <Route
              path="/admin"
              element={
                <Dashboard data={products} removeProduct={removeProduct} />
              }
            />
            <Route
              path="/admin/product-add"
              element={<ProductAdd onAdd={handleSubmit} />}
            />
            <Route
              path="/admin/product-edit/:id"
              element={<ProductEdit onEdit={handleSubmitEdit} />}
            />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
