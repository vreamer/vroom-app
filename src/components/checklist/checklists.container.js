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
    }

    componentDidMount() {
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
                    <UpdateChecklists checklists={this.state.checklists} />
                    :
                    <AllChecklists checklists={this.state.checklists} />
                }
            </div>
        )
    }
}