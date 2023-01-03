import React, {SyntheticEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios'
import config from '../../../config';

function Restaurant() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`${config.backendApi}/restaurant`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
               
                password,
                type
            })
        })

     
           setRedirect(true);

       
    }
   

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (<>
        <div style={{width:"50%",margin:"auto",height:"100%"}}>
        <form onSubmit={submit} style={{marginBottom:"20px"}}>
            <h1 className="h3 mb-3 fw-normal">Restaurant register</h1>

            <input  type="Name" className="form-control" placeholder="Name" required
                   onChange={e => setName(e.target.value)}
            />

        <input  type="text" className="form-control" placeholder="type" required
                   onChange={e => setType(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
        </div>
        </>
    );
};


export default Restaurant


