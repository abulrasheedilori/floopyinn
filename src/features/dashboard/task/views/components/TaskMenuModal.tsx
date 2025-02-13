import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

interface TaskMenuModalProps {
    taskId: string,
    onDelete: (taskId: string) => void;
}

const TaskMenuModal: React.FC<TaskMenuModalProps> = ({ taskId, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                <FaEllipsisV />
            </button>
            {isOpen && (
                <div className="absolute right-0 w-40 bg-white shadow-md rounded-md border py-2">
                    <button
                        className="flex items-center px-4 py-2 w-full hover:bg-gray-200"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        <FaEdit className="mr-2" /> Update Task
                    </button>
                    <button
                        className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-gray-200"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this task?")) {
                                onDelete(taskId);
                            }
                            setIsOpen(false);
                        }}
                    >
                        <FaTrash className="mr-2" /> Delete Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskMenuModal;
