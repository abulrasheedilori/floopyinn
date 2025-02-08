import { RxAvatar } from 'react-icons/rx';
import { TbCircleDashedPlus } from 'react-icons/tb';

//a well structured image type could be created instead for the AvatarGroup component but this will do fine for demonstration
const AvatarGroup = () => {
  return (
    <section className="my-2 flex items-center">
      {[1, 2, 3, 4].map((item) => (
        <RxAvatar key={item} size={24} className="avatargroup" />
      ))}
      <TbCircleDashedPlus size={24} color='gray'/>
    </section>
  );
};

export default AvatarGroup;