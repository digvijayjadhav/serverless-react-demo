import React, { Component } from 'react'
import { Button, Card, Col, ListGroup, Row, Nav, Navbar, Form } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { db } from '../../firebase/firebase'
import { CgShoppingCart } from 'react-icons/cg'
import { FaUserCircle } from 'react-icons/fa'
import './HomePage.css'

export class Homepage extends Component {

    constructor() {
        super()
        this.state = {
            store: [],
            name_prop: '',
            desc_prop: '',
            price_prop: '',
            img_prop: '',
            flag: '',
            id: [],
            id_prop: '',
            itemCount:0,
            items:[],
            cartItems:[]
        }
        this.handleMyCart = this.handleMyCart.bind(this);
    }
    async componentDidMount() {
        db.collection('Users').doc(localStorage.getItem('userId')).onSnapshot((res)=>{
            console.log(res.data());
            this.setState({
                itemCount:res.data()['cartItems'].length
            })
        })
               
        
            
        await db.collection("store").get()
            // Snapshot is synchronous where as get is promised based method
            /* onSnapshot((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const data = doc.data()
                    this.setState(prevState => ({
                        store: [...prevState.store, data]
                    }))
                })}) */

            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = doc.data()
                    // console.log("doc id : ",doc.id)
                    this.setState(prevState => ({
                        store: [...prevState.store, data],
                        id: [...prevState.id, doc.id]
                    }))
                })
                // console.log(this.state.store);
            })
            .catch(err => {
                console.log('error in home page', err);
            })

    }
    handleMyCart(e, name, desc, price, img, id) {
        e.preventDefault()
        this.setState({
            name_prop: name,
            desc_prop: desc,
            price_prop: price,
            img_prop: img,
            flag: "myorder",
            id_prop: id,
            
            
        })
    }
    addToCart=(e,itemId)=>{
        e.preventDefault();
        this.setState(prevState => ({
            cartItems: [...prevState.cartItems, itemId],
            
        }))
        db.collection('Users').doc(localStorage.getItem('userId')).update({
            cartItems:this.state.cartItems
        })
        /* db.collection('Users').doc(localStorage.getItem('userId')).collection('cart').add({
            itemId:itemId
        }) */
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
        /* this.setState(prev=>({
            
            items:[...prev.items,itemId],
            itemCount: this.state.itemCount+1
        })) */
        console.log(this.state.items);
        console.log(this.state.itemCount);
    }
    cartItem=(e)=>{
        e.preventDefault();

        this.setState({
            flag: "myorder",
        })
    }
    render() {
        if (this.state.flag === "myorder") {
            return (
                <div>
                    <Redirect to={`/mycart/`} />
                </div>
            )
        }
        return (
            <div>
                <div>

                    <Navbar bg="dark" expand="lg" >
                        <Navbar.Brand href="/home" style={{ color: '#fff' }}>Amazon Clone</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/home" style={{ color: '#fff' }}>Home</Nav.Link>
                                {/* <Nav.Link href="/upload/material" style={{ color: '#fff' }}>Upload</Nav.Link> */}
                                <Nav.Link href="/logout" style={{ color: '#fff' }}>Logout</Nav.Link>

                            </Nav>
                            <Form inline>

                                <CgShoppingCart style={{ height: '30px', width: '30px', color: '#fff' }}  onClick={this.cartItem} /><span className="badge badge-warning">{this.state.itemCount}</span>
                                <FaUserCircle style={{ marginLeft: '17px', height: '30px', width: '30px', color: '#fff' }} />
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <h1><center>Store</center></h1>
                <Card className="home-outer-card">

                    <ListGroup>
                        {this.state.store.map((e, index) => {
                            return (
                                <Card className="home-item-card" key={index}>
                                    <ListGroup.Item >
                                        <Row>
                                            <Col><b style={{ marginTop: '-2%' }}>{e['itemName']}</b><br />
                                            </Col>
                                            <Col style={{ marginLeft: '-20%', }}>
                                                {e['imgUrl'] === "" ? <div></div> : <img style={{ borderStyle: "solid" }} height="75%" width="95%" src={e['imgUrl']} />}
                                            </Col>

                                        </Row>
                                        Description : <b>{e['itemDescription']}</b><br />
                                Price : <b>{e['itemPrice']}</b>

                                        <Row>
                                            <Col><Button className="btn-secondary"
                                            onClick={event=>{
                                                this.addToCart(event,this.state.id[index])
                                            }}
                                             
                                            style={{ marginLeft: '80%', backgroundColor: '#FFDD3C', color: '#000', margin: 'none' }}>Add To Cart</Button></Col>
                                            <Col><Button className="btn-secondary" onClick={this.cartItem}   /* onClick={e => {
                                                this.handleMyCart(e, e['itemName'], e['itemDescription'], e['itemPrice'], e['imgUrl'], this.state.id[index])
                                            }}  */  style={{ marginLeft: '20%', backgroundColor: '#FFDD3C', color: '#000', margin: 'none' }}>View Cart</Button></Col>
                                            {/* <Link to={`/mycart/${e['itemName']}/${e['itemDescription']}/${e['itemPrice']}/${e['imgUrl']} `}><Col><Button className="btn-secondary" style={{ marginLeft:'20%',backgroundColor:'#FFDD3C', color:'#000',margin:'none' }}>View Cart</Button></Col></Link> */}
                                        </Row>


                                    </ListGroup.Item>
                                </Card>
                            )
                        })}


                    </ListGroup>

                </Card>
            </div>
        )
    }
}

export default Homepage
