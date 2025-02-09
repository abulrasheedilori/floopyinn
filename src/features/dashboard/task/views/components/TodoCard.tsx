import { IoIosCheckmarkCircle } from 'react-icons/io'
import AvatarGroup from './AvatarGroup'
import { BsThreeDots } from 'react-icons/bs'
import { TaskType } from '../../taskSlice'
import { getTimeRemaining } from '../../../../../common/middleware/getTimeRemaining'

const TodoCard: React.FC<{task?: TaskType}> = ({task}) => {

  if(task === undefined){
    return (
        <section className='flex flex-col '>
          <section className='w-72 flex flex-col border border-slate-200 shadow-sm rounded-2xl p-4'>
            <section className='flex flex-row items-center justify-between'>
              <span className="my-2 font-bold">{ "Task Name"}</span>
              <BsThreeDots size={24}/>
            </section>
            <span className="my-2">{"2 weeks left, 7pm"}</span>
            <section className="flex flex-row items-center justify-between">
              <AvatarGroup addIcon/>
              <IoIosCheckmarkCircle size={24} color="green"/>
            </section>
            </section>
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
              <AvatarGroup addIcon/>
              <IoIosCheckmarkCircle size={24} color="green"/>
            </section>
            </section>
        </section>
      )
  }
}

export default TodoCard