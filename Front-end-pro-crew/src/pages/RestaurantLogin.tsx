import React, {SyntheticEvent, useState} from 'react';
import {Navigate,Link} from 'react-router-dom';
import config from '../../../config';

function RestaurantLogin (props: { setName: (name: string) => void }) {
  
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(`${config.backendApi}/restaurant/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                name,
                password
            })
        })

        const content = await response.json();
        if(content.statusCode == 400 || content.statusCode == 401){
            setRedirect(false);
        }
        else{
            setRedirect(true);
        }
        console.log(content)
        // console.log(content.name)
        props.setName(content.name);


        
        // console.log(content.jwt)
        console.log(content.name)
        
    }

    if (redirect) {
        return <Navigate to="/restaurant-home"/>;
    }

    return (
        <>
        <div style={{width:"50%",margin:"auto",height:"100%"}}>
        <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal " style={{justifyContent:"center"}}>Welcome Restaurant</h1>  
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="text" className="form-control" placeholder="2sm mt3m" required
                   onChange={e => setUsername(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            /> 


            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
                <Link to="/restaurant-reg" className="navbar-brand">Restaurant-register</Link>
                </div>

        </>  )
}

export default RestaurantLogin