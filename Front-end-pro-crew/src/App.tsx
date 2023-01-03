import React, { useEffect, useState } from 'react';
import './App.css';
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Restaurant from './pages/Restaurant';
import RestaurantLogin from './pages/RestaurantLogin';
import RestaurantHome from './pages/RestaurantHome';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';
import ProductOneRestaurant from './pages/ProductOneRestaurant';
import { CartContext } from './context/cartContext';
import Shop from './pages/Shop';
import OrderHistory from './pages/OrderHistory';
import RestaurantHistory from './pages/RestaurantHistory';
import config from '../../config'
function App() {
    const [name, setName] = useState('');
    const [resName, setResName] = useState('')
    const [title, setTitle] = useState("123" as string)
    const [price, setPrice] = useState(0 as number)
    const [resId, setResId] = useState(0 as number)
    const [list, setList] = useState([] as any)
    


    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${config.backendApi}/api/user`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();

                setName(content.name);
            }
        )();
    });



    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${config.backendApi}/restaurant`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();
                console.log(content)
                setName(content.name);
            }
        )();
    });
    return (
        <div className="App">
            <CartContext.Provider value={{ resId, setResId, title, setTitle, price, setPrice, list, setList } as any}>
                <BrowserRouter>
                    <Routes>


                        <Route path="/" element={<Login setName={setName} />} />
                        <Route path="/home" element={<Home name={name} />} />

                        <Route path="/register" element={<Register />} />
                        <Route path="/restaurant-reg" element={<Restaurant />} />
                        <Route path="/restaurant-login" element={<RestaurantLogin setName={setResName} />} />
                        <Route path="/restaurant-home" element={<RestaurantHome />} />
                        <Route path="/create-product" element={<CreateProduct />} />
                        <Route path="/update-product" element={<UpdateProduct />} />
                        <Route path="/product-resturant" element={<ProductOneRestaurant />} />
                        <Route path="/cart" element={<Shop />} />
                        <Route path="/order-history" element={<OrderHistory />} />
                        <Route path="/restaurant-history" element={<RestaurantHistory />} />



                    </Routes>

                </BrowserRouter>

            </CartContext.Provider>
        </div>
    );
}

export default App;
