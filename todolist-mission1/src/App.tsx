import { createContext, useContext, useState, ReactNode } from "react";
import "./App.css";

type Task = {
  id: number;
  text: string;
};

type TodoContextType = {
  todos: Task[];
  doneTasks: Task[];
  addTodo: (text: string) => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);
const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodo must be used within TodoProvider");
  return context;
};

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
  };

  const completeTask = (id: number) => {
    const task = todos.find((t) => t.id === id);
    if (task) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setDoneTasks((prev) => [...prev, task]);
    }
  };

  const deleteTask = (id: number) => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, doneTasks, addTodo, completeTask, deleteTask }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input.trim());
      setInput("");
    }
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        className="todo-container__input"
        placeholder="할 일 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button className="todo-container__button">할 일 추가</button>
    </form>
  );
};

const TodoList = () => {
  const { todos, completeTask } = useTodo();
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {todos.map((task) => (
          <li key={task.id} className="render-container__item">
            <span className="render-container__item-text">{task.text}</span>
            <button
              className="render-container__item-button render-container__button--done"
              onClick={() => completeTask(task.id)}
            >
              완료
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
const DoneList = () => {
  const { doneTasks, deleteTask } = useTodo();
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul className="render-container__list">
        {doneTasks.map((task) => (
          <li key={task.id} className="render-container__item">
            <span className="render-container__item-text">{task.text}</span>
            <button
              className="render-container__item-button render-container__button--delete"
              onClick={() => deleteTask(task.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">TODO</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList />
          <DoneList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
