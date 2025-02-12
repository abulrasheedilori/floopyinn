import { IoIosCheckmarkCircle } from 'react-icons/io'
import AvatarGroup from './AvatarGroup'
import { BsThreeDots } from 'react-icons/bs'
import { TaskType } from '../../taskSlice'
import { getTimeRemaining } from '../../../../../common/middleware/getTimeRemaining'

const TodoCard: React.FC<{ task: TaskType }> = ({ task }) => {

  const timeRem = getTimeRemaining(task.createdAt, task.expiryDate);

  return (
    <section className='flex flex-col bg-slate-50 rounded-2xl hover:border hover:border-slate-400 hover:transition hover:duration-500 hover:ease-in-out'>
      <section className='w-72 flex flex-col border border-slate-200 shadow-sm rounded-2xl p-4'>
        <section className='flex flex-row items-center justify-between'>
          <span className="my-2 font-bold">{task.title}</span>
          <BsThreeDots size={24} />
        </section>
        <span className="my-2 text-xs">{timeRem}</span>
        <section className="flex flex-row items-center justify-between">
          <AvatarGroup addIcon /> {/** can be optimized to change add members */}
          <IoIosCheckmarkCircle size={24} color="blue" /> {/** can be modified to change colors */}
        </section>
      </section>
    </section>
  );
}

export default TodoCard;