import React from 'react'
import { updateChecklistStep } from '../../services/checklist-service'
import { toast } from 'react-toastify'
import { Button, Row, Col } from 'react-bootstrap'
import { FileDropZone } from '../common/file-drop-zone.component'
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

    onImageChange(files) {
        this.setState({
            imageUrl: URL.createObjectURL(files[0]),
            imageFile: files[0]
        })
    }

    render() {
        const imageEl = this.state.imageUrl ? <Col><img className='step-image-upload' src={this.state.imageUrl} alt='upload' /></Col> : ''
        return (
            <div className='update-checklist-step-container'>
                <div>
                    <Row>
                        <Col md={2}>
                            <label>Step Image:</label>
                            <FileDropZone onDrop={this.onImageChange} accept={"image/*"} />
                        </Col>
                        {imageEl}
                    </Row>
                    <label for={this.props.step._id + 'title'}>Title:</label>
                    <input id={this.props.step._id + 'title'} type='text' className='form-control' value={this.state.title} onChange={this.onTitleChange} />
                </div>
                <Button onClick={this.updateTitle}>Update</Button>
            </div>
        )
    }
}