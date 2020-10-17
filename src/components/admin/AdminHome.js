import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { db } from '../../firebase/firebase'
import NavBar from '../navbar/NavBar'

export class AdminHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            order_detail: [],
            items_details:[],
            items_:[],
            user_:[],
            user_details:[],
            timestamp:[],
            cost:[],
            orders:[],
            id:[]
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
                console.log(this.state.order_detail)
                
               
            })
            .catch(err => {
                console.log('admin home error', err);
            })
    }
    /* async componentDidMount() {
        var res_ = [], userName = []
        await db.collection('orders').get()
            .then(res => {
                res.forEach(element => {
                    


                    res_.push(element.data())
                })
                var order_=[]
                this.setState({ orders: res_ })
                console.log('Response in admin ', this.state.orders);
                this.state.orders.forEach((element, index) => {
                    element['items'].forEach((a,b)=>{
                        db.collection('store').doc(a).get()
                         .then(res=>{
                             order_.push(res.data())
                         })
                         .catch(err=>{
                             console.log(err);
                         })
                    })
                })
                console.log('--',order_);

            })
            .catch(err => {
                console.log('Error in Admin ', err);
            })
    } */
    render() {
        return (
            <div>
                <NavBar />
                <Card>
                    <h2>Admin Home</h2>
                    {this.state.order_detail.map((element, index) => {
                        return (
                            <div key={index}>
                                {element['userId']}
                            </div>
                        )
                    })}



                </Card>
            </div>
        )
    }
}

export default AdminHome
