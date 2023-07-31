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
    axios.post(URL).then(res => {
      this.setState({...this.state, todos: res.data.data})
    }) 
  }

  componentDidMount(){
    console.log('component did mount')
    this.fetchToDos();
  }
  
  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {this.state.todos.map(todo => {
            return <div key={todo.id}>{todo.name}</div>
          })}
        </div>
        <form id='todoForm'>
          <input type='text' placeholder='Type todo' value={this.state.toDoName} onChange={(e) => (this.setState({...this.state, toDoName: e.target.value}))}/>
          <input type='submit'/>
          <button>Clear Complete</button>
        </form>
      </div>
    )
  }
}