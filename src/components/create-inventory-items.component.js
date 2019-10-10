import React, { Component } from 'react';
import { getInventoryItems, createInventoryItem } from '../services/inventory-service'
import Table from 'react-bootstrap/Table'

export default class CreateInventoryItems extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inventoryItems: [],
            newInventoryItem: {
                title: '',
                group: ''
            }
        }

        this.onChangeNewInventoryItem = this.onChangeNewInventoryItem.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this._loadInventoryItems()
    }

    _loadInventoryItems() {
        getInventoryItems()
            .then(res => this.setState({ inventoryItems: res.data }))
    }

    _renderInventoryItems() {
        return this.state.inventoryItems.map(i => (
            <tr key={i._id}>
                <td>{i.title}</td>
                <td>{i.group}</td>
            </tr>
        ))
    }

    _renderCreateInventoryItemForm() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group" key="new-inventory-title">
                    <label>Title: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.newInventoryItem.title}
                        onChange={(e) => this.onChangeNewInventoryItem(e, 'title')}
                    />
                </div>
                <div className="form-group" key="new-inventory-group">
                    <label>Group: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.newInventoryItem.group}
                        onChange={(e) => this.onChangeNewInventoryItem(e, 'group')}
                    />
                </div>
                <input type="submit" value="Create Inventory Item" className="btn btn-primary" />
            </form>
        )
    }

    onChangeNewInventoryItem(e, inventoryKey) {
        const prevInventoryItem = this.state.newInventoryItem
        this.setState({
            newInventoryItem: {
                ...prevInventoryItem,
                [inventoryKey]: e.target.value
            }
        })
    }

    onSubmit(e) {
        e.preventDefault();
        createInventoryItem(this.state.newInventoryItem)
            .then(() => this._loadInventoryItems())
    }

    render() {
        return (
            <div>
                {this._renderCreateInventoryItemForm()}
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