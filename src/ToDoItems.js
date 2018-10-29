import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

class ToDoItems extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEditing: false,
            editedItemKey: '',
            editedValue: '',
        };

        this.createItem  = this.createItem.bind(this);
        this.editingForm = this.editingForm.bind(this);
        this.listItem = this.listItem.bind(this);
    }

    createItem(item){
        return (
            (this.state.isEditing) ? this.editingForm() : this.listItem(item)
        )
    };

    editingForm = () => {
        return (
            <li>
                <form className="editing-form"
                      onSubmit={ this.submitEditings(this.state.editedValue, this.state.editedItemKey) }>
                    <input defaultValue={ this.edit }
                            onChange={ (e) => this.editedInput(e.target.value) }/>
                    <button type="submit">update!</button>
                </form>
            </li>
        )
    }

    listItem = (item) => {
        return (
           <li>
                <p key={item.key}
                   onClick={ () => this.delete(item.key) }>
                   {item.text}
                    </p>
                    <button onClick={ () => {
                            this.setState({ isEditing: true });
                            this.setState({ editedItemKey: item.key })}}>
                        edit
                    </button>
           </li>
        )
    }

    delete = (key) => {
        this.props.delete(key);
    };

    edit = () => {
        let getEditingItemValue = this.props.entries.filter( function(item) {
            return ( item.key ===  this.state.editedItemKey ? item.text : '' )
          });
        return getEditingItemValue;
    };

    editedInput = (editedInputValue) => {
        this.setState({
            editedValue: editedInputValue,
        })
    };

    submitEditings = (editedValue, editedItemKey) => {
        this.props.submit(editedValue, editedItemKey);
        this.setState({
            isEditing: false,
        })
    }

    render() {
        let todoEntries = this.props.entries;
        let listItems = todoEntries.map(this.createItem);
        return(
            <FlipMove typeName="ul" 
                      duration={250} 
                      className="todoList">
                    {listItems}
            </FlipMove>
        )
    };
}

export default ToDoItems;