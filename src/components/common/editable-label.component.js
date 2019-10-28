import React from 'react'
import { Button } from 'react-bootstrap'
import './editable-label.component.css'

export default class EditableLabel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: true,
            label: props.label
        }
        this.editLabel = this.editLabel.bind(this)
        this.onLabelChange = this.onLabelChange.bind(this)
        this.updateLabel = this.updateLabel.bind(this)
    }

    editLabel() {
        this.setState({ isEditing: true })
    }

    onLabelChange(e) {
        this.setState({ label: e.target.value })
    }

    updateLabel() {
        this.setState({ isEditing: false })
        this.props.updateLabel(this.state.label)
    }

    _renderEditView() {
        return (
            <div className='edit-label-view'>
                <input type='text' className='form-control' value={this.state.label} onChange={this.onLabelChange} />
                <Button onClick={this.updateLabel}>Update</Button>
            </div>
        )
    }

    render() {
        return (
            <div className='editable-label-container'>
                {this.state.isEditing ?
                    this._renderEditView()
                    :
                    <div onClick={this.editLabel}>{this.props.label}</div>
                }
            </div>
        )
    }
}