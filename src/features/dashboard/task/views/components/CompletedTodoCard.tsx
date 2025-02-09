import { IoIosCheckmarkCircle } from 'react-icons/io'
import AvatarGroup from './AvatarGroup'
import { BsThreeDots } from 'react-icons/bs'
import { TaskType } from '../../taskSlice'
import { getTimeRemaining } from '../../../../../common/middleware/getTimeRemaining'
import ProgressBarIndicator from './ProgressBarIndicator'
import { memo } from 'react'

const CompletedTodoCard: React.FC<{task?: TaskType}> = ({task}) => {

  if(task === undefined){
    return (
        <section className='flex flex-col bg-slate-50 rounded-2xl'>
          <section className='w-72 flex flex-col border border-slate-200 shadow-sm rounded-2xl p-4'>
            <section className='flex flex-row items-center justify-between'>
              <span className="my-2 text-black font-extrabold">{ "Task Name"}</span>
              <BsThreeDots size={24}/>
            </section>
            <p className='text-slate-400 text-xs'>July 2, 2023</p>
            
            {/* <section className="flex flex-row items-center justify-between"> */}
            <ProgressBarIndicator progress={60} />
            <section className='flex flex-row items-center justify-between '>
                <AvatarGroup addIcon={false}/>
                <section className='text-purple-700 text-xs bg-purple-200 px-2 py rounded-xl'>Complete</section>
            </section>
            </section>
            {/* </section> */}
        </section>  )
  }else{
    return (
        <section className='flex flex-col '>
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

export default memo(CompletedTodoCard);