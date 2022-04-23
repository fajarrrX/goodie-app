import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'

export default class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: this.email,
            password: this.password
        };
        console.log(data);
        
        axios.post('/login', data)
        .then(res => {
            console.log(res);
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('id', res.data.id);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            });
            this.props.history.push('/dashboard')
        })
        .catch(err => {
            console.log(err);
            Swal.fire(
                'Failed to login',
                'Something went wrong!',
                'error'
                )
            });
    }
    render() {
        return (
            <div className="container-login">
                <form id="loginForm" onSubmit={this.handleSubmit}>
                    <h3>Login Page</h3>
                    <div className="form-group">
                        <label htmlFor="emailLogin">Email Address</label>
                        <input type="email" className="form-control" id="emailLogin" aria-describedby="emailHelp" placeholder="yourname@example.com" onChange={e => this.email = e.target.value} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordLogin">Password</label>
                        <input placeholder="********" type="password" className="form-control" id="passwordLogin" onChange={e => this.password = e.target.value} />
                    </div>
                        <button type="submit" className="btn btn-outline-dark" >Sign in</button>
                        <br/><br/><br/>
                        <p>Don't have account? register <Link to={'/register'}>here.</Link></p>
                </form>
            </div>
        )
    }
}
