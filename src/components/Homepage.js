import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { db } from '../firebase/firebase'
import './HomePage.css'
import NavBar from './navbar/NavBar'
export class Homepage extends Component {

    constructor() {
        super()
        this.state = {
            store: [],
        }
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
    render() {
        return (
            <div>
                <NavBar/>
                <h1><center>Store</center></h1>
                <Card className="home-outer-card">

                    <ListGroup>
                        {this.state.store.map(e => {
                            return (
                                <Card className="home-item-card">
                                    <ListGroup.Item>
                                       
                                Name : <b>{e['itemName']}</b><br />
                                Description : <b>{e['itemDescription']}</b><br />
                                Price : <b>{e['itemPrice']}</b><br />
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
