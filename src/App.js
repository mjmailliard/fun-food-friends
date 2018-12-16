import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      userName: '',
      items: []
    }
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}
componentDidMount() {
  const itemsRef = firebase.database().ref('items');
  itemsRef.on('value', (callback) => {
let items = callback.val();
let newState = [];
for (let item in items){
  newState.push({
    id: item,
    title: items[item].title,
    user: items[item].user
});
}
this.setState({
  items: newState
});
  });
}
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.userName
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      userName: ''
    })
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Potluck Planner</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="userName" placeholder="What's your name?" onChange={this.handleChange} value={this.state.userName} />
                <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                <button className="addItemButton">Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.items.map((item)=> {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>brought by: {item.user}</p>
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
