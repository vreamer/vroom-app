import React, { Component } from 'react';

export default class CreateInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory_description: '',
        }

        this.onChangeInventoryDescription = this.onChangeInventoryDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeInventoryDescription(e) {
        this.setState({
            inventory_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`inventory Description: ${this.state.inventory_description}`);

        this.setState({
            inventory_description: '',
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Inventory</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.inventory_description}
                            onChange={this.onChangeInventoryDescription}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Inventory" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}