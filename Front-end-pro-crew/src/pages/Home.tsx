

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Prev } from 'react-bootstrap/esm/PageItem';
import { Link } from 'react-router-dom';
import Carosel from '../components/Carosel';
import Nav from '../components/Nav'
import config from '../config'


const Home = (props: { name: string }) => {
    const [name, setName] = useState('');
    const [item, setItem] = useState([] as any)
    let [page,setpage] = useState(0 as any)
    const [change,setChange]= useState(false)
    const [itemback,setItemBack]= useState(false)

    const [search,setSearch]= useState(0 as any)
    const [searchItem,setSearchedItem]= useState('')
    function prev(){
        
        return setpage(page-1)
        
    }
    function next(){
        return setpage(page+1)
    }

    function searched(){
        return setSearch(search+1)
    }
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${config.backendApi}/restaurant/all/${page}`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json()

                const data = content.map((element: any) => {
                    return {
                        id: element._id,
                        name: element.name,
                        type: element.type,
                        image: element.image
                    }

                })
                
                console.log(data)
                console.log(page)
                setItem(data)
               
            }
        )();
    }, [page]);
    console.log(item)

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${config.backendApi}/api/user`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();
                
                console.log("sad", content)
                console.log(content.username)
                setName(content.username);
            }
        )();
    }, []);


    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${config.backendApi}/restaurant/search/${searchItem}`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();
            
              const data = content.map((element: any) => {
                return {
                    id: element._id,
                    name: element.name,
                    type: element.type,
                    image: element.image
                }

            })
            
            console.log(data)
            console.log(page)
            setItem(data)
           

            }
        )();
    }, [change]);

console.log(change)

    return <div>
        <Nav name={name} setName={setName} />


        <div style={{ justifyContent: "center", marginTop: "-24px" }}>

            <Carosel />
        </div>

      
            <h1 style={{ textAlign: "center" }}>Welcome to Restaurants</h1>
            <div style={{marginTop:"30px", marginBottom:"80px"}}>
            <input type="text" placeholder="Search.." onClick={()=>setChange(true) } onBlur={()=>setChange(false)} onChange={ e => setSearchedItem(e.target.value)}></input>
            <button onClick={searched} > search</button>
            </div>
            
            { change? <div> 




                
            </div>
            : <div>
                
                <Row lg={3}>
                {item.map((element: any) => (

                    <Col className="d-flex">
                        <Card className="flex-fill" >
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title className=''>{element.name}</Card.Title>
                                <Card.Text>
                                    {element.type}
                                </Card.Text>
                                <div> <Link to="/product-resturant" state={{ from: element.id }} style={{ textDecoration: 'none' }}  ><Button variant="light" >Visit Restaurant</Button> </Link></div>
                            </Card.Body>
                            
                        </Card>
                    </Col>



                ))}
            </Row>
            <div style={{marginLeft:"50%"}}>
            <button  style={{ border:"0",outline:"inherit"}} onClick={prev}>prev</button>
            {" "}
            
            <button style={{ border:"0",outline:"inherit"}} onClick={next}>next</button>
            </div>
                 </div>}
           
        </div>

  

};

export default Home;
