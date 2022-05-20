import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ROUTEPATH from './const/routePaths';
import HomePage from './pages/Home';
import Layout from './utils/components/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path={ROUTEPATH.HOME} element={<HomePage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
