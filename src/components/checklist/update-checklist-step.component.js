import React from 'react'
import { updateChecklistStep } from '../../services/checklist-service'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import './update-checklist-step.component.css'

export default class UpdateChecklistStep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.step.title,
            imageUrl: props.step.image,
            imageFile: null
        }
        this.onTitleChange = this.onTitleChange.bind(this)
        this.updateTitle = this.updateTitle.bind(this)

        this.onImageChange = this.onImageChange.bind(this)
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value })
    }

    updateTitle() {
        updateChecklistStep(this.state.title, this.state.imageFile, this.props.checklistId, this.props.step._id)
            .then(() => {
                toast.success('Update Step Successfully')
                this.props.reloadChecklists()
            })
    }

    onImageChange(e) {
        this.setState({
            imageUrl: URL.createObjectURL(e.target.files[0]),
            imageFile: e.target.files[0]
        })
    }

    render() {
        const imageEl = this.state.imageUrl ? <img className='step-image-upload' src={this.state.imageUrl} alt='upload' /> : ''
        return (
            <div className='update-checklist-step-container'>
                <input type='file' onChange={this.onImageChange} accept='.gif,.jpg,.jpeg,.png'/>
                {imageEl}
                <input type='text' className='form-control' value={this.state.title} onChange={this.onTitleChange} />
                <Button onClick={this.updateTitle}>Update</Button>
            </div>
        )
    }
}