import React, { Component } from 'react';
import './App.css';
import  ToDoItems from './ToDoItems'

class App extends Component {
  constructor() {
    super();

    this.state = {
       inputValue: '',
       list: [],
    };

    this.addToList = this.addToList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  };

  changeInput = (input) => {
    this.setState({
      inputValue: input,
    })
  };

  addToList = (value) => {
    if( value !== '') {
      let item = {
        text: value,
        key: Date.now()
      }
      let inStateList = (this.state.list).concat(item);
      this.setState({
        list: inStateList,
        inputValue: ''
      });
    }
  };

  
  
  deleteItem = (key) => {
    let filteredList = this.state.list.filter( function(item) {
        return ( item.key !== key)
      });
      this.setState({
        list: filteredList
      })
  }

  submitChanges = (editedValue, editedItemKey) => {
    let filteredList = this.state.list.filter( function(item) {
      return ( item.key === editedItemKey) ? item : null;
    });
    filteredList.text = editedValue;
    let inStateList = (this.state.list).concat(filteredList);
    this.setState({
      list: inStateList,
    })
  };

  render() {
    return (
      <div className="todo">
        <div className="todo__container">
          <input className="todo__input"
                onChange={ (e)=>this.changeInput(e.target.value) }
                value={this.state.inputValue} 
                placeholder="add new task" />
          <button className="todo__button"
                  type="submit"
                  onClick={ () => this.addToList(this.state.inputValue)}>
                  add
          </button>
          <ToDoItems entries={this.state.list} 
                     delete={this.deleteItem}
                     submit={this.submitChanges}
          />
        </div>
      </div>
    );
  };
}

export default App;
