import React, { Component } from 'react'

export default class OutletCard extends Component {
    render() {
        return (
            <div>
                {/* <div className="card p-2" style={{width:"18rem"}}>
                    <img src={this.props.image_url} className="card-img-top" alt={this.props.name}/>
                    <div className="card-body">
                        <h3 className="card-title">{this.props.name}</h3>
                        <h5 className="card-phone_number">{this.props.phone_number}</h5>
                        <p className="card-description">{this.props.address}</p>
                    </div>
                </div> */}
                <article>
                    <img src={this.props.image_url} alt={this.props.name} style={{width: "300px", height: "300px"}}></img>
                    <div className="content">
                        <h2 className="">{this.props.name}</h2>
                        <p>{this.props.address}, Phone Number: <strong>{this.props.phone_number}</strong></p>
                    </div>
                </article>
            </div>
        )
    }
}

