import { stat } from 'fs/promises';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import config from '../config';


function RestaurantHistory() {
    const [orders,setOrders]= useState([]as any)
    const [state,setState]= useState([]as any)
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${config.backendApi}/order/restaurant`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();
                const data = content.map((element: any) => {
                    if(element.state == "0"){
                        element.state = "preparing"
                   
                    }
                    if(element.state == "1"){
                        element.state = "deleviering"
                    }
                    if(element.state == "2"){
                      
                        element.state = "delivered"
                    }
                    return {
                      id: element._id,
                      quantity: element.quantity,
                      total:element.total,
                
                      state: element.state
                    }
                  
                  })
                 console.log(content)
                  setOrders(data)

             
                  
            }
        )();
    }, []);
//    console.log(state.length+"sad")

    const submit = async ( element : any,state :any) => {
        let newState 
      
        
        if(state == "preparing"){
            newState = 1
            console.log(state+"nooo")
       
        }
        if(state == "deleviering"){
            newState = 2
            console.log(state+"Nooo")
        }
       
        await fetch(`${config.backendApi}/order/${element}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              state:newState
            })
        });
  
        window.location.reload();
    }
  return (
    <div style={{marginLeft:"40%",marginBottom:"20px"}}>
         <h1>Restaurant Orders</h1>
    <div>{orders.map((element:any)=>(
    
    <>
     
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{element.id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{element.total}</Card.Subtitle>
        <Card.Text>
       {element.state}
        </Card.Text>

        <Button variant="primary" onClick={()=>submit(element.id,element.state)} >update next phase</Button>
      </Card.Body>
    </Card>
        </>
    ))}</div>
    </div>
  )
}

export default RestaurantHistory