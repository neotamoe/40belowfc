import React, {Component} from 'react';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '0'
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({type: event.target.value});
    }

    handleSubmit(event) {
        alert('A data type was submitted: ' + this.state.type);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="datalist">Select Data Type</label>
                    <select value={this.state.type} name="datalist" id="datalist" form="" onChange={this.handleChange}>
                        <option value='0' disabled>Select Data Type</option>
                        <option value="Location">Location</option>
                        <option value="Game">Game</option>
                        <option value="Player">Player</option>
                        <option value="Opponent">Opponent</option>
                        <option value="Season">Season</option>
                    </select><br />    
                    <input type="submit" />        
                </form>
            </div>
        );
  }
 
}

export default Admin;