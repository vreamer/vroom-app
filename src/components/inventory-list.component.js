import React, { Component } from 'react';
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap'
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
                this.setState({ inventories: res.data })
            })
    }

    _isInventoryInDanger(amount) {
        return amount > 0 && amount <= 0.5
    }

    _renderAddInventory(inventory) {
        return (
            <InputGroup>
                <FormControl
                    type="number"
                    placeholder="Amount"
                    value={this.state.newInventories[inventory.description] || ''}
                    onChange={(e) => this.onChangeInventory(e.target.value, inventory)}
                />
                <InputGroup.Append>
                    {inventory.stepAmounts.map(i => (
                        <Button variant="outline-primary" onClick={() => this.onChangeInventory(i, inventory)}>{i}</Button>
                    ))}
                </InputGroup.Append>
            </InputGroup>
        )
    }

    _renderInventories() {
        return this.state.inventories
            .map(inventory => (
                <tr className={this._isInventoryInDanger(inventory.amount) ? 'inventory-in-danger' : ''} key={inventory.description}>
                    <td>{inventory.description}</td>
                    <td>{inventory.amount}</td>
                    <td>{this._renderAddInventory(inventory)}</td>
                </tr>
            ))
    }

    onChangeInventory(amount, inventory) {
        const prevInventory = this.state.newInventories
        const prevAmount = prevInventory[inventory.description] || 0
        this.setState({
            newInventories: {
                ...prevInventory,
                [inventory.description]: prevAmount + amount
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
                            <th>Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderInventories()}
                    </tbody>
                </Table>
                <button
                    className='btn btn-primary float-bottom-right'
                    onClick={this.saveInventories.bind(this)}>Update Inventory</button>
            </div>
        )
    }
}