import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { db } from '../../firebase/firebase'
import NavBar from '../navbar/NavBar'

export class AdminHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            order_detail: [],
            id:[],
            user_:[],
            items_:[]
        }
    }
    componentDidMount() {
        db.collection('orders').get()
            .then((res) => {
                
                res.forEach(doc => {
                    // console.log(doc.data());
                    

                    this.setState(prevState => ({
                        orders: [...prevState.orders, doc.data()],
                        id:[...prevState.id,doc.id]
                    }))


                    this.state.orders.forEach((e,index) => {
                        
                        var user_detail = [], items = []
                        
                        db.collection('Users').doc(e['userId']).get()
                            .then(res => {
                                
                                 user_detail.push(res.data()['fullName'])
                                //  console.log(user_detail);
                                // user_=res.data()['fullName']
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            
                        e['items'].forEach(data => {
                            db.collection('store').doc(data).get()
                                .then(res => {
                                    this.setState(prevState => ({
                                        items_: [...prevState.items_, doc.data()],
                                    }))
                                    // console.log(res.data());
                                    // items.push(res.data())
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                        
                        const id_=this.state.id[index]
                        
                        this.state.order_detail.push({
                           
                                items_details: this.state.items_,
                                user_details:this.state.user_, 
                                timestamp: e['timestamp'],
                                cost: e['cost']
                            
                        })
                    })

                })
                console.log(this.state.order_detail[0]['item_details'])
                
               
            })
            .catch(err => {
                console.log('admin home error', err);
            })
    }
    render() {
        return (
            <div>
                <NavBar />
                <Card>
                    <h2>Admin Home</h2>
                    {this.state.order_detail.map((e, index) => {
                        return (
                            <Card key={index}>
                                
                                <p>{e['timestamp']}</p>
                                <p>{e['cost']}</p>
                                {e['items_details'].map((element,index) => {
                                    return(
                                        <div>
                                            {element}
                                        </div>
                                    )
                                })}
                                
                                {/* {e['items_details'].map((element,index) => {
                                    return (
                                        <div>
                                            <p>{element[]['itemName']}</p>
                                             <p>{element['itemPrice']}</p>
                                             <p>{element['itemDescription']}</p> 
                                        </div>
                                    )
                                })} */}
                                <div>{['user_details'].map(element=>{
                                    return(
                                    <div>
                                        <p>{element['fullName']}</p>
                                        </div>
                                    )
                                })}</div>
                            </Card>
                        )
                    })}
                </Card>
            </div>
        )
    }
}

export default AdminHome
