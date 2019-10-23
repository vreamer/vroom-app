import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import { getInventoryByDate, createInventories } from '../services/inventory-service'
import { getTodayISO } from '../services/date-service'
import InventoryCopy from './inventory-copy.component'
import './inventory-list.component.css'
import { toast } from 'react-toastify';

const today = getTodayISO()

export default class InventoryList extends Component {
    state = {
        inventories: [],
        newInventories: {}
    }

    componentDidMount() {
        this._loadInventories()
    }

    _loadInventories() {
        getInventoryByDate(today)
        .then(res => {
            const inventories = res.data.map((i) => ({
                id: i.description,
                description: i.description,
                amount: i.amount,
                hasStockIn: i.hasStockIn
            }))
            this.setState({ inventories })
        })
    }

    _isInventoryInDanger(amount) {
        return amount > 0 && amount <= 0.5
    }
    
    _renderAddInventory(inventory) {
        console.log(inventory)
        return (
            <div>
                <input type="number"
                    value={this.state.newInventories[inventory.description] || ''}
                    onChange={(e) => this.onChangeInventory(e, inventory)}
                />
            </div>
        )
    }

    _renderInventories() {
        return this.state.inventories
            .map(inventory => (
                <tr className={this._isInventoryInDanger(inventory.amount) ? 'inventory-in-danger' : ''} key={inventory.id}>
                    <td>{inventory.description}</td>
                    <td>{inventory.amount}</td>
                    <td>{this._renderAddInventory(inventory)}</td>
                </tr>
            ))
    }

    onChangeInventory(e, inventory) {
        const prevInventory = this.state.newInventories
        this.setState({
            newInventories: {
                ...prevInventory,
                [inventory.description]: e.target.value
            }
        });
    }

    saveInventories() {
        const inventories = Object.entries(this.state.newInventories)
            .map(([inventoryTitle, amount]) => ({
                description: inventoryTitle,
                amount: amount,
                date: today
            }))
        createInventories(inventories)
            .then(_ => {
                toast.success("Inventory updated successfully");
                this.setState({ newInventories: {} })
                this._loadInventories()
            })
    }

    render() {
        return (
            <div>
                <h3>Inventory List for {today}</h3>
                <InventoryCopy inventories={this.state.inventories}></InventoryCopy>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th><button className='btn btn-primary' onClick={this.saveInventories.bind(this)}>Add</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderInventories()}
                    </tbody>
                </Table>
            </div>
        )
    }
}