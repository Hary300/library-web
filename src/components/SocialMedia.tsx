import { SiFacebook, SiInstagram, SiTiktok, SiLinkedin } from 'react-icons/si';

const SocialMedia = () => {
  const iconClass =
    'w-6 h-6 hover:text-blue-600 transition-colors duration-200';

  return (
    <div className='flex gap-3'>
      <a
        href='https://www.facebook.com/'
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-center items-center hover:opacity-70 w-10 h-10 rounded-full border border-[#D5D7DA] cursor-pointer'
      >
        <SiFacebook className={iconClass} />
      </a>

      <a
        href='https://www.instagram.com/'
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-center items-center hover:opacity-70 w-10 h-10 rounded-full border border-[#D5D7DA] cursor-pointer'
      >
        <SiInstagram className={iconClass} />
      </a>

      <a
        href='https://www.linkedin.com/'
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-center items-center hover:opacity-70 w-10 h-10 rounded-full border border-[#D5D7DA] cursor-pointer'
      >
        <SiLinkedin className={iconClass} />
      </a>

      <a
        href='https://www.tiktok.com/'
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-center items-center hover:opacity-70 w-10 h-10 rounded-full border border-[#D5D7DA] cursor-pointer'
      >
        <SiTiktok className={iconClass} />
      </a>
    </div>
  );
};

export default SocialMedia;
