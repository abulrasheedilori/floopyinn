import AvatarGroup from './AvatarGroup'
import { BsThreeDots } from 'react-icons/bs'
import ProgressBarIndicator from './ProgressBarIndicator'
import { memo, useState } from 'react'
import { TodoStatusTaskProps } from './TodoCard'
import TaskMenuModal from './TaskMenuModal'

const CompletedTodoCard: React.FC<TodoStatusTaskProps> = ({ task, onUpdate, onDelete }) => {
  const [showMenu, setMenu] = useState<boolean>(false);

  const handleShowMenu = () => setMenu(true);
  const handleCloseMenu = () => setMenu(false);

  return (
    <section className='relative flex flex-col bg-slate-50 rounded-2xl hover:border hover:border-slate-400 hover:transition hover:duration-500 hover:ease-in-out'>
      {showMenu && task.id && <TaskMenuModal hideMenu={handleCloseMenu} task={task} onUpdate={onUpdate} onDelete={onDelete} />}
      <section className='w-72 flex flex-col border border-slate-200 shadow-sm rounded-2xl p-4'>
        <section className='flex flex-row items-center justify-between'>
          <span className="my-2 text-black font-extrabold">{task.title}</span>
          <BsThreeDots size={24} onClick={handleShowMenu} />
        </section>
        <p className='text-slate-400 text-xs'>{task.createdAt}</p>

        <ProgressBarIndicator progress={task.completionRate} />
        <section className='flex flex-row items-center justify-between '>
          <AvatarGroup addIcon={false} />
          <section className='text-purple-700 text-xs bg-purple-200 px-2 py rounded-xl'>Complete</section>
        </section>
      </section>
    </section>)
}

export default memo(CompletedTodoCard);