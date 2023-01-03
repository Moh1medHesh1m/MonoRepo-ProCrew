import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import config from '../config';
import Nav from '../components/Nav';
import { CartContext } from '../context/cartContext';
import Shop from './Shop';
function RestaurantHome() {
  const [name, setName] = useState('');
  const location = useLocation();
  const { from } = location.state;
  const { resId, setResId, title, setTitle, price, setPrice, list, setList }: any = useContext(CartContext)
  const [bool, setBool] = useState(true)

  const [item, setItem] = useState([] as any)
  const prevId = from




  useEffect(() => {
    (
      async () => {
        const response = await fetch(`${config.backendApi}/product/${from}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',


        });

        const content = await response.json()
    
        const data = content.map((element: any) => {
          return {
            id: element._id,
            title: element.title,
            description: element.description,
            price: element.price
          }

        })
        setItem(data)
      
      }
    )(

    );
  }, []);


  useEffect(() => {
    (
      async () => {
        const response = await fetch(`${config.backendApi}/api/user`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const content = await response.json();
    
        setName(content.username);
      }
    )();
  }, []);


  const getLength = (obj: any): number => {
    let count = 0;

    // loop through each key/value
    for (let key in obj) {

      // increase the count
      ++count;
    }
    return count
  }

  return (
    <>
      <Nav name={name} setName={setName} />
      {/* <div>{name}
    
    </div> */}



      <div>


        <div>
          <Row lg={3}>
            {item.map((element: any) => (

              <Col className="d-flex">
                <Card className="flex-fill" style={{ width: "100px" }}>
                  {/* <Card.Img variant="top" src="holder.js/100px180"  /> */}
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>
                      {element.description}
                    </Card.Text>
                    <Card.Text>
                      {element.price}
                    </Card.Text>

                    <Button variant="light" onClick={async () => {

                      setTitle(element.title)
                      setPrice(element.price)
                      setResId(from)

                      const newItem = {
                        id: element.id,
                        title: element.title,
                        price: element.price,
                        resId: from
                      };

                      const firstItemFrom = (Object.values(list)[0] as any)?.resId
                      if (getLength(list) > 0 && firstItemFrom != from) {

                        if (window.confirm("Cant order from 2 resturant!, clear cart first?")) {
                          const temp = { [element.id]: { ...newItem, quantity: 1 } };
                          await setList(temp)
                        }
                      } else {


                        if (element.id in list) {
                          list[element.id].quantity += 1
                          await setList(list)
                        } else {
                          list[element.id] = { ...newItem, quantity: 1 }
                          await setList(list)
                        }
                        // setList([...list, newItem])
                        alert("item added to cart ")
                      }

                      console.log(list)
                    }}>Add to cart</Button>
                  </Card.Body>
                </Card>
              </Col>



            ))}
          </Row>
        </div>


      </div>



    </>
  )
}

export default RestaurantHome