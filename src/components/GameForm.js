import React, {Component} from 'react';
import Datetime from 'react-datetime';
import './ReactDateTime.css';
import '../App.css';

const styles = {
    // pickerWidth: {
    //     width: '33%'
    // },
    inputWidth: {
        // width: '50%',
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
                    <div className="row">
                        <div className="column" style={styles.inputWidth}>
                            <label>Date and Time:</label>
                            <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" inputProps={{ readOnly: true, placeholder: 'Select Date & Time', name: 'date_time'}} onBlur={this.props.handleDateTimeInputChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>Score (US):</label>
                            <input type="number" min="0" name="score_us" className="form-control" onChange={this.props.handleInputChange}/><br /> 
                        </div>
                        <div className="column">
                            <label>Score (THEM):</label>
                            <input type="number" min="0" name="score_them" className="form-control" onChange={this.props.handleInputChange}/><br />
                        </div>
                    </div>
                    <div className="row">
                    {this.state.location ?
                        <div className="column"> 
                            <label>Location:</label>
                            <select name="location" className="form-control" onChange={this.props.handleInputChange}>
                                <option id="location-select" value="">Select Location</option>
                                {this.state.location.map((e, key) => {
                                    return <option key={e.id} value={e.id}>{e.location_name}</option>;
                                })}
                            </select><br />
                        </div>                    
                    : null }
                        <div className="column">
                            <label>Result:</label>
                            <select name="result" className="form-control" onChange={this.props.handleInputChange}>
                                <option value="">Select Result</option>
                                <option value="1">Win</option>
                                <option value="2">Lose</option>
                                <option value="3">Tie</option>
                                <option value="4">Unknown</option>
                            </select><br />
                        </div>
                    </div>
                    <div className="row">
                        { this.state.opponent ? 
                            <div className="column">
                                <label>Opponent:</label>
                                <select name="opponent" className="form-control" onChange={this.props.handleInputChange}>
                                    <option value="">Select Opponent</option>
                                    {this.state.opponent.map((e, key) => {
                                        return <option key={e.id} value={e.id}>{e.team_name}</option>;
                                    })}
                                </select><br />
                            </div>    
                        : null }

                        { this.state.season ? 
                            <div className="column">
                                <label>Season:</label>
                                <select name="season" className="form-control" onChange={this.props.handleInputChange}>
                                    <option value="">Select Season</option>
                                    {this.state.season.map((e, key) => {
                                        return <option key={e.id} value={e.id}>{e.month_start} {e.year}</option>;
                                    })}
                                </select><br />
                            </div>
                        : null }
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>Playoff Game?:</label>
                            <select name="is_playoff_game" className="form-control" onChange={this.props.handleInputChange}>
                                <option value="">Select True/False</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select><br />
                        </div>
                        <div className="column">
                            <label>Game Order:</label>
                            <input type="number" min="1" max="8" placeholder="game 1-8" name="game_order" className="form-control" onChange={this.props.handleInputChange}/><br />
                        </div>
                    </div>


                    <button type="submit" className="btn btn-success">Add Game</button>
                </form>
            </div>
        );
    }
}

export default GameForm;