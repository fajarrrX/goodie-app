import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class Nav extends Component {
    handleClick = () => {
        localStorage.clear()
      }
    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                            <a className="navbar-brand" href="/dashboard">
                            GoodieApp
                            </a>
                        <div className="d-flex">
                            {localStorage.getItem('access_token') ? 
                            (<div >
                                <a href="/" ><i className="fas fa-sign-out-alt" onClick={this.handleClick}> Sign Out</i></a>
                            </div>) : 
                            (<div >
                                {/* <Link to={'/'} ><i className="fas fa-sign-in-alt"> Sign In</i></Link> */}
                            </div>)}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}