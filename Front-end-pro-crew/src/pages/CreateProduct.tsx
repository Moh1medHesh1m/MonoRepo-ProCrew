import React, {SyntheticEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';
import config from '../../../config';

const CreateProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`${config.backendApi}/product`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials:'include',
            body: JSON.stringify({
                title,
               
                description,
                price
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/restaurant-home"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">create product</h1>

            <input  type="text" className="form-control" placeholder="Title" required
                   onChange={e => setTitle(e.target.value)}
            />
  <input  type="text" className="form-control" placeholder="Description" required
                   onChange={e => setDescription(e.target.value)}
            />

          

            <input type="number" className="form-control" placeholder="price $" required
                   onChange={e => setPrice(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default CreateProduct;