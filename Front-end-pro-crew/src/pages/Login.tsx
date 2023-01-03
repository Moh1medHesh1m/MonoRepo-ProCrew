import React, {SyntheticEvent, useState} from 'react';
import { Button } from 'react-bootstrap';
import {Link, Navigate } from "react-router-dom";
import axios from 'axios'
import config from '../../../config';
const Login = (props: { setName: (name: string) => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(`${config.backendApi}/api/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        });

        const content = await response.json();
        if(content.statusCode == 400 || content.statusCode == 401){
            setRedirect(false);
        }
        else{
            setRedirect(true);
        }
        
        console.log(content.jwt)
        props.setName(content.name);
    }

    if (redirect) {
        return <Navigate to="/home"/>;
    }


    return (
        
        <><div style={{width:"50%",margin:"auto",height:"100%"}}>
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal" style={{justifyContent:"center"}}>User sign in</h1>
            <input type="email" className="form-control" placeholder="Email address" required
                   onChange={e => setUsername(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            /> 


            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
        <Button variant="light" style={{marginRight:"50%"}} ><Link to="/restaurant-login" className="navbar-brand">Restaurant-login</Link></Button>  
        
        <Button variant="light" ><Link to="/register" className="navbar-brand">User-Register</Link></Button>  
        </div>
        </>
    );
};

export default Login;
