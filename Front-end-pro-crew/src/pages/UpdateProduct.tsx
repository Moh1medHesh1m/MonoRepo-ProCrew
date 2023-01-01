import React, { SyntheticEvent, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const UpdateProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);
    const location = useLocation();
    const { from } = location.state;
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`http://localhost:8000/product/${from}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                title,

                description,
                price
            })
        });
        console.log(from)

        setRedirect(false);
    }

    if (redirect) {
        return <Navigate to="/restaurant-home" />;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">update product</h1>

            <input type="text" className="form-control" placeholder="Title" required
                onChange={e => setTitle(e.target.value)}
            />
            <input type="text" className="form-control" placeholder="Description" required
                onChange={e => setDescription(e.target.value)}
            />



            <input type="number" className="form-control" placeholder="price $" required
                onChange={e => setPrice(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default UpdateProduct;