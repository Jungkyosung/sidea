import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/pages/user/MainPage';
import AdminPage from './components/pages/admin/AdminPage';
import AdminQnaListPage from './components/pages/admin/AdminQnaListPage';
import AdminQnaDetailPage from './components/pages/admin/AdminQnaDetailPage';
import AdminQnaReplyPage from './components/pages/admin/AdminQnaReplyPage';
import AdminCampListPage from './components/pages/admin/AdminCampListPage';
import AdminCampDetailPage from './components/pages/admin/AdminCampDetailPage';
import AdminCampAddPage from './components/pages/admin/AdminCampAddPage';
import AdminCampEditPage from './components/pages/admin/AdminCampEditPage';
import LoginPage from './components/pages/user/LoginPage';
import RegistPage from './components/pages/user/RegistPage';
import InfoPage from './components/pages/user/InfoPage';
import MyPage from './components/pages/user/myPage/MyPage';
import MyPointPage from './components/pages/user/myPage/MyPointPage';
import MyPointDetailPage from './components/pages/user/myPage/MyPointDetailPage';
import MyCampListPage from './components/pages/user/myPage/MyCampListPage';
import MyQnalistPage from './components/pages/user/myPage/MyQnalistPage';
import MyQnaDetailPage from './components/pages/user/myPage/MyQnaDetailPage';
import MyQnaWritePage from './components/pages/user/myPage/MyQnaWritePage';
import CampListPage from './components/pages/user/campPage/CampListPage';
import CampDetailPage from './components/pages/user/campPage/CampDetailPage';
import TodolistPage from './components/pages/user/todoPage/TodolistPage';
import TodoReportPage from './components/pages/user/todoPage/TodoReportPage';
import TodoEditPage from './components/pages/user/todoPage/TodoEditPage';
import NotFoundPage from './components/pages/NotFoundPage';
import MyEditPage from './components/pages/user/myPage/MyEditPage';
import TodoAddPage from './components/pages/user/todoPage/TodoAddPage';
import ReportPage from './components/pages/user/campPage/ReportPage';

function App() {
  return (
    <div className='guideline'> 
      <Routes>

        {/* admin */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/qnalist" element={<AdminQnaListPage />} />
        <Route path="/admin/qna/:qnaidx" element={<AdminQnaDetailPage />} />
        <Route path="/admin/qna/reply" element={<AdminQnaReplyPage />} />
        <Route path="/admin/campaignlist" element={<AdminCampListPage />} />
        <Route path="/admin/campaign/:campaignidx" element={<AdminCampDetailPage />} />
        <Route path="/admin/campaign/add" element={<AdminCampAddPage />} />
        <Route path="/admin/campaign/edit/:campaignidx" element={<AdminCampEditPage />} />
        {/* user */}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/regist" element={<RegistPage />} />
        <Route path="/info" element={<InfoPage />} />
        {/* user-mypage*/}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/point" element={<MyPointPage />} />
        <Route path="/mypage/point/detail" element={<MyPointDetailPage />} />
        <Route path="/mypage/campaignlist" element={<MyCampListPage />} />
        <Route path="/mypage/qnalist" element={<MyQnalistPage />} />
        <Route path="/mypage/qna/detail/:qnaidx" element={<MyQnaDetailPage />} />
        <Route path="/mypage/qna/write" element={<MyQnaWritePage />} />
        <Route path="/mypage/edit" element={<MyEditPage />} />
        {/* user-campPage*/}
        <Route path="/campaignlist" element={<CampListPage />} />
        <Route path="/campaign/:campaignidx" element={<CampDetailPage />} />
        <Route path="/campaign/report" element={<ReportPage />} />
        {/* user-todoPage*/}
        <Route path="/todolist" element={<TodolistPage />} />
        <Route path="/todo/report" element={<TodoReportPage />} />
        <Route path="/todo/add" element={<TodoAddPage />} />
        <Route path="/todo/edit/:todoidx" element={<TodoEditPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
