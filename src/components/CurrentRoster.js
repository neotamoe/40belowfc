import React, {Component} from 'react';
import RosterTable from './RosterTable'
import Spinner from './Spinner';

class CurrentRoster extends Component {
    state = {
        players: [],
        isLoading: true,
        error: false
    }
    
    componentWillMount(){
        fetch('http://localhost:8080/players/current')
            .then((response) => {
                if (response.ok) {
                    return response;
                } 
                throw Error(response.statusText) 
            }).then(response => {
                return response.json()
            })
            .then(res => {
                let playersSorted = res.sort((a, b) => { return (a.last_name < b.last_name) ? -1 : ((a.last_name > b.last_name) ? 1 : 0) });
                this.setState({
                    players: playersSorted,
                    isLoading: false,
                })
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    isLoading: false
                })
            });
    }

    render() {
        const table = this.state.players ? <RosterTable players={this.state.players} /> : null

        return (
            <div>
                { this.state.isLoading ? <Spinner /> : this.state.error ?  <p>Uh oh.  Something went wrong.  Try again.</p> : table}
            </div>
        );
    }
}

export default CurrentRoster;
