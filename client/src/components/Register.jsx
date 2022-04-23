import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

export default class Register extends Component {

    handleSubmit = e => {
        e.preventDefault()
        const data = {
            email: this.email,
            password: this.password
        }
        console.log(data);
        
        axios.post('/register', data)
            .then(res => {
                console.log(res);
                // <Redirect to= {{pathname: "/login"}} />
                Swal.fire(
                    'Successfully register',
                    'Please Login!',
                    'success'
                );
                this.props.history.push('/')

            })
            .catch(err => {
                console.log(err);
                Swal.fire(
                    'Failed to register',
                    'Something went wrong!',
                    'error'
                  )
            })
    }


    render() {
        return (
            <div className="container-register">
                <form id="registerForm" onSubmit={this.handleSubmit}>
                    <h3>Register Page</h3>
                    <div className="form-group">
                        <label htmlFor="emailRegister">Email Address</label>
                        <input placeholder="yourname@example.com" type="email" className="form-control" id="emailRegister" aria-describedby="emailHelp" onChange={e => this.email = e.target.value} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordRegister">Password</label>
                        <input placeholder="********" type="password" className="form-control" id="passwordRegister" onChange={e => this.password = e.target.value} />
                    </div>
                    <button type="submit" className="btn btn-outline-dark">Register</button>
                    <br/><br/><br/>
                    <p>Already a user? Go Sign in <Link to={'/login'} >here.</Link></p>
                </form>
            </div>
        )
    }
}
