import { IoIosCheckmarkCircle } from 'react-icons/io'
import AvatarGroup from './AvatarGroup'
import { BsThreeDots } from 'react-icons/bs'
import { TaskType } from '../../taskSlice'
import { getTimeRemaining } from '../../../../../common/middleware/getTimeRemaining'
import { useState } from 'react'
import TaskMenuModal from './TaskMenuModal'

export interface TodoStatusTaskProps {
  task: TaskType, onUpdate: (task: TaskType) => void, onDelete: (task: TaskType) => void
}

const TodoCard: React.FC<TodoStatusTaskProps> = ({ task, onDelete, onUpdate }) => {
  const [showMenu, setMenu] = useState<boolean>(false);

  const handleShowMenu = () => { setMenu(true) };
  const handleCloseMenu = () => setMenu(false);

  if (task === null) return null;
  const timeRem = getTimeRemaining(task.createdAt, task.expiryDate);

  return (
    <section className='relative flex flex-col bg-slate-50 rounded-2xl hover:border hover:border-slate-400 hover:transition hover:duration-500 hover:ease-in-out'>
      {showMenu && task && <TaskMenuModal task={task} hideMenu={handleCloseMenu} onUpdate={onUpdate} onDelete={onDelete} />}
      <section className='w-72 flex flex-col border border-slate-200 shadow-sm rounded-2xl p-4'>
        <section className='flex flex-row items-center justify-between'>
          <span className="my-2 font-bold">{task.title}</span>
          <BsThreeDots size={24} onClick={handleShowMenu} />
        </section>
        <span className="my-2 text-xs">{timeRem}</span>
        <section className="flex flex-row items-center justify-between">
          <AvatarGroup addIcon /> {/** can be optimized to add members */}
          <IoIosCheckmarkCircle size={24} color="blue" /> {/** can be modified to change colors */}
        </section>
      </section>
    </section>
  );
}

export default TodoCard;