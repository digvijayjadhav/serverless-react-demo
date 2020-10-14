import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { db, storageRef } from '../../firebase/firebase'
import NavBar from '../navbar/NavBar'
import './UploadMaterial.css'
export class UploadMaterial extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            price: '',
            imgUrl: '',
            actualUrl: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    async handleSubmit(e) {
        e.preventDefault();
        // console.log(db);
        // const url= await  this.addImageToCloud(this.state.imgUrl)
        try {

            const fileRef = await  storageRef.child(this.state.imgUrl['name'])
            
            fileRef.put(this.state.imgUrl)
                .then(async res => {
                    var url = await fileRef.getDownloadURL();
                    console.log('url : ', url);
                    db.collection('store').add({
                        itemName: this.state.name,
                        itemDescription: this.state.description,
                        itemPrice: this.state.price,
                        imgUrl: url
                    })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log('error:', err);
                        })
                })
                .catch(err => {
                    console.log('error: ',err);
                })

        } catch (err) {
            console.log(err);
        }


        console.log(this.state.name, this.state.description, this.state.price);

    }
    handleImageAsFile = (e) => {
        const image = e.target.files[0]
        console.log();
        this.setState({
            imgUrl: e.target.files[0],
        })

    }
   /*  async addImageToCloud() {
        try {

            const fileRef = await storageRef.child(this.state.imgUrl['name'])
            fileRef.put(this.state.imgUrl)
                .then(async res => {
                    var url = await fileRef.getDownloadURL();
                    console.log('url : ', url);
                    this.setState({ actualUrl: url })
                    return "success"
                })
                .catch(err => {
                    console.log(err);
                })

        } catch (err) {
            console.log(err);
        }
    } */
    render() {
        return (
            <div>
                <NavBar />
                <h1><center>Upload Material</center></h1>
                <Card className="upload-outer-card">
                    <form onSubmit={this.handleSubmit}>
                        <label>Item Name</label>
                        <input className="update-input" onChange={this.handleChange} name="name" /><br />
                        <label>Item Description</label>
                        <input className="update-input" onChange={this.handleChange} name="description" /><br />
                        <label>Item Price</label>
                        <input className="update-input" onChange={this.handleChange} name="price" /><br />
                        <label>Image</label>
                        <input className="update-input" type="file" onChange={this.handleImageAsFile} name="image" /><br />

                        <Button className="update-button" type="submit" >Add</Button>
                    </form>
                </Card>
            </div>
        )
    }
}

export default UploadMaterial
