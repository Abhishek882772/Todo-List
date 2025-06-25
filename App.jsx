import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbars from './components/Navbar.jsx'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){   
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  const toffleFinshed=(e)=>{
    setShowFinished(!ShowFinished)

  }

  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))

  }

  const handeladd=()=>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    settodo("")
    saveToLS()
  }
 const handleCheckbox = (e) => {
  let id = e.target.name;
  let index = todos.findIndex(item => item.id === id);
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  settodos(newTodos);  // ✅ This triggers the UI update
};

  
  const handeledit=(e,id)=>{
    let t=todos.filter(i=>i.id ===id)
    settodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    settodos(newTodos)
    saveToLS()
  }
  const handeldelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    settodos(newTodos)
    saveToLS()
  }
  const handleChange=(e)=>{
    settodo(e.target.value)

  }
  return (
    <>
    <Navbars/>
    <div className="md:container justify-between mx-3 md:m-auto text min-h-[80vh] bg-violet-300 p-2 rounded-2xl my-5">
    <div className="  text-white p-4 cursor-pointer text-xl flex justify-around">
      <div className="add text-gray-800 font-bold">Add Todo :</div>
      <div className="but gap-7 flex items-center">
        <input onChange={handleChange} value={todo} className='bg-amber-100 w-[20vw] rounded-xl border-none h-8 p-1 text-black text-sm' type="text" />
        <button onClick={handeladd} disabled={todo.length<=2} className='disabled:bg-violet-500 font-bold hover:font-bold bg-violet-700 p-2 rounded-xl m-2 px-4 text-sm'>ADD</button>
      </div>
    </div>
    <input onClick={toffleFinshed} type="checkbox" checked={ShowFinished} /> show Finished
    <div className="  text-purple-950 p-4 font-bold cursor-pointer text-xl">Your Todos</div>
    <div className="todos">
      {todos.length===0 && <div className='m-5 font-bold'>No todos to display</div>}
      {todos.map(item=>{
      return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo  flex my-2 bg-violet-200 items-center font-bold rounded-2xl justify-between">
        <div className='flex gap-4 m-3'>
        <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
        <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
        </div>
        <div className="button flex gap-2 ">
          <div onClick={(e)=>{handeledit(e,item.id)}} className='hover:font-bold hover:cursor-pointer bg-violet-700 p-2 rounded-xl m-2 px-4 text-sm text-white'><RiEdit2Fill />
</div>
          <div onClick={(e)=>{handeldelete(e,item.id)}} className='hover:font-bold hover:cursor-pointer bg-red-600 p-2 rounded-xl m-2 px-4 text-sm text-white'><AiFillDelete />

</div>
        </div>
      </div>
      })}
    </div>
    </div>
    </>
  )
}

export default App
