import React, { Component } from 'react';
import { createInventories, getInventoryGroups } from '../services/inventory-service'
import { Accordion, Card, } from 'react-bootstrap'
import './create-inventory.component.css'

export default class CreateInventory extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            inventory: {},
            inventoryGroups: {}
        }

        this.onChangeInventoryDescription = this.onChangeInventoryDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        getInventoryGroups()
            .then(res => this.setState({inventoryGroups: res.data}))
    }

    onChangeInventoryDescription(e, inventoryItem) {
        const prevInventory = this.state.inventory
        this.setState({
            inventory: {
                ...prevInventory,
                [inventoryItem.title]: e.target.value
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(Object.entries(this.state.inventory))

        const inventories = Object.entries(this.state.inventory)
            .map(([inventoryTitle, amount]) => ({
                description: inventoryTitle,
                amount: amount
            }))
        createInventories(inventories)

        this.setState({
            inventory: {},
        })
    }

    _renderInventoryItems(inventoryItems) {
        return inventoryItems.map(inventoryItem => (
            <div className="form-group" key={inventoryItem.title}>
                <label>{inventoryItem.title}: </label>
                <input type="number"
                    className="form-control"
                    value={this.state[inventoryItem.title]}
                    onChange={(e) => this.onChangeInventoryDescription(e, inventoryItem)}
                />
            </div>
        ))
    }

    _renderInventoryGroup(groupType, inventoryItems) {
        return (
            <Card key={groupType}>
                <Accordion.Toggle as={Card.Header} eventKey={groupType}>
                    {groupType}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={groupType}>
                    <Card.Body>{this._renderInventoryItems(inventoryItems)}</Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    }

    renderInventoryGroups() {
        return (
            <Accordion>
                {Object.entries(this.state.inventoryGroups)
                    .map(([groupType, inventoryItems]) => this._renderInventoryGroup(groupType, inventoryItems))}
            </Accordion>
        )
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Inventory</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-fields-container">
                        {this.renderInventoryGroups()}
                    </div>
                    <div className="form-group submit-button-container">
                        <input type="submit" value="Create Inventory" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}