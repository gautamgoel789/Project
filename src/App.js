import TaskList from './task';
import './App.css';
import { useEffect, useState } from 'react';



function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [ip,setIp]=useState();

  useEffect(()=>{
    const fetchIp= async()=>{
      const res= await fetch('https://api.ipify.org?format=json')
      const data=await res.json();
      console.log(data.ip);
       setIp(data.ip);
    }
    fetchIp();
  },[]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const addTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
      setTask('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
        <header>
          <h1>Dynamic Task Manager</h1>
          <h2>{ip}</h2>
        </header>
      <div class="container">
        <div class="column">
            <h2>Add Tasks Here</h2>
            <input type="text" value={task} onChange={handleInputChange} />
            <button className="button-31" onClick={addTodo}>Click to Add</button>
            <TaskList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        </div>
      </div>
      
      <footer>
        <p>&copy; Developed by Vinayaga Moorthy!</p>
      </footer>
    </div>
  
  );
}
export default App;
