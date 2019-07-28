import React, {Component} from 'react';
import Datetime from 'react-datetime';
import './ReactDateTime.css';

const styles = {
    pickerWidth: {
        width: '33%'
    },
    inputWidth: {
        width: '25%',
        marginBottom: '20px'
    }
}

class GameForm extends Component {
    render() {
        return (
            <div>
                <h4>Add Game</h4>
                <form>
                    <div style={styles.inputWidth}>
                        <label>Date and Time:</label>
                        <Datetime />
                    </div>
                    <div>
                        <label>Score (US):</label><br />
                        <input type="number" min="0" placeholder="0" style={styles.inputWidth}/><br /> 
                    </div>
                    <div>
                        <label>Score (THEM):</label><br />
                        <input type="number" min="0" placeholder="0" style={styles.inputWidth}/><br />
                    </div>
                    <label>Game Order:</label><br />
                    <input type="number" min="1" max="8" placeholder="game 1-8" style={styles.inputWidth}/><br />
                    <label>Location:</label><br />
                    <select style={styles.inputWidth}>
                        <option value="2">Holy Angels</option>
                        <option value="3">Concordia U</option>
                        <option value="4">WSP Dome</option>
                        <option value="5">Champions Hall</option>
                        <option value="13">Augsburg</option>
                    </select><br />
                    <label>Result:</label><br />
                    <select style={styles.inputWidth}>
                        <option value="1">Win</option>
                        <option value="2">Lose</option>
                        <option value="3">Tie</option>
                        <option value="4">Unknown</option>
                    </select><br />
                    <label>Opponent:</label><br />
                    <select style={styles.inputWidth}>
                        <option value="1">Bimbos</option>
                        <option value="2">Pagliacci</option>
                        <option value="3">Securian SHINanigans</option>
                        <option value="4">Blade</option>
                        <option value="6">One Shot Wonders</option>
                        <option value="7">Wolf Pack FC</option>
                        <option value="5">Premiums</option>
                        <option value="8">Mouth Breathers</option>
                    </select><br />
                    <label>Season:</label><br />
                    <select style={styles.inputWidth}>
                        <option value="1">April 2019</option>
                        <option value="2">June 2019</option>
                    </select><br />
                    <label>Playoff Game?:</label><br />
                    <select style={styles.inputWidth}>
                        <option value="1">True</option>
                        <option value="0">False</option>
                    </select><br />
                </form>
            </div>
        );
    }
}

export default GameForm;