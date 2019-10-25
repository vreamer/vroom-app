import React from 'react';
import { getChecklists } from '../services/checklist-service'
import { Accordion, Card, Button, ListGroup } from 'react-bootstrap'

export default class AllChecklists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checklists: []
        }
    }

    componentDidMount() {
        getChecklists()
            .then(res => this.setState({ checklists: res.data }))
    }

    _renderChecklists() {
        const checklists = this.state.checklists.map(c => (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={c.title}>
                    {c.title}</Accordion.Toggle>
                <Accordion.Collapse eventKey={c.title}>
                    <Card.Body>
                        <ListGroup>
                            {c.steps.map(s => <ListGroup.Item>{s}</ListGroup.Item>)}
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