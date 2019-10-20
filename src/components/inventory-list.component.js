import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import { getInventoryByDate } from '../services/inventory-service'
import { getTodayISO } from '../services/date-service'
import copy from 'clipboard-copy'

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
                    amount: i.amount
                }))
                this.setState({ inventories })
            })
    }

    copyAllInventory() {
        const asciiTab = String.fromCharCode(9)
        copy(this.state.inventories.map(i => i.amount).join(asciiTab))
    }

    _renderInventories() {
        return this.state.inventories
            .map(inventory => (
                <tr key={inventory.id}>
                    <td>{inventory.description}</td>
                    <td>{inventory.amount}</td>
                </tr>
            ))
    }

    render() {
        return (
            <div>
                <h3>Inventory List for {today}</h3>
                <button onClick={() => this.copyAllInventory()} className="btn btn-primary">Copy All Inventories</button>
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