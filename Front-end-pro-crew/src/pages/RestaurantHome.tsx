import React, { useState,useEffect} from 'react';

import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import NavRes from '../components/NavRes';
function RestaurantHome() {
    const [name, setName] = useState('');
 

const [item, setItem] = useState([]as any)
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/restaurant', {
                    headers: {'Content-Type': 'application/json'},
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
                const response = await fetch('http://localhost:8000/product', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                   
                 
                });

                const content= await response.json()
                  
                const data = content.map((element : any)=>{
                    return {
                        id : element._id,
                        title: element.title,
                        description : element.description,
                        price: element.price
                    }
                    
                })
                setItem(data)
                console.log(data)
            }
        )(
            
        );
    },[]);

    async function deletePost(id: any ) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
        };
        const response = await fetch(`http://localhost:8000/product/${id}`, requestOptions);
        const data = await response.json();
        window.location.reload();

      
    }
  return (
    <>
     <NavRes name={name} setName={setName}/>
    {/* <div>{name}
    
    </div> */}

    {/* <Link to={'/restaurant-history'}   className="navbar-brand" style={{textDecoration: 'none'}} >Restaurant order history</Link>  */}

    <div>


    <div>
    <Row lg={3}>
        {item.map((element : any)=>(
            
                <Col className="d-flex">
                <Card className="flex-fill"  style={{width:"100px"}}>
      {/* <Card.Img variant="top" src="holder.js/100px180"  /> */}
      <Card.Body>
        <Card.Title>{element.title}</Card.Title>
        <Card.Text>
          {element.description}
        </Card.Text>
        <Card.Text>
          {element.price}
        </Card.Text>
        <Button variant="primary" onClick={()=>{
            deletePost(element.id as any)
            
         }}>Delete Item</Button>
         {"  "}
          <Button variant="light" onClick={()=>{
                      
                    }}><Link to={'/update-product'}  state={{ from: element.id }} className="navbar-brand" style={{textDecoration: 'none'}} >Update Product</Link> </Button>
      </Card.Body>
    </Card>
            </Col>
            
            
          
        ))}
 </Row>
    </div>
  
    {/* {
        title.map((id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined)=>(
           <>
         <li>{id}</li>
         <Button variant="primary" onClick={()=>{
            deletePost(id as any)
            
         }}>DELETE itemc</Button>
         <h1>         </h1>
         <Button variant="dark" onClick={()=>{
                      
         }}><Link to={'/update-product'}  state={{ from: id }} className="navbar-brand" style={{textDecoration: 'none'}} >Update Product</Link> </Button>
         </>
       ) )}
    {/* 
))} */}
    </div>
    <div style={{width:"50%",margin:"auto",height:"100%" , marginTop:"40px" ,marginLeft:"50%"}}>
    <Button variant="dark" style={{width:"20%"}}  ><Link to="/create-product" style={{textDecoration: 'none'}}  ><strong>Add Product</strong></Link></Button> 
    </div>
   
    </>
  )
}

export default RestaurantHome