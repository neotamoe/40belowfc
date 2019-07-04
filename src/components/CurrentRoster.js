import React, {Component} from 'react';
import RosterTable from './RosterTable'


class CurrentRoster extends Component {
    state = {
        players: []
    }
    componentWillMount(){
        fetch('http://localhost:8080/players/current')
            .then(response => response.json()
            .then(res => {
                let playersSorted = res.sort((a, b) => { return (a.last_name < b.last_name) ? -1 : ((a.last_name > b.last_name) ? 1 : 0) });
                this.setState({
                    players: playersSorted
                })
            }))
    }

    render() {
        const players = this.state.players;
        const table = players ? <RosterTable players={players} /> : null

        return (
            <div>
                { table }
            </div>
        );
    }
}

export default CurrentRoster;
