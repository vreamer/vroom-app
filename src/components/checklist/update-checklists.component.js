import React from 'react'
import { Accordion, Card, ListGroup } from 'react-bootstrap'
import UpdateChecklistStep from './update-checklist-step.component'

export default class UpdateChecklists extends React.Component {
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
                                    <UpdateChecklistStep step={s} checklistId={c._id} reloadChecklists={this.props.reloadChecklists} />
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