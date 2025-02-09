import { IoIosCheckmarkCircle } from 'react-icons/io'
import AvatarGroup from './AvatarGroup'
import { BsThreeDots } from 'react-icons/bs'
import { TaskType } from '../../taskSlice'
import { getTimeRemaining } from '../../../../../common/middleware/getTimeRemaining'
import ProgressBarIndicator from './ProgressBarIndicator'

const OngoingTodoCard: React.FC<{task?: TaskType}> = ({task}) => {

  if(task === undefined){
    return (
        <section className='flex flex-col bg-slate-50 rounded-2xl hover:border hover:border-slate-400 hover:transition hover:duration-500 hover:ease-in-out'>
          <section className='w-72 flex flex-col border border-slate-200 shadow-sm rounded-2xl p-4'>
            <section className='flex flex-row items-center justify-between'>
              <span className="my-2 text-black font-extrabold">{ "Task Name"}</span>
              <BsThreeDots size={24}/>
            </section>
            <p className='text-slate-400 text-xs'>Contrary to popular believe, Lorem Ipsum is not a simply random text. It has roots in a piece of classical Latin literature from 45.</p>
            <section className='my-2'>
                <section className='flex flex-row items-center justify-between text-xs my-1'>
                    <span className='text-slate-400'>Created At</span>
                    <span className='text-green-700 font-medium'>July 2, 2023</span>
                </section>
                <section className='flex flex-row items-center justify-between text-xs  my-1'>
                    <span className='text-slate-400'>Team Lead</span>
                    <span className='text-purple-700 font-medium'>Jens Brink</span>
                </section>
                <section className='flex flex-row items-center justify-between text-xs  my-1'>
                    <span className='text-slate-400'>Deadline</span>
                    <span className='font-medium'>July 12, 2023</span>
                </section>
                <section className='flex flex-row items-center justify-between '>
                    <span className='text-black font-bold'>Team</span>
                    <AvatarGroup addIcon={false}/>
                </section>
            </section>
            <section className="flex flex-row items-center justify-between">
            <ProgressBarIndicator progress={60} />
            </section>
            </section>
        </section>  )
  }else{
    return (
        <section className='flex flex-col rounded-2xl hover:border hover:border-slate-400 hover:transition hover:duration-500 hover:ease-in-out'>
          <section className='w-72 flex flex-col border border-slate-200 shadow-sm rounded-2xl p-4'>
            <section className='flex flex-row items-center justify-between'>
              <span className="my-2 font-bold">{task.title}</span>
              <BsThreeDots size={24}/>
            </section>
            <span className="my-2">{getTimeRemaining(task.createdAt, task.expiryDate)}</span>
            <section className="flex flex-row items-center justify-between">
              {/* <AvatarGroup /> */}
              <IoIosCheckmarkCircle size={24} color="green"/>
            </section>
            </section>
        </section>
      )
  }
}

export default OngoingTodoCard