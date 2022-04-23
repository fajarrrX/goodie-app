import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export default class AddForm extends Component {
    handleSubmit = e => {
        e.preventDefault()
        const data = {
            UserId: localStorage.getItem('id'),
            name: this.name,
            phone_number: this.phone_number,
            address: this.address,
            image_url: this.image_url
        }
        console.log(data);
        
        axios.post('/outlets', data, {headers: {access_token: localStorage.getItem('access_token')}})
            .then(res => {
                console.log(res.data);
                Swal.fire(
                    'Successfully to create outlet',
                    'success'
                )
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                console.log(err);
                Swal.fire(
                    'Failed to create outlet',
                    'Something went wrong!',
                    'error'
                  )
            })
    }
    render() {
        return (
            <div id="page" className="col-sm-6 offset-sm-3 text-center">
                <h1>Create New Outlet</h1>
                <form id="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="input-name">Name</label>
                    <input type="text" className="form-control" id="name-create" aria-describedby="namelHelp" onChange={e => this.name = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-phone_number">Phone Number</label>
                        <input type="text" className="form-control" id="phone_number-create" aria-describedby="phone_numberlHelp" onChange={e => this.phone_number = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-address">Address</label>
                        <input type="text" className="form-control" id="address-create" aria-describedby="addresslHelp" onChange={e => this.address = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-image_url">Image URL</label>
                        <input type="text" placeholder="Only accept link of images" className="form-control" id="image_url-create" aria-describedby="image_urllHelp" onChange={e => this.image_url = e.target.value} />
                    </div>
                    
                    <Link to={'/dashboard'} >
                        <button type="button" className="btn btn-outline-dark">Cancel</button>
                    </Link>
                    {" "}
                    <button type="submit" className="btn btn-outline-dark">Submit</button>
                </form>
            </div>
        )
    }
}