import React, {Component} from 'react';

class GameForm extends Component {
    render() {
        return (
            <div>
                <h4>Add Game</h4>
                <p>This is the game form - inputs to be added</p>
                <label>Date:</label>
                <input type="number"/><br /> 
                <label>Time:</label>
                <input type="number"/><br /> 
                <label>Score (US):</label>
                <input type="number"/><br /> 
                <label>Score (THEM):</label>
                <input type="number"/><br />
                <label>Game Order:</label>
                <input type="number"/><br />
                <label>Location:</label>
                <select>
                    <option value="2">Holy Angels</option>
                    <option value="3">Concordia U</option>
                    <option value="4">WSP Dome</option>
                    <option value="5">Champions Hall</option>
                    <option value="13">Augsburg</option>
                </select><br />
                <label>Result:</label>
                <select>
                    <option value="1">Win</option>
                    <option value="2">Lose</option>
                    <option value="3">Tie</option>
                    <option value="4">Unknown</option>
                </select><br />
                <label>Opponent:</label>
                <select>
                    <option value="1">Bimbos</option>
                    <option value="2">Pagliacci</option>
                    <option value="3">Securian SHINanigans</option>
                    <option value="4">Blade</option>
                    <option value="6">One Shot Wonders</option>
                    <option value="7">Wolf Pack FC</option>
                    <option value="5">Premiums</option>
                    <option value="8">Mouth Breathers</option>
                </select><br />
                <label>Season:</label>
                <select>
                    <option value="1">April 2019</option>
                    <option value="2">June 2019</option>
                </select><br />
                <label>Playoff Game?:</label>
                <select>
                    <option value="1">True</option>
                    <option value="0">False</option>
                </select><br />
            </div>
        );
    }
}

export default GameForm;