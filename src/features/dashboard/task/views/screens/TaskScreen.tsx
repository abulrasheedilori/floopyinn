import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import TodoCard from "../components/TodoCard";
import { useAppDispatch, useAppSelector } from "../../../../../common/reduxtk/hooks";
import OngoingTodoCard from "../components/OngoingTodoCard";
import CompletedTodoCard from "../components/CompletedTodoCard";
import { deleteTask, fetchTasks, TaskType } from "../../taskSlice";
import AddTaskModal from "../components/AddTaskModal";
import { showToast } from "../../../../../common/middleware/showToast";
import UpdateTaskModal from "../components/UpdateTaskModal";

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
  { name: TaskTabType.TODO, id: '1', label: "To Do(s)" },
  { name: TaskTabType.ONGOING, id: '2', label: "On Going" },
  { name: TaskTabType.COMPLETED, id: '3', label: "Completed" },
];

const TaskScreen: React.FC = () => {
  const [active, setActive] = useState<TaskTabType>(TaskTabType.TODO);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const status = useAppSelector(state => state.tasks.status);
  const darkMode = useAppSelector(state => state.auth.darkMode);

  useEffect(() => {
    const fetchNewTask = async () => {
      await dispatch(fetchTasks());
    };
    fetchNewTask();
  }, [dispatch]);

  const handleSetActive = (value: TaskTabType) => setActive(value);
  const showAddTaskModal = () => setIsAddModalOpen(true);
  const hideAddTaskModal = () => setIsAddModalOpen(false);
  const showEditTaskModal = (task: TaskType) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };
  const hideEditTaskModal = () => setIsEditModalOpen(false);
  const onDelete = (task: TaskType) => {
    dispatch(deleteTask(task.id!)).then((result) => showToast("success", result?.payload?.toString() || "Task Deleted")).catch((error) => showToast("error", error.message)).finally(() => { });
  }

  const filteredTasks = tasks.filter(task => task.flag === active);
  if (status === "loading") return <p>Loading tasks...</p>;

  return (

    <section className={`w-full px-8 py-8 h-[100vh] flex flex-col overflow-y-auto ${darkMode ? "bg-gray-300" : "bg-slate-50"}`}>
      <h1 className="text-2xl pb-8 font-extrabold">Project</h1>
      <section className='flex w-full justify-between items-center mb-8 text-black relative'>
        <AddTaskModal isOpen={isAddModalOpen} onClose={hideAddTaskModal} />
        {selectedTask && <UpdateTaskModal isOpen={isEditModalOpen} onClose={hideEditTaskModal} task={selectedTask} />}
        <div className='flex space-x-2'>
          {tabs.map((tab) => (
            <span key={tab.id} className={`hover:text-slate-50 font-bold hover:bg-black rounded-lg px-4 py-2 ${active === tab.name && "bg-black text-slate-50"}`} onClick={() => handleSetActive(tab.name)}>{tab.label}</span>
          ))}
        </div>
        <button onClick={showAddTaskModal} className='flex items-center space-x-2 bg-black border rounded-lg shadow-lg text-slate-50 px-4 py-2 hover:bg-slate-50 hover:text-black hover:border-slate-200'>
          <CiCirclePlus size={16} className="text-white hover:bg-black" />
          <span>Add Task</span>
        </button>
      </section>
      <section className="relative flex flex-row justify-items-start items-start flex-wrap gap-2 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center text-2xl font-semibold">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => {
            if (active === TaskTabType.TODO) {
              return <TodoCard key={task.id} onUpdate={showEditTaskModal} task={task} onDelete={onDelete} />;
            }
            if (active === TaskTabType.ONGOING) {
              return <OngoingTodoCard key={task.id} onUpdate={showEditTaskModal} task={task} onDelete={onDelete} />;
            }
            if (active === TaskTabType.COMPLETED) {
              return <CompletedTodoCard key={task.id} onUpdate={showEditTaskModal} task={task} onDelete={onDelete} />;
            }
          }))
        }
      </section>
    </section>
  );
};

export default TaskScreen;
