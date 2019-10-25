import React from 'react';
import { getChecklists } from '../services/checklist-service'
import { Accordion, Card, Button, ListGroup, Modal } from 'react-bootstrap'
import './all-checklists.component.css'

export default class AllChecklists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checklists: [],
            showStepDetails: false,
            currentStepDetails: {}
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    componentDidMount() {
        getChecklists()
            .then(res => this.setState({ checklists: res.data }))
    }

    _renderChecklists() {
        const checklists = this.state.checklists.map(c => (
            <Card key={c.title}>
                <Accordion.Toggle as={Card.Header} eventKey={c.title}>
                    {c.title}</Accordion.Toggle>
                <Accordion.Collapse eventKey={c.title}>
                    <Card.Body>
                        <ListGroup>
                            {c.steps.map(s => (
                                <ListGroup.Item key={s.title} className="checklist-step-list-item">
                                    {s.title}
                                    <Button onClick={() => this.open(s)}>Show Details</Button>
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

    _renderStepDetailModal() {
        return (
            <Modal show={this.state.showStepDetails} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.currentStepDetails.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className='step-details-image' src={this.state.currentStepDetails.image} />
                    {this.state.currentStepDetails.description}
                </Modal.Body>
            </Modal>
        )
    }

    open(step) {
        this.setState({ showStepDetails: true, currentStepDetails: step })
    }

    close() {
        this.setState({ showStepDetails: false, currentStepDetails: {} })
    }

    render() {
        return (
            <div>
                {this._renderChecklists()}
                {this._renderStepDetailModal()}
            </div>
        )
    }
}