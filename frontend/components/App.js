import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    toDoName: ''
  }
  
  fetchToDos = () => {
    axios.get(URL).then(res => {
      this.setState({...this.state, todos: res.data.data});
    }).catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
  }

  postToDos = () => {
    axios.post(URL, {name: this.state.toDoName}).then(res => {
      this.fetchToDos();
      this.setState({...this.state, toDoName: ''})
    }).catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
  }

  inputChange = (e) => {
    const {value} = e.target
    this.setState({...this.state, toDoName: value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.postToDos()
  }

  componentDidMount(){
    console.log('component did mount')
    this.fetchToDos();
  }

  toggleToDos = (id) => () => {
    axios.patch(`${URL}/${id}`).then(res => {
      this.setState({...this.state, todos: this.state.todos.map(td => {
        if (td.id !== id) return td
        return res.data.data
      })})
    })
  }

  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {this.state.todos.map(todo => {
            return <div onClick={this.toggleToDos(todo.id)} key={todo.id}>{todo.name}{todo.completed ? ' ✔' : ''}</div>
          })}
        </div>
        <form id='todoForm' onSubmit={this.onSubmit}>
          <input type='text' placeholder='Type todo' value={this.state.toDoName} onChange={this.inputChange}/>
          <input type='submit'/>
          <button>Clear Complete</button>
        </form>
      </div>
    )
  }
}