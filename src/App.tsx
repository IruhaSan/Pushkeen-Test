import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteEnum from './const/routes';
import HomePage from './pages/Home';
import PostsPage from './pages/Posts';
import ProfilePage from './pages/Profile';
import UserListPage from './pages/UserList';
import Layout from './utils/components/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path={RouteEnum.HOME} element={<HomePage />} />
          <Route path={RouteEnum.PROFILE} element={<ProfilePage />} />
          <Route path={RouteEnum.POSTS} element={<PostsPage />} />
          <Route path={RouteEnum.USER_LIST} element={<UserListPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
