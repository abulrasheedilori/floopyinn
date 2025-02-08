import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import TodoCard from "./components/TodoCard";

enum TaskTab {
  TODO = "TODO",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
};

type TaskTabItemType = {
  name: TaskTab;
  label: string;
  id: string;
};

const tabs:TaskTabItemType[]  = [
  {
    name: TaskTab.TODO, id: '1',
    label: "To Do(s)"
  },
  {
    name: TaskTab.ONGOING, id: '2',
    label: "On Going"
  },
  {
    name: TaskTab.COMPLETED, id: '3',
    label: "Completed"
  },
 
];

const TaskScreen = () =>{
  const [active, setActive] = useState<TaskTab>(TaskTab.TODO);

  const handleSetActive = (value: TaskTab) => {
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
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(item => <TodoCard key={item}/>)}
        </section>
    </section>
  )
}

export default TaskScreen;