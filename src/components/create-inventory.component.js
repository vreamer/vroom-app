import React, { Component } from 'react';
import { createInventory } from '../services/inventory-service'

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
        const inventory = { description: this.state.description }
        createInventory(inventory)
        
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