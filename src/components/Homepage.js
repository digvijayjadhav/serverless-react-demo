import React, { Component } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { db } from '../firebase/firebase'
import './HomePage.css'
import MyOrder from './MyOrder'
import NavBar from './navbar/NavBar'
export class Homepage extends Component {

    constructor() {
        super()
        this.state = {
            store: [],
            name_prop:'',
            desc_prop:'',
            price_prop:'',
            img_prop:'',
            flag:'',
        }
        this.handleMyCart=this.handleMyCart.bind(this);
    }
    async componentDidMount() {
        await db.collection("store").get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = doc.data()
                    this.setState(prevState => ({
                        store: [...prevState.store, data]
                    }))
                })
                console.log(this.state.store);
            })
            .catch(err => {
                console.log('error in home page', err);
            })

    }
    handleMyCart(e,name,desc,price,img){
        e.preventDefault()
        this.setState({
            name_prop:name,
            desc_prop:desc,
            price_prop:price,
            img_prop:img,
            flag:"myorder"
        })
    }
    render() {
        if (this.state.flag === "myorder") {
            return (
                <div>
                    <MyOrder name={this.state.name_prop} description={this.state.desc_prop} price={this.state.price_prop} imgUrl={this.state.img_prop} />
                </div>
            )
        }
        return (
            <div>
                <NavBar />
                <h1><center>Store</center></h1>
                <Card className="home-outer-card">

                    <ListGroup>
                        {this.state.store.map(e => {
                            return (
                                <Card className="home-item-card">
                                    <ListGroup.Item>
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
                                            <Col><Button className="btn-secondary" style={{ marginLeft: '80%', backgroundColor: '#FFDD3C', color: '#000', margin: 'none' }}>Add To Cart</Button></Col>
                                            <Col><Button className="btn-secondary" onClick={e => {
                                                this.handleMyCart(e,e['itemName'],e['itemDescription'],e['itemPrice'],e['imgUrl'])
                                            }} style={{ marginLeft: '20%', backgroundColor: '#FFDD3C', color: '#000', margin: 'none' }}>View Cart</Button></Col>
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
