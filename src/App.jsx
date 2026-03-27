import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS();
  };
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS();
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 w-full container md:mx-auto my-5 bg-violet-100 p-5 rounded-xl min-h-[80vh] xl:w-1/2">
        <h1 className="font-bold text-center text-2xl hover:text-slate-600">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo flex flex-col my-5 gap-4">
          <h2 className="text-lg font-bold my-4">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-[90%] rounded-lg my-2 px-5 py-2"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-700 mx-2 rounded-full hover:bg-violet-900 disabled:bg-slate-500 p-4 py-2 text-sm font-bold text-white"
            >Save</button>
          </div>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label htmlFor="show" className="mx-2">Show Finished</label>
       <div className="h-[1px] opacity-15 bg-black"></div>
        <h2 className="text-lg font-bold my-5">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to dispaly</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  // FIX 1: Changed w-1/2 to w-full so it takes the whole width of the purple box
                  className="todo flex w-full justify-between items-center my-3 gap-4"
                >
                  {/* FIX 2: Added flex-1 and min-w-0 so this section takes available space but doesn't overflow */}
                  <div className="flex gap-5 items-center flex-1 min-w-0">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                      className="flex-shrink-0" /* Prevents checkbox from getting squished */
                    />
                    <div
                      // FIX 3: Changed break-words to break-all so long gibberish strings wrap nicely
                      className={`break-all ${item.isCompleted ? "line-through" : ""}`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  {/* FIX 4: Added flex-shrink-0 so buttons NEVER get pushed out of the box */}
                  <div className="buttons flex items-center flex-shrink-0">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-700 hover:bg-violet-900 p-3 py-1 rounded-md text-white mx-1 font-bold"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-700 hover:bg-violet-900 p-3 py-1 rounded-md text-white mx-1 font-bold"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
