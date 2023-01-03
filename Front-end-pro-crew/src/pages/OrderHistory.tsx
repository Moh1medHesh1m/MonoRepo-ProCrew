import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap';
import config from '../../../config';

function OrderHistory() {
    const [orders,setOrders]= useState([]as any)

    
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${config.backendApi}/order/`, {
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
                        total:element.total,
                        products:element.products,
                  
                        state: element.state
                    }
                  
                  })
                  
                  setOrders(data)
                  console.log(data)
       
            }
        )();
    }, []);
    
  return (
    <div style={{marginLeft:"40%",marginBottom:"20px"}}>
      <h1>Order History page</h1>
       
        {orders.map((element:any)=>(
        <>
        
      <Card style={{ width: '25rem' ,marginTop:"20px"}}>
      <Card.Body>
        <Card.Title>{"order id : "+element.id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{"order price : "+element.total}$</Card.Subtitle>
        <Card.Text>
       order status : {element.state}
        </Card.Text>

        
      </Card.Body>
      {'\t'}
    </Card>
  
        </>
     
    ))}</div>
  )
}

export default OrderHistory