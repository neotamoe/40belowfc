import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
// bootstrap is needed for table styles
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const styles = {
    addViewRadio: {
        margin: '20px'
    }
}

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'locations',
            formFields: null,
            data: null,
            selectedOption: 'add'
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({type: event.target.value});
    }

    handleSubmit(event) {
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
        console.log(event.target)
        event.preventDefault();
        // for each formField, get the state value, then pass to fetch
        const formFieldsWithoutId = this.state.formFields.filter( x => x !== 'id');
        const formData = formFieldsWithoutId.map(element => ({[element]: this.state[element]})); 
        console.log(formData[0])
        const values = Object.values(formData[0])
        for(let value of values){
            console.log(value);
            if(value===undefined){
                return;
            }
        }
        fetch('http://localhost:8080/'+this.state.type, {  
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',  
            body: JSON.stringify(formData[0]),
        })
        .then(function (data) {  
          console.log('Request response: ', data);  
        })  
        .catch(function (error) {  
          console.log('Request failure: ', error);  
        });
    }

    checkForAndConvertBooleans = (array) => {
        const transformed = array.map(item => {
            let newObject = {}
            for(let row in item){
                if(item[row]===false){
                    newObject[row] = "false"
                } else if (item[row]===true){
                    newObject[row] = "true"
                } else {
                    newObject[row] = item[row]
                }
            }
            return newObject;
        });
        return transformed;
    } 

    handleOptionChange = event => {
        this.setState({
          selectedOption: event.target.value
        });
      };

    render() {
        const inputs = this.state.formFields ? 
                this.state.formFields.map((field, idx) => 
                    <div><label htmlFor={field}>{field.toUpperCase()}: </label><input
                        type="text"
                        key={idx}
                        name={field}
                        value={this.state.field === true ? "true" : this.state.field === false ? "false" : this.state.field }
                        onChange={this.handleInputChange}
                    /><br /></div>
                )
            : null;

        const columns = this.state.formFields ?
            this.state.formFields.map(field => ({ key: field, name: field })) : [];
        const rows = this.state.data ? this.checkForAndConvertBooleans(this.state.data) : [];
        const rowsCount = this.state.data ? this.state.data.length : 0;
        const dataGrid = (this.state.formFields && this.state.data && this.state.type !== 'games') ? 
            <div className="admin-grid">
                <ReactDataGrid
                    columns={columns}
                    rowGetter={i => rows[i]}
                    rowsCount={rowsCount}
                />
            </div> 
            : null;

        return (
            <div>
                <h4>Add/View Location, Player, Opponent or Season</h4>
                <form onSubmit={this.handleSubmit}>
                        <label style={styles.addViewRadio}>
                            <input
                                type="radio"
                                name="view-or-add"
                                value="view"
                                checked={this.state.selectedOption === 'view'}
                                className="form-check-input"
                                onChange={this.handleOptionChange}
                            />
                            View
                        </label>
                        <label style={styles.addViewRadio}>
                            <input
                                type="radio"
                                name="view-or-add"
                                value="add"
                                checked={this.state.selectedOption === 'add'}
                                className="form-check-input"
                                onChange={this.handleOptionChange}
                            />
                            Add
                        </label>
                    <label htmlFor="datalist" style={{padding: '10px'}}>Select Category:</label>
                    <select style={{padding: '10px'}} value={this.state.type} name="datalist" id="datalist" form="" onChange={this.handleChange}>                        
                        <option value="locations">Location</option>
                        {/* <option value="games">Game</option> */}
                        <option value="players">Player</option>
                        <option value="opponents">Opponent</option>
                        <option value="seasons">Season</option>
                    </select>  
                    <input type="submit" value="Go" style={{marginLeft: '10px'}}/>      
                </form>
                <br />
                {dataGrid}
                <br />
                {inputs && this.state.selectedOption === 'add' ? 
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