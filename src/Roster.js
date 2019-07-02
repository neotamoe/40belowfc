import React, {Component} from 'react';

const styles = {
    player: {
        margin: 20,
        padding: 10
    },
    tableCenter: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    table: {
        width: '80%',
        marginLeft: '10%',
    }       
}


class Roster extends Component {
    state = {
        players: []
    }
    componentWillMount(){
        fetch('http://localhost:8080/players')
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

        return (
            <div style={styles.tableCenter}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.player}>
                            <th style={styles.player}>First Name</th>
                            <th style={styles.player}>Last Name</th>
                            <th style={styles.player}>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => 
                            <tr style={styles.player} key={player.id}>
                                <td style={styles.player}>{player.first_name}</td>
                                <td style={styles.player}>{player.last_name}</td>
                                <td style={styles.player}>{player.jersey_number}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Roster;
