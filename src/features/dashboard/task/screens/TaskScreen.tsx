
const TaskScreen = () =>{
  return (
    <section className='w-[78vw] h-[100vh] flex flex-col justify-center items-center'>
        <h1>Task Screen</h1>
        <div className='flex w-full justify-between items-center bg-black text-white p-4'>
            <div className='flex space-x-4'>
                <span>To Do</span>
                <span>OnGoing</span>
                <span>Complete</span>
            </div>
            <button className='flex items-center space-x-2 bg-white text-black p-2 rounded hover:bg-black hover:text-white'>
                <span className='material-icons'>add</span>
                <span>Add Task</span>
            </button>
        </div>
    </section>
  )
}

export default TaskScreen