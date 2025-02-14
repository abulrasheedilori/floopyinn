import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskType } from "../../taskSlice";
import { IoClose } from "react-icons/io5";

interface TaskMenuModalProps {
    task: TaskType,
    hideMenu: () => void,
    onUpdate: (task: TaskType) => void;
    onDelete: (task: TaskType) => void;
}

const TaskMenuModal: React.FC<TaskMenuModalProps> = ({ task, hideMenu, onUpdate, onDelete }) => {
    return (
        <div className="absolute right-0 w-fit bg-white shadow-md rounded-md border border-slate-50 py-2 z-50">
            <section className="flex border-b-2 border-slate-200 flex-row justify-between items-center p-2">
                <span className="font-extrabold text-md">Menu</span>
                <IoClose size={24} color="red" onClick={hideMenu} />
            </section>
            <button
                className="flex items-center px-4 py-2 w-full hover:bg-gray-200"
                onClick={() => {
                    onUpdate(task)
                    hideMenu();
                }}
            >
                <FaEdit className="mr-2" /> Update
            </button>
            <button
                className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-gray-200"
                onClick={() => {
                    if (window.confirm("Are you sure you want to delete this task?")) {
                        onDelete(task);
                        hideMenu();
                    }
                }}
            >
                <FaTrash className="mr-2" /> Delete
            </button>
        </div>
    );
};

export default TaskMenuModal;
