import React, {Component} from 'react';
import '../App.css';

const styles = {
  cell: {
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

class Stats extends Component {

  state = {
    games: []
  }

  componentWillMount(){
    fetch('http://localhost:8080/games')
        .then(response => response.json()
        .then(res => {
          console.log(res);
            let gamesSorted = res.sort((a, b) => { return b.season.id - a.season.id || b.game_order - a.game_order});
            this.setState({
                games: gamesSorted
            })
        }))
}

  render() {
    const games = this.state.games 
      ? this.state.games.map(game => 
        <tr key={game.id} className={`${game.game_order===1 ? "season-divider" : ""}`}>
          <td style={styles.cell}>{game.date[1]}-{game.date[2]}-{game.date[0]}</td>
          <td style={styles.cell}>{game.time[0]}:{game.time[1] === 0 ? "00" : game.time[1]}</td>
          <td style={styles.cell}>{game.score_us}</td>
          <td style={styles.cell}>{game.opponent.team_name}</td>
          <td style={styles.cell}>{game.score_them}</td>
          <td style={styles.cell}>{game.location.location_name}</td>
          <td style={styles.cell}>{game.result.result}</td>
          <td style={styles.cell}>{game.season.month_start} {game.season.year}</td>
          <td style={styles.cell}>{game.game_order}</td>
        </tr>) 
      : null;
    return (
      <div style={styles.tableCenter}>
          <table style={styles.table}>
            <thead>
              <tr>
                  <th style={styles.cell}>Date</th>
                  <th style={styles.cell}>Time</th>
                  <th style={styles.cell}>Goals</th>
                  <th style={styles.cell}>Opponent</th>
                  <th style={styles.cell}>Opp Goals</th>
                  <th style={styles.cell}>Location</th>
                  <th style={styles.cell}>Result</th>
                  <th style={styles.cell}>Season</th>
                  <th style={styles.cell}>Game#</th>
              </tr>
            </thead>
            <tbody>
              {games}
            </tbody>
          </table>
      </div>
    );  
  }
}

export default Stats;
