import React, { Component } from 'react';
import copy from 'clipboard-copy'

export default class InventoryCopy extends Component {
    
    copyAllInventory() {
        const asciiTab = String.fromCharCode(9)
        const inventoryExcelString = this.props.inventories
        .map(i => {
            const amount = i.amount ? i.amount : ''
            const stockIn = i.hasStockIn ? asciiTab : ''
            return amount + stockIn
        })
        .join(asciiTab)
        copy(inventoryExcelString)
    }

    render() {
        return (
            <button onClick={() => this.copyAllInventory()} className="btn btn-primary">Copy All</button>
        )
    }
}