import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import OutletCard from './OutletCard'


export default class OutletList extends Component {
  constructor() {
    super()
    this.state = {
      outlets: []
    }
  
  }
  componentDidMount() {
    axios.get('/outlets', {headers: {access_token: localStorage.getItem('access_token')}})
    .then(res => {
      console.log(res.data);
      this.setState ({
          outlets: res.data
      })
    })
    .catch(err => {
        console.log(err);
    })
  }

  render() {
    return (
      <>
        {(!localStorage.getItem('access_token')) ? 
        <Redirect to="/" /> :
        <div>
          <h1>My Outlet List</h1>
          {(localStorage.getItem('role') !== 'owner' ? <div className="div"></div> :
            <span className="mx-3 text-success">
              <Link to={'/add'} >
                <i className="fas fa-plus fa-clickable"></i>
              </Link>
            </span>)}
            <div className="container-card">
              <main className="grid">
                {this.state.outlets.map(item => {
                  return (
                    <OutletCard
                    name={item.name} 
                    phone_number={item.phone_number} 
                    address={item.address}
                    image_url={item.image_url}
                    id={item.id}
                    key={item.id}
                    />
                  )
                })}
              </main>
          </div>
        </div>}
      </>
    )
  }
}
