import React, {Component} from 'react';
import Datetime from 'react-datetime';
import './ReactDateTime.css';

const styles = {
    pickerWidth: {
        width: '33%'
    },
    inputWidth: {
        width: '40%',
        marginBottom: '20px'
    }
}

class GameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            formInputs: {
                location: {},
                opponent: {},
                season: {}
            }
        };
    
    }

    componentWillMount() {
        fetch('http://localhost:8080/locations')
            .then((response) => {
                if(response.ok) {
                    return response;
                }
                throw Error(response.statusText)
            })
            .then(response => {
                return response.json()
            })
            .then(results => {
                this.setState({
                    location: results,
                })
            })
            .catch((error) => {
                this.setState({
                    error: true,
                })
            });

            fetch('http://localhost:8080/seasons')
            .then((response) => {
                if(response.ok) {
                    return response;
                }
                throw Error(response.statusText)
            })
            .then(response => {
                return response.json()
            })
            .then(results => {
                this.setState({
                    season: results,
                })
            })
            .catch((error) => {
                this.setState({
                    error: true,
                })
            });

            fetch('http://localhost:8080/opponents')
            .then((response) => {
                if(response.ok) {
                    return response;
                }
                throw Error(response.statusText)
            })
            .then(response => {
                return response.json()
            })
            .then(results => {
                this.setState({
                    opponent: results,
                })
            })
            .catch((error) => {
                this.setState({
                    error: true,
                })
            });
    }

    render() {
        return (
            <div>
                { this.state.error ? <p>Oops.  Something went wrong.  Try Again.</p> : null }
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
                    {this.state.location ?
                        <div> 
                            <label>Location:</label><br />
                            <select style={styles.inputWidth} name="location" onChange={this.props.handleInputChange}>
                                <option id="location-select" value="">Select Location</option>
                                {this.state.location.map((e, key) => {
                                    return <option key={e.id} value={e.id}>{e.location_name}</option>;
                                })}
                            </select><br />
                        </div>                    
                    : null }

                    <label>Result:</label><br />
                    <select style={styles.inputWidth} name="result" onChange={this.props.handleInputChange}>
                        <option value="">Select Result</option>
                        <option value="1">Win</option>
                        <option value="2">Lose</option>
                        <option value="3">Tie</option>
                        <option value="4">Unknown</option>
                    </select><br />

                    { this.state.opponent ? 
                        <div>
                            <label>Opponent:</label><br />
                            <select style={styles.inputWidth} name="opponent" onChange={this.props.handleInputChange}>
                                <option value="">Select Opponent</option>
                                {this.state.opponent.map((e, key) => {
                                    return <option key={e.id} value={e.id}>{e.team_name}</option>;
                                })}
                            </select><br />
                        </div>    
                    : null }

                    { this.state.season ? 
                        <div>
                            <label>Season:</label><br />
                            <select style={styles.inputWidth} name="season" onChange={this.props.handleInputChange}>
                                <option value="">Select Season</option>
                                {this.state.season.map((e, key) => {
                                    return <option key={e.id} value={e.id}>{e.month_start} {e.year}</option>;
                                })}
                            </select><br />
                        </div>
                    : null }

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