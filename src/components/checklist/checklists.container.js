import React from 'react';
import AllChecklists from './all-checklists.component'
import { getChecklists } from '../../services/checklist-service'
import UpdateChecklists from './update-checklists.component';
import { Button } from 'react-bootstrap'

export default class ChecklistContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checklists: [],
            updateChecklists: false
        }

        this.toggleUpdateChecklists = this.toggleUpdateChecklists.bind(this)
        this.loadChecklists = this.loadChecklists.bind(this)
    }

    componentDidMount() {
        this.loadChecklists()
    }

    loadChecklists() {
        getChecklists()
            .then(res => this.setState({ checklists: res.data }))
    }

    toggleUpdateChecklists() {
        this.setState({ updateChecklists: !this.state.updateChecklists })
    }

    render() {
        return (
            <div>
                <Button className='btn btn-primary' onClick={this.toggleUpdateChecklists}>
                    {this.state.updateChecklists ? 'Finish Updates' : 'Update Checklists'}</Button>

                {this.state.updateChecklists ?
                    <UpdateChecklists checklists={this.state.checklists} reloadChecklists={this.loadChecklists} />
                    :
                    <AllChecklists checklists={this.state.checklists} />
                }
            </div>
        )
    }
}