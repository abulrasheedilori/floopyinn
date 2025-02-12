import AvatarGroup from './AvatarGroup'
import { BsThreeDots } from 'react-icons/bs'
import { TaskType } from '../../taskSlice'
import ProgressBarIndicator from './ProgressBarIndicator'
import { memo } from 'react'

const CompletedTodoCard: React.FC<{ task: TaskType }> = ({ task }) => {
  return (
    <section className='flex flex-col bg-slate-50 rounded-2xl hover:border hover:border-slate-400 hover:transition hover:duration-500 hover:ease-in-out'>
      <section className='w-72 flex flex-col border border-slate-200 shadow-sm rounded-2xl p-4'>
        <section className='flex flex-row items-center justify-between'>
          <span className="my-2 text-black font-extrabold">{task.title}</span>
          <BsThreeDots size={24} />
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