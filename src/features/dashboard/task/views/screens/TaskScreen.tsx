import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import TodoCard from "../components/TodoCard";
import { useAppDispatch, useAppSelector } from "../../../../../common/reduxtk/hooks";
import OngoingTodoCard from "../components/OngoingTodoCard";
import CompletedTodoCard from "../components/CompletedTodoCard";
import { database } from "../../../../../common/firebase";
import { onValue, ref } from "firebase/database";
import { fetchTasks, filterTasksByFlag, TaskType } from "../../taskSlice";
import AddTaskModal from "./AddTaskModal";

export enum TaskTabType {
  TODO = "TODO",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
};

type TaskTabItemType = {
  name: TaskTabType;
  label: string;
  id: string;
};

const tabs: TaskTabItemType[] = [
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

const TaskScreen: React.FC = () => {
  const [active, setActive] = useState<TaskTabType>(TaskTabType.TODO);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const dispatch = useAppDispatch();
  // const tasks = useAppSelector((state) => state.tasks.tasks);
  const darkMode = useAppSelector(state => state.auth.darkMode);




  useEffect(() => {
    const fetchNewTask = async () => {
      await dispatch(fetchTasks());
    }
    fetchNewTask();

  }, [tasks]);

  const handleSetActive = (value: TaskTabType) => {
    setActive(value);
  };

  const showAddTaskModal = () => setIsModalOpen(true);
  const hideAddTaskModal = () => setIsModalOpen(false);


  return (
    <section className={`w-full px-8 py-8 h-[100vh] flex flex-col overflow-y-auto ${darkMode ? "bg-gray-300" : "bg-slate-50"}`}>
      <h1 className="text-2xl pb-8 font-extrabold">Project</h1>
      <section className='flex w-full justify-between items-center mb-8  text-black relative'>
        <AddTaskModal isOpen={isModalOpen} onClose={hideAddTaskModal} />
        <div className='flex space-x-2 '>
          {tabs.map((tab) => (
            <span key={tab.id} className={`hover:text-slate-50 font-bold  hover:bg-black rounded-lg px-4 py-2 ${active === tab.name && "bg-black text-slate-50"}`} onClick={() => handleSetActive(tab.name)}>{tab.label}</span>
          ))}
        </div>
        <button onClick={showAddTaskModal} className='flex items-center space-x-2 bg-black border rounded-lg shadow-lg text-slate-50 px-4 py-2 hover:bg-slate-50 hover:text-black hover:border-slate-200'>
          <CiCirclePlus size={16} className="text-white hover:bg-black" />
          <span>Add Task</span>
        </button>
      </section>
      <section className="flex flex-row justify-around items-start flex-wrap gap-2 overflow-y-auto">
        {tasks.map((task) => {
          if (active === TaskTabType.TODO) {
            dispatch(filterTasksByFlag(TaskTabType.TODO));
            return <TodoCard key={task.id} />
          }
          else if (active === TaskTabType.ONGOING) {
            dispatch(filterTasksByFlag(TaskTabType.ONGOING));
            return <OngoingTodoCard key={task.id} />
          }
          else if (active === TaskTabType.COMPLETED) {
            dispatch(filterTasksByFlag(TaskTabType.COMPLETED));
            return <OngoingTodoCard key={task.id} />
          }
        })
        }
      </section>
    </section>
  )
}

export default TaskScreen;