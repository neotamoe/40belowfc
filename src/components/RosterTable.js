import React, {Component} from 'react';

const styles = {
  player: {
      margin: 20,
      padding: 10
  },
  table: {
      width: '50%',
  }       
}

class RosterTable extends Component {
  render() {
    return (
      <div style={styles.tableCenter}>
        <table style={styles.table}>
            <thead>
                <tr style={styles.player}>
                    <th style={styles.player}>First Name</th>
                    <th style={styles.player}>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {this.props.players.map(player => 
                    <tr style={styles.player} key={player.id}>
                        <td style={styles.player}>{player.first_name}</td>
                        <td style={styles.player}>{player.last_name}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    )  
  }
}

export default RosterTable;