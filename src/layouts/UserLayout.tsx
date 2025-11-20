import { Link, Outlet } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, MenuIcon, X } from 'lucide-react';
import SocialMedia from '@/components/SocialMedia';

export default function UserLayout() {
  const [openUser, setOpenUser] = useState(false);
  const [openUserMobile, setOpenUserMobile] = useState(false);

  const [openSearch, setOpenSearch] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const isLoggedIn = true;

  // Tutup semua dropdown saat resize layar
  useEffect(() => {
    const handleResize = () => {
      setOpenUser(false);
      setOpenSearch(false);
      setOpenMobileMenu(false);
      setOpenUserMobile(false);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <header className='flex items-center justify-between gap-4 px-4 py-3 lg:px-30 md:py-5'>
        {/* Logo */}
        <Link to='/home'>
          <div className='flex gap-3 items-center'>
            <img src='/icons/logo.svg' alt='logo library' />
            <p className='text-[#0A0D12] font-bold text-[25.14px]'>Booky</p>
          </div>
        </Link>

        {/* Search Desktop */}
        <div className='hidden md:block relative flex-1 max-w-[500px]'>
          <img
            src='/icons/search.svg'
            alt='search icon'
            className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4'
          />

          <input
            type='text'
            placeholder='Search Book'
            className='rounded-full w-full border border-[#D5D7DA] pl-10 pr-4 py-2 text-sm text-[#535862]'
          />
        </div>

        {/* Kanan Mobile */}
        <div className='flex md:hidden items-center gap-4'>
          {isLoggedIn ? (
            <>
              {/* Search Mobile */}
              <DropdownMenu
                open={openSearch}
                onOpenChange={setOpenSearch}
                modal={false}
              >
                <DropdownMenuTrigger>
                  <img
                    src='/icons/search.svg'
                    alt='search icon'
                    className='w-6 h-6'
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-64 bg-white border-none shadow-none'>
                  <div className='p-2'>
                    <input
                      type='text'
                      placeholder='Search Book'
                      className='rounded-full w-full border border-[#D5D7DA] px-4 py-2 text-sm text-[#535862]'
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <img src='/icons/shoppingBag.svg' alt='shopping bag' />

              <DropdownMenu
                open={openUserMobile}
                onOpenChange={setOpenUserMobile}
                modal={false}
              >
                <DropdownMenuTrigger className='flex items-center gap-1'>
                  <img src='/icons/profilePicture.svg' alt='profile picture' />
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-[calc(100vw-32px)] mx-4 px-4 mt-2 bg-white border shadow-md'>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to='/profile'>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to='/borrowed-list'>Borrowed List</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to='/reviews'>Reviews</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-red-600 hover:bg-red-50'>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Search Mobile */}
              <DropdownMenu
                open={openSearch}
                onOpenChange={setOpenSearch}
                modal={false}
              >
                <DropdownMenuTrigger>
                  <img
                    src='/icons/search.svg'
                    alt='search icon'
                    className='w-6 h-6'
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-64 bg-white border-none shadow-none'>
                  <div className='p-2'>
                    <input
                      type='text'
                      placeholder='Search Book'
                      className='rounded-full w-full border border-[#D5D7DA] px-4 py-2 text-sm text-[#535862]'
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <img src='/icons/shoppingBag.svg' alt='shopping bag' />
              {/* Mobile Menu */}
              <DropdownMenu
                open={openMobileMenu}
                onOpenChange={setOpenMobileMenu}
                modal={false}
              >
                <DropdownMenuTrigger>
                  {openMobileMenu ? (
                    <X className='w-6 h-6' />
                  ) : (
                    <MenuIcon className='w-6 h-6' />
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-screen left-0 px-4 mt-2 !translate-x-0 bg-white border shadow-md'>
                  <DropdownMenuItem>
                    <div className='flex gap-2 justify-between w-full'>
                      <Link
                        to='/login'
                        className='w-1/2 px-4 py-1.5 border rounded-full text-sm text-black text-center'
                      >
                        Login
                      </Link>

                      <Link
                        to='/register'
                        className='w-1/2 px-4 py-1.5 rounded-full text-sm bg-blue-600 text-white text-center'
                      >
                        Register
                      </Link>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Kanan Desktop */}
        <div className='hidden md:flex items-center gap-4'>
          {isLoggedIn ? (
            <>
              <img src='/icons/shoppingBag.svg' alt='shopping bag' />
              <img src='/icons/profilePicture.svg' alt='profile picture' />

              <DropdownMenu
                open={openUser}
                onOpenChange={setOpenUser}
                modal={false}
              >
                <DropdownMenuTrigger className='flex items-center gap-1'>
                  John Doe
                  {openUser ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to='/profile'>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to='/borrowed-list'>Borrowed List</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to='/reviews'>Reviews</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-red-600 hover:bg-red-50'>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='w-[163px] px-4 py-1.5 border rounded-full text-sm text-black text-center'
              >
                Login
              </Link>

              <Link
                to='/register'
                className='w-[163px] px-4 py-1.5 rounded-full text-sm bg-blue-600 text-white text-center'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <main className='p-4 lg:px-30'>
        <Outlet />
      </main>

      <footer className='flex flex-col items-center px-4 mt-10 lg:px-30 lg:mt-20'>
        <Link to='/home'>
          <div className='flex gap-3 items-center mb-5'>
            <img src='/icons/logo.svg' alt='logo library' />
            <p className='text-[#0A0D12] font-bold text-[25.14px]'>Booky</p>
          </div>
        </Link>

        <p className='font-semibold text-sm md:text-[16px] mb-4 md:mb-10 text-center'>
          Discover inspiring stories & timeless knowledge, ready to borrow
          anytime. Explore online or visit our nearest library branch.
        </p>
        <div className='flex flex-col gap-5 items-center'>
          <p className='font-semibold text-[16px]'>Follow on Social Media</p>
          {/* social media */}
          <SocialMedia />
        </div>
      </footer>
    </div>
  );
}
