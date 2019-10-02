import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

export default class InventoryList extends Component {
    state = {
        inventories: []
    }

    componentDidMount() {
        const apiUrl = process.env.API_URL || 'http://localhost:4000'
        axios.get(`${apiUrl}/inventory`)
            .then(res => {
                const inventories = res.data.map((i) => ({ id: i._id, description: i.description }))
                this.setState({ inventories })
            })
    }

    showInventoryList() {
        const listItems = this.state.inventories
        .map(inventory => <ListGroup.Item key={inventory.id}>{inventory.description}</ListGroup.Item>)
        return (
            <ListGroup>
                {listItems}
            </ListGroup>
        )
    }

    render() {
        return (
            <div>
                <p>Welcome to Inventory List Component!!</p>
                {this.showInventoryList()}
            </div>
        )
    }
}