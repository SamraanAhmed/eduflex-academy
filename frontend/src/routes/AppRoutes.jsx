import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminPage from '../pages/admin/AdminPage';
import WebDevPage from '../pages/web-development/WebDevPage';
import DataSciencePage from '../pages/data-science-ai/DataSciencePage';
import CybersecurityPage from '../pages/cybersecurity/CybersecurityPage';
import UiUxPage from '../pages/uiux-design/UiUxPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WebDevPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/web-development" element={<WebDevPage />} />
      <Route path="/data-science-ai" element={<DataSciencePage />} />
      <Route path="/cybersecurity" element={<CybersecurityPage />} />
      <Route path="/uiux-design" element={<UiUxPage />} />
    </Routes>
  );
};

export default AppRoutes;
