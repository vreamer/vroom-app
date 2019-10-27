import React from 'react'
import { Accordion, Card, ListGroup } from 'react-bootstrap'
import EditableLabel from '../common/editable-label.component'
import { updateChecklistStep } from '../../services/checklist-service'
import { toast } from 'react-toastify'

export default class UpdateChecklists extends React.Component {
    constructor(props) {
        super(props)
        this.updateChecklistTitle = this.updateChecklistTitle.bind(this)
    }

    updateChecklistTitle(title, checklistId, stepId) {
        updateChecklistStep(title, checklistId, stepId)
            .then(() => {
                toast.success('Update Step Successfully')
                this.props.reloadChecklists()
            })
    }

    _renderChecklists() {
        const checklists = this.props.checklists.map(c => (
            <Card key={c.title}>
                <Accordion.Toggle as={Card.Header} eventKey={c.title}>
                    {c.title}</Accordion.Toggle>
                <Accordion.Collapse eventKey={c.title}>
                    <Card.Body>
                        <ListGroup>
                            {c.steps.map(s => (
                                <ListGroup.Item key={s.title} className="checklist-step-list-item">
                                    <EditableLabel label={s.title} updateLabel={(title) => this.updateChecklistTitle(title, c._id, s._id)} />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        ))
        return (
            <Accordion>
                {checklists}
            </Accordion>
        )
    }

    render() {
        return (
            <div>
                {this._renderChecklists()}
            </div>
        )
    }
}