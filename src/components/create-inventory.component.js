import React, { Component } from 'react';
import { createInventories } from '../services/inventory-service'

const listOfInventoriesTypes = [
    'Chipsmore',
    'Oreo box',
    'Monde Pola'
]

export default class CreateInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: {},
        }

        this.onChangeInventoryDescription = this.onChangeInventoryDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeInventoryDescription(e, inventoryType) {
        const prevInventory = this.state.inventory
        this.setState({
            inventory: {
                ...prevInventory,
                [inventoryType]: e.target.value
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(Object.keys(this.state.inventory))

        const inventories = Object.keys(this.state.inventory)
            .map(inventoryType => ({
                description: inventoryType
            }))
        createInventories(inventories)

        this.setState({
            inventory: {},
        })
    }

    renderInventoryInputs() {
        return listOfInventoriesTypes.map(inventoryType => (
            <div className="form-group" key={inventoryType}>
                <label>{inventoryType}: </label>
                <input type="number"
                    className="form-control"
                    value={this.state[inventoryType]}
                    onChange={(e) => this.onChangeInventoryDescription(e, inventoryType)}
                />
            </div>
        ))
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Inventory</h3>
                <form onSubmit={this.onSubmit}>
                    {this.renderInventoryInputs()}
                    <div className="form-group">
                        <input type="submit" value="Create Inventory" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}