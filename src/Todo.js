import React, { Component } from "react";
//import Gun from 'gun/gun';
import path from 'gun/lib/path';
import { withGun } from "react-gun";

const formatTodos = todos => Object.keys(todos)
.map(key => ({ key, val: todos[key] }))
.filter(t => Boolean(t.val) && t.key !== '_')

class Todo extends Component {

  constructor () {
    super();

    this.state = {newTodo: '', todos: []}
  }

  componentDidMount() {
      this.props.gun.get('todos').on(todos => {this.setState({ todos: formatTodos(todos)} ); console.log(this.state);});
  }

  add = e => {
    e.preventDefault();
    this.props.gun.get('todos').set(this.state.newTodo);
    this.setState({newTodo: ''})
  }

  del = key => this.props.gun.get('todos').path(key).put(null)

  handleChange = e => this.setState({ newTodo: e.target.value})

render() {
  return <div>
    <form onSubmit={this.add}>
      <input value={this.state.newTodo} onChange={this.handleChange} />
      <button onClick={this.add}>Add</button>
    </form>
    <br />
    <ul>
      {this.state.todos.map(todo => <li key={todo.key} onClick={_=>this.del(todo.key)}>{todo.val}</li>)}
    </ul>
  </div>
  }
}

export default withGun(Todo);
