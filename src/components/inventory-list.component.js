import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getInventoryByDate } from '../services/inventory-service'
import { getTodayISO } from '../services/date-service'

const today = getTodayISO()

export default class InventoryList extends Component {
    state = {
        inventories: []
    }

    componentDidMount() {
        getInventoryByDate(today)
            .then(res => {
                const inventories = res.data.map((i) => ({
                    id: i._id,
                    description: i.description,
                    amount: i.amount
                }))
                this.setState({ inventories })
            })
    }

    showInventoryTypes() {
        const listItems = this.state.inventories
            .map(inventory => <ListGroup.Item key={inventory.id + '_type'}>{inventory.description}</ListGroup.Item>)
        return (
            <ListGroup>
                {listItems}
            </ListGroup>
        )
    }

    showInventoryAmounts() {
        const listItems = this.state.inventories
            .map(inventory => <ListGroup.Item key={inventory.id + '_amount'} variant='info'>{inventory.amount}</ListGroup.Item>)
        return (
            <ListGroup>
                {listItems}
            </ListGroup>
        )
    }

    render() {
        return (
            <div>
                <h3>Inventory List for {today}</h3>
                <Row>
                    <Col>{this.showInventoryTypes()}</Col>
                    <Col>{this.showInventoryAmounts()}</Col>
                </Row>
            </div>
        )
    }
}