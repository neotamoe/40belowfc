import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import GameForm from './GameForm';
import Spinner from './Spinner';

import moment from 'moment';

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
            selectedOption: 'add',
            isLoading: false,
            error: false,
            formControls: {}
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.clearTable = this.clearTable.bind(this);
        this.handleAddViewInputChange = this.handleAddViewInputChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({type: event.target.value});
    }

    handleSubmit(event) {
        this.setState({
            isLoading: true
        })
        event.preventDefault();
        fetch('http://localhost:8080/' + this.state.type)
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
                // console.log(results)
                // console.log(Object.keys(results[0]))
                this.setState({
                    formFields: Object.keys(results[0]),
                    data: results,
                    isLoading: false,
                })
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    isLoading: false
                })
            });
    }

    handleAddViewInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const updatedControls = {
          ...this.state.formControls
        };
        let updatedFormElement = {
          ...updatedControls[name]
        };
        if(name==='location' || name==='result' || name==='opponent' || name==='season'){
            const objectName = name + "_name";
            updatedFormElement = updatedFormElement[name]
            updatedFormElement = {}
            updatedFormElement.id = value;
            updatedFormElement[objectName] =  event.target.options[event.target.selectedIndex].text;
        }
        else {
            updatedFormElement.value = value;  
        }
        updatedControls[name] = updatedFormElement;
        console.log(updatedControls)
        this.setState({
            formControls: updatedControls
        });
    }

    checkForBoolean = (value) => {
        if (value && typeof value === 'string') {
          if (value.toLowerCase() === "true") return true;
          if (value.toLowerCase() === "false") return false;
        }
        if(!isNaN(value)){
            return parseInt(value);
        }
        return value;
     }

    handleDateTimeInputChange = (event) => {
        console.log('event.toDate() in handleDateTimeInputChange', event.toDate())
        // if(event.target === undefined) {
        //     return;
        // }
        const dateTimeInput = event.toDate();
        const dateTime = moment(dateTimeInput).format('YYYY-MM-DDTHH:mm:ss');
        const updatedControls = {
            ...this.state.formControls
        };
        let updatedDateFormElement = {
            ...updatedControls['date']
        };
        updatedDateFormElement = {value: dateTime}
        let updatedTimeFormElement = {
            ...updatedControls['time']
        };
        updatedTimeFormElement = {value: dateTime}
        updatedControls['date'] = updatedDateFormElement;
        updatedControls['time'] = updatedTimeFormElement;
        this.setState({
            formControls: updatedControls
        })
    }

    handleAddSubmit(event) {
        // TODO: fix so works with players (works with other things that only have one input besides id)
        event.preventDefault();
        // for each formField, get the state value, then pass to fetch
        const formFieldsWithoutId = this.state.formFields.filter( x => x !== 'id');
        const formData = formFieldsWithoutId.map(element => ({[element]: this.state[element]})); 
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

    clearTable = () => {
        this.setState({
            formFields: null,
            data: null,
        })
    }

    addGame = (event) => {
        // event.preventDefault();
        const formData = {};
        for (let formElementId in this.state.formControls) {
            formData[formElementId] = this.state.formControls[formElementId].value ? this.checkForBoolean(this.state.formControls[formElementId].value) : this.state.formControls[formElementId]
        }
        console.log(formData)
        fetch('http://localhost:8080/games', {  
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',  
            body: JSON.stringify(formData),
        })
        .then(function (data) {  
          console.log('Request response: ', data);  
        })  
        .catch(function (error) {  
          console.log('Request failure: ', error);  
        });
    }

    render() {
        const inputs = this.state.formFields ? 
                this.state.formFields.map((field, idx) => 
                    <div><label htmlFor={field}>{field.toUpperCase()}: </label><input
                        type="text"
                        key={idx}
                        name={field}
                        value={this.state.field === true ? "true" : this.state.field === false ? "false" : this.state.field }
                        onChange={this.handleAddViewInputChange}
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
                    <input type="button" value="Clear Table"  style={{marginLeft: '10px'}} onClick={this.clearTable}/>      
                </form>
                <br />
                { this.state.isLoading ? <Spinner /> : this.state.error ? <p>Uh oh.  Something went wrong.  Try again.</p> : dataGrid }
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
                <GameForm addGame={this.addGame} handleInputChange={this.handleInputChange} handleDateTimeInputChange={this.handleDateTimeInputChange}/>
            </div>
        );
    }
 
}

export default Admin;