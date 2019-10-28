import React from 'react'
import { updateChecklistStep } from '../../services/checklist-service'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import './update-checklist-step.component.css'

export default class UpdateChecklistStep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.step.title
        }
        this.onTitleChange = this.onTitleChange.bind(this)
        this.updateTitle = this.updateTitle.bind(this)
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value })
    }

    updateTitle() {
        updateChecklistStep(this.state.title, this.props.checklistId, this.props.step._id)
            .then(() => {
                toast.success('Update Step Successfully')
                this.props.reloadChecklists()
            })
    }

    render() {
        return (
            <div className='update-checklist-step-container'>
                <input type='text' className='form-control' value={this.state.title} onChange={this.onTitleChange} />
                <Button onClick={this.updateTitle}>Update</Button>
            </div>
        )
    }
}