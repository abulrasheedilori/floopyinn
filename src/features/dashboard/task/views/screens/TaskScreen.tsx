import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import TodoCard from "../components/TodoCard";
import { useAppDispatch, useAppSelector } from "../../../../../common/reduxtk/hooks";
import OngoingTodoCard from "../components/OngoingTodoCard";
import CompletedTodoCard from "../components/CompletedTodoCard";

export enum TaskTabType{
  TODO = "TODO",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
};

type TaskTabItemType = {
  name: TaskTabType;
  label: string;
  id: string;
};

const tabs:TaskTabItemType[]  = [
  {
    name: TaskTabType.TODO, id: '1',
    label: "To Do(s)"
  },
  {
    name: TaskTabType.ONGOING, id: '2',
    label: "On Going"
  },
  {
    name: TaskTabType.COMPLETED, id: '3',
    label: "Completed"
  },
 
];

const TaskScreen: React.FC = () =>{
  const [active, setActive] = useState<TaskTabType>(TaskTabType.TODO);
  
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const handleSetActive = (value: TaskTabType) => {
    setActive(value);
  };

  return (
    <section className='w-full px-8 py-8 h-[100vh] flex flex-col'>
        <h1 className="text-2xl pb-8 font-extrabold">Project</h1>
        <section className='flex w-full justify-between items-center mb-16  text-black'>
            <div className='flex space-x-2 '>
              {tabs.map((tab) => (
                <span key={tab.id} className={`hover:text-slate-50 font-bold  hover:bg-black rounded-lg px-4 py-2 ${active === tab.name && "bg-black text-slate-50"}`} onClick={() => handleSetActive(tab.name)}>{tab.label}</span>
              ))}
            </div>
            <button className='flex items-center space-x-2 bg-black border rounded-lg shadow-lg text-slate-50 px-4 py-2 hover:bg-slate-50 hover:text-black hover:border-slate-200'>
              <CiCirclePlus size={16} className="text-white hover:bg-black"/>
              <span>Add Tasks</span>
            </button>
        </section>
        <section className="flex flex-row justify-around items-start flex-wrap gap-2">
          {/* {tasks.map(task => <TodoCard key={task.id} task={task}/>)} */}
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(task => {
            if(active === TaskTabType.TODO){
              return <TodoCard key={task}/> 
            }
            if(active === TaskTabType.ONGOING){
              return <OngoingTodoCard key={task}/>
            }
            return <CompletedTodoCard key={task}/>
            })
          }

        </section>
    </section>
  )
}

export default TaskScreen;