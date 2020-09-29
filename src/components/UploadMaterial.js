import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import {db} from '../firebase/firebase'
import NavBar from './navbar/NavBar'
import './UploadMaterial.css'
export class UploadMaterial extends Component {

    constructor(props) {
        super(props)
        this.state = {
             name:'',
             description:'',
             price:'',
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(db);
        db.collection('store').add({
            itemName:this.state.name,
            itemDescription:this.state.description,
            itemPrice:this.state.price

        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log('error:',err);
        })
       
        console.log(this.state.name,this.state.description,this.state.price);
    }
    render() {
        return (
            <div>
                <NavBar/>
                <h1><center>Upload Material</center></h1>
                <Card className="upload-outer-card">
                    <form onSubmit={this.handleSubmit}>
                        <label>Item Name</label>
                        <input className="update-input" onChange={this.handleChange} name="name" /><br/>
                        <label>Item Description</label>
                        <input className="update-input" onChange={this.handleChange} name="description" /><br/>
                        <label>Item Price</label>
                        <input className="update-input" onChange={this.handleChange} name="price" /><br/>

                        <Button className="update-button"  type="submit" >Add</Button>
                    </form>
                </Card>
            </div>
        )
    }
}

export default UploadMaterial
