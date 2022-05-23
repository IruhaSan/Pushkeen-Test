import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import RouteEnum from './const/routes';
import HomePage from './pages/Home';
import PostsPage from './pages/Posts';
import ProfilePage from './pages/Profile';
import UserListPage from './pages/UserList';
import store from './store';
import Layout from './utils/components/Layout';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path={RouteEnum.HOME} element={<HomePage />} />
          <Route path={RouteEnum.PROFILE} element={<ProfilePage />} />
          <Route path={RouteEnum.POSTS} element={<PostsPage />} />
          <Route path={RouteEnum.USER_LIST} element={<UserListPage />} />
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
