import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '0',
            formFields: null,
            data: null,
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
        fetch('http://localhost:8080/' + this.state.type)
            .then(response =>  response.json())
            .then(results => {
                console.log(results)
                console.log(Object.keys(results[0]))
                this.setState({
                    formFields: Object.keys(results[0]),
                    data: results
                })
            });
    }

    render() {
        const columns = this.state.formFields ?
        this.state.formFields.map(field => ({ key: field, name: field })) : [];
        // [
        //     { key: 'id', name: 'ID' },
        //     { key: 'title', name: 'Title' },
        //     { key: 'count', name: 'Count' } ];
          
        const rows = this.state.data ? this.state.data : [];
        console.log("data.length: ", this.state.data ? this.state.data.length : "none")
        const rowsCount = this.state.data ? this.state.data.length : 0;
        const dataGrid = (this.state.formFields && this.state.data) ? <div className="admin-grid"><ReactDataGrid
            columns={columns}
            rowGetter={i => rows[i]}
            rowsCount={rowsCount}
            minHeight={150} /></div> : null;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="datalist">Select Data Type</label>
                    <select value={this.state.type} name="datalist" id="datalist" form="" onChange={this.handleChange}>
                        <option value='0' disabled>Select Data Type</option>
                        <option value="locations">Location</option>
                        <option value="games">Game</option>
                        <option value="players">Player</option>
                        <option value="opponents">Opponent</option>
                        <option value="seasons">Season</option>
                    </select><br />    
                    <input type="submit" />        
                </form>
                <br />
                {dataGrid}
            </div>
        );
  }
 
}

export default Admin;