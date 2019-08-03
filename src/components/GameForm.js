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
                <form onSubmit={this.props.addGame}>
                    <div style={styles.inputWidth}>
                        <label>Date and Time:</label>
                        <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" inputProps={{ readOnly: true, placeholder: 'Select Date & Time', name: 'date_time'}} onBlur={this.props.handleDateTimeInputChange}/>
                    </div>
                    <div>
                        <label>Score (US):</label><br />
                        <input type="number" min="0" name="score_us" style={styles.inputWidth} onChange={this.props.handleInputChange}/><br /> 
                    </div>
                    <div>
                        <label>Score (THEM):</label><br />
                        <input type="number" min="0" name="score_them" style={styles.inputWidth} onChange={this.props.handleInputChange}/><br />
                    </div>
                    <label>Game Order:</label><br />
                    <input type="number" min="1" max="8" placeholder="game 1-8" name="game_order" style={styles.inputWidth} onChange={this.props.handleInputChange}/><br />
                    <label>Location:</label><br />
                    <select style={styles.inputWidth} name="location" onChange={this.props.handleInputChange}>
                        <option value="">Select Location</option>
                        <option value="2">Holy Angels</option>
                        <option value="3">Concordia U</option>
                        <option value="4">West St Paul Dome</option>
                        <option value="5">Champions Hall</option>
                        <option value="13">Augsburg</option>
                    </select><br />
                    <label>Result:</label><br />
                    <select style={styles.inputWidth} name="result" onChange={this.props.handleInputChange}>
                        <option value="">Select Result</option>
                        <option value="1">Win</option>
                        <option value="2">Lose</option>
                        <option value="3">Tie</option>
                        <option value="4">Unknown</option>
                    </select><br />
                    <label>Opponent:</label><br />
                    <select style={styles.inputWidth} name="opponent" onChange={this.props.handleInputChange}>
                        <option value="">Select Opponent</option>
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
                    <select style={styles.inputWidth} name="season" onChange={this.props.handleInputChange}>
                        <option value="">Select Season</option>
                        <option value="1">April 2019</option>
                        <option value="2">June 2019</option>
                    </select><br />
                    <label>Playoff Game?:</label><br />
                    <select style={styles.inputWidth} name="is_playoff_game" onChange={this.props.handleInputChange}>
                        <option value="">Select True/False</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select><br />
                    <button type="submit">Add Game</button>
                </form>
            </div>
        );
    }
}

export default GameForm;