import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import UserLayout from './layouts/UserLayout';
import Login from './page/user/Login';
import Home from './page/user/Home';
import Register from './page/user/Register';
import Profile from './page/user/Profile';
import BorrowedList from './page/user/BorrowedList';
import Reviews from './page/user/Reviews';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<UserLayout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/borrowed-list' element={<BorrowedList />} />
          <Route path='/reviews' element={<Reviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
