import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

class ToDoItems extends Component {
    constructor(props){
        super(props);

        this.createItem  = this.createItem.bind(this);
    }

    createItem(item){
        return <li key={item.key} 
                   onClick={ () => this.delete(item.key) }>
                   {item.text}
               </li>
    };

    delete = (key) => {
        this.props.delete(key);
    };

    render() {
        let todoEntries = this.props.entries;
        let listItems = todoEntries.map(this.createItem)
        return(
            <ul className="todoList">
                <FlipMove duration={250}>
                    {listItems}
                </FlipMove>
            </ul>
        )
    };
}

export default ToDoItems;