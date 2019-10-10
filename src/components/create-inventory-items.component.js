import React, { Component } from 'react';
import { getInventoryItems } from '../services/inventory-service'
import Table from 'react-bootstrap/Table'

export default class CreateInventoryItems extends Component {

    state = {
        inventoryItems: []
    }

    componentDidMount() {
        getInventoryItems()
            .then(res => this.setState({ inventoryItems: res.data }))
    }

    _renderInventoryItems() {
        return this.state.inventoryItems.map(i => (
            <tr>
                <td>{i.title}</td>
                <td>{i.group}</td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderInventoryItems()}
                    </tbody>
                </Table>
            </div>
        )
    }
}