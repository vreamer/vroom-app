import React, { Component } from 'react';
import { Badge, Table, InputGroup, FormControl, Button } from 'react-bootstrap'
import { getInventoryByDate, createInventories } from '../services/inventory-service'
import { getTodayISO } from '../services/date-service'
import InventoryCopy from './inventory-copy.component'
import './inventory-list.component.css'
import { toast } from 'react-toastify'
import _ from 'lodash'

const today = getTodayISO()

export default class InventoryList extends Component {
    state = {
        inventories: [],
        newInventories: {},
        inventoryFilter: ''
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
                        <Button key={inventory.description + i} variant="outline-primary" onClick={() => this.addToInventory(i, inventory)}>{i}</Button>
                    ))}
                </InputGroup.Append>
            </InputGroup>
        )
    }

    _renderInventories() {
        return this.getFilteredInventories(this.state.inventories, this.state.inventoryFilter)
            .map(inventory => (
                <tr className={this._isInventoryInDanger(inventory.amount) ? 'inventory-in-danger' : ''} key={inventory.description}>
                    <td>{inventory.description}<Badge pill variant='info'>{inventory.group}</Badge></td>
                    <td>{inventory.amount}</td>
                    <td>{this._renderAddInventory(inventory)}</td>
                </tr>
            ))
    }

    _includesIgnoreCase(value, filter) {
        const lowerCaseFilter = filter.toLowerCase()
        return value.toLowerCase().includes(lowerCaseFilter)
    }

    getFilteredInventories(inventories, filter) {
        if (filter) {
            return _.filter(inventories,
                (i) => this._includesIgnoreCase(i.description, filter) || this._includesIgnoreCase(i.group, filter))
        }
        return inventories
    }

    onChangeInventory(amount, inventory) {
        const prevInventory = this.state.newInventories
        this.setState({
            newInventories: {
                ...prevInventory,
                [inventory.description]: amount
            }
        });
    }

    addToInventory(amount, inventory) {
        const prevAmount = this.state.newInventories[inventory.description] || 0
        this.onChangeInventory(prevAmount + amount, inventory)
    }

    updateInventoryFilter(e) {
        this.setState({ inventoryFilter: e.target.value })
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
                <div>
                    <InventoryCopy inventories={this.state.inventories}></InventoryCopy>
                    <button
                        className='btn btn-primary'
                        onClick={this.saveInventories.bind(this)}>Update Inventory</button>
                    <input className='form-control' type='text' placeholder='Search by name' onChange={this.updateInventoryFilter.bind(this)} />
                </div>
                <div className='inventory-update-table'>
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
                </div>
            </div>
        )
    }
}