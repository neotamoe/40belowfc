import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'locations',
            formFields: null,
            data: null,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
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
                    data: results,
                })
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleAddSubmit(event) {
        // console.log("attempting to add something:", event.target)
        event.preventDefault();
        // for each formField, get the state value, then pass to fetch
        console.log(this.state.formFields)
        const formFieldsWithoutId = this.state.formFields.filter( x => x != 'id');
        console.log(formFieldsWithoutId);
        const fieldsToSubmit = formFieldsWithoutId.map(formField => this.state[formField]);
        console.log(fieldsToSubmit)
        console.log("type in handleAddSubmit", this.state.type)
        console.log(this.state.team_name)
        const formData = formFieldsWithoutId.map(element => ({[element]: this.state[element]})); 
        console.log(formData)

        fetch('http://localhost:8080/'+this.state.type, {  
            method: 'POST',  
            body: JSON.stringify(formData)
        })
        .then(function (data) {  
          console.log('Request success: ', data);  
        })  
        .catch(function (error) {  
          console.log('Request failure: ', error);  
        });
    }

    render() {
        const inputs = this.state.formFields ? 
                this.state.formFields.map((field, idx) => 
                    <div>{field.toUpperCase()}: <input
                        type="text"
                        key={idx}
                        name={field}
                        value={this.state.field}
                        onChange={this.handleInputChange}
                    /><br /></div>
                )
            : null;

        const columns = this.state.formFields ?
            this.state.formFields.map(field => ({ key: field, name: field })) : [];
        const rows = this.state.data ? this.state.data : [];
        const rowsCount = this.state.data ? this.state.data.length : 0;
        const dataGrid = (this.state.formFields && this.state.data) ? 
            <div className="admin-grid"><ReactDataGrid
                columns={columns}
                rowGetter={i => rows[i]}
                rowsCount={rowsCount}
                minHeight={150} /></div> 
            : null;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="datalist">Select Data Type</label>
                    <select value={this.state.type} name="datalist" id="datalist" form="" onChange={this.handleChange}>
                        <option value='0' disabled>Select Data Type</option>
                        <option value="locations">Location</option>
                        {/* <option value="games">Game</option> */}
                        <option value="players">Player</option>
                        <option value="opponents">Opponent</option>
                        <option value="seasons">Season</option>
                    </select><br />    
                    <input type="submit" />        
                </form>
                <br />
                {dataGrid}
                <br />
                {inputs ? 
                    <div>
                        <h3>Add Data</h3>
                        <form onSubmit={this.handleAddSubmit}>
                            <input type="text" key="42" hidden name="type" readOnly value={this.state.type}/>
                            {inputs}
                            <button type="submit">Add</button>
                        </form>
                    </div>
                : null}
            </div>
        );
  }
 
}

export default Admin;