import React from 'react';
import EthrDID from "ethr-did";
import axios from 'axios';

const ethrDid = new EthrDID({address: "0x788ac6c5d404d022e2676cedad7a328aba1c12b0", privateKey: "6380bcd311d1540fc5e0cb9ea367891eb0ed6b43688c28053d6d23f9d93ca752"})


//await ethrDid.setAttribute('did/publicKey/Ed25519VerificationKey2018/publicKeyBase64', 'Arl8MN52fwhM4wgBaO4pMFO6M7I11xFqMmPSnxRQk2tx', 31104000)


const Title = ({ todoCount }) => {
  return (
    <div>
      <div>
        <h1>To-do List({todoCount})</h1>
      </div>
    </div>
  );
}

const TodoForm = ({ addTodo }) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      addTodo(input.value);
      input.value = '';
    }}>
      <input placeholder="enter task" className="form-control col-md-12" ref={node => {
        input = node;
      }} /><input type="submit" value="add" />
      <br />
    </form>
  );
};

const Todo = ({ todo, remove }) => {
  // Each Todo
 // return (<a href="#" className="list-group-item" onClick={() => { remove(todo.id) }}>{todo.text}</a>);
  return (<li key={todo.id}>{todo.text}  <input type="checkbox" onClick={() => { remove(todo.id) }}/></li>);
}

const TodoList = ({ todos, remove }) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} />)
  });
  return (<div className="list-group" style={{ marginTop: '30px' }}>{todoNode}</div>);
}

// Contaner Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }
  // Lifecycle method
  componentDidMount() {
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({ data: res.data });
      });
  }
  // Add todo handler
  addTodo(val) {
    // Assemble data
    const todo = { text: val }
    // Update data
    axios.post(this.apiUrl, todo)
      .then((res) => {
        this.state.data.push(res.data);
        this.setState({ data: this.state.data });
      });
  }
  // Handle remove
  handleRemove(id) {
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if (todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl + '/' + id)
      .then((res) => {
        this.setState({ data: remainder });
      })
  }

  render() {
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.data.length} />
        <TodoForm addTodo={this.addTodo.bind(this)} />
        
          <TodoList
            todos={this.state.data}
            remove={this.handleRemove.bind(this)} />
      </div>
    );
  }
}

export default TodoApp;
