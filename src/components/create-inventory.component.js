import React, { Component } from 'react';
import axios from 'axios';

export default class CreateInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
        }

        this.onChangeInventoryDescription = this.onChangeInventoryDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeInventoryDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted: ${this.state.description}`);
        const apiUrl = process.env.API_URL || 'http://localhost:4000'
        const inventory = { description: this.state.description }

        axios.post(`${apiUrl}/inventory/add`, { inventory })
            .then(res => {
                console.log('add inventory successsfully')
            })

        this.setState({
            description: '',
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Inventory</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeInventoryDescription}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Inventory" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}