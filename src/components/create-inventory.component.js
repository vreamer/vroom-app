import React, { Component } from 'react';
import { createInventories } from '../services/inventory-service'

const listOfInventoriesTypes = [
    'Chipsmore',
    'Oreo box',
    'Monde Pola 10',

    'Santino Expresso Bar',
    'Boncafe Coffee Beans',
    'Milk For Coffee Machine 12',

    'Orange',
    'Lemon',
    'Grape',
    'Coca Cola',

    'Milo',
    'Soya Bean',
    'Teh Tarik',

    'Milk & Cream 12',
    'Chocolate Banana 12',
    'MERLION Durian 15',
    'Angels Berry 12',
    'Chocolate 15',
    'Mango & Passion Fruit 15',
    'Strawberry Cheesecake 15',
    'Vanilla 15',

    'Shrimp Wonton Noodles',
    'Spaghetti with Chicken Sauce',
    'Stir Fried Chicken & Basil with Rice',

    'Water 24',
    'Coke',
    'Tea',

    'Peanut Butter',
    'Fish biscuits',
    'Lemon puffs',
    'Egg Crackers',
    'Love Letters',
    'Iced Jems',
    'Butterfly',
    'Potato Sticks'
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
        console.log(Object.entries(this.state.inventory))

        const inventories = Object.entries(this.state.inventory)
            .map(([inventoryType, amount]) => ({
                description: inventoryType,
                amount: amount
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