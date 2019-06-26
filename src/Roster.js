import React, {Component} from 'react';

class Roster extends Component {
    state = {
        players: []
    }
    componentWillMount(){
        fetch('http://localhost:8080/players')
            .then(response => response.json()
            .then(res => {
                // console.log(res)
                this.setState({
                    players: res
                })
            }))
    }

    render() {
        const players = this.state.players;

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => 
                            <tr key={player.id}>
                                <td>{player.first_name}</td>
                                <td>{player.last_name}</td>
                                <td>{player.jersey_number}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Roster;
