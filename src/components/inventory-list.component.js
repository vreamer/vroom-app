import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import { getInventoryByDate } from '../services/inventory-service'
import { getTodayISO } from '../services/date-service'
import InventoryCopy from './inventory-copy.component'
import './inventory-list.component.css'

const today = getTodayISO()

export default class InventoryList extends Component {
    state = {
        inventories: []
    }

    componentDidMount() {
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

    _renderInventories() {
        return this.state.inventories
            .map(inventory => (
                <tr class={this._isInventoryInDanger(inventory.amount) ? 'inventory-in-danger' : ''} key={inventory.id}>
                    <td>{inventory.description}</td>
                    <td>{inventory.amount}</td>
                </tr>
            ))
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