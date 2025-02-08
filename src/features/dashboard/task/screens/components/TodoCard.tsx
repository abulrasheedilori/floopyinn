import { IoIosCheckmarkCircle } from 'react-icons/io'
import AvatarGroup from './AvatarGroup'
import { BsThreeDots } from 'react-icons/bs'

const TodoCard = () => {
  return (
        <section className='flex flex-col '>
          <section className='w-72 flex flex-col border border-slate-200 shadow-sm rounded-2xl p-4'>
            <section className='flex flex-row items-center justify-between'>
              <span className="my-2 font-bold">Task Name</span>
              <BsThreeDots size={24}/>
            </section>
            <span className="my-2">2 weeks left, 7pm</span>
            <section className="flex flex-row items-center justify-between">
              <AvatarGroup />
              <IoIosCheckmarkCircle size={24} color="green"/>
            </section>
            </section>
        </section>  )
}

export default TodoCard