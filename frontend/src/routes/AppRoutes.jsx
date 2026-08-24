import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminPage from '../pages/admin/AdminPage';
import WebDevPage from '../pages/web-development/WebDevPage';
import DataSciencePage from '../pages/data-science-ai/DataSciencePage';
import CybersecurityPage from '../pages/cybersecurity/CybersecurityPage';
import UiUxPage from '../pages/uiux-design/UiUxPage';
import MernBootcamp from '../pages/web-development/MernBootcamp';
import ReactMasterclass from '../pages/web-development/ReactMasterclass';
import NodeApiCourse from '../pages/web-development/NodeApiCourse';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WebDevPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/web-development" element={<WebDevPage />} />
      <Route path="/data-science-ai" element={<DataSciencePage />} />
      <Route path="/cybersecurity" element={<CybersecurityPage />} />
      <Route path="/uiux-design" element={<UiUxPage />} />
      <Route path="/web-development/mern-bootcamp" element={<MernBootcamp />} />
      <Route path="/web-development/react-masterclass" element={<ReactMasterclass />} />
      <Route path="/web-development/node-api-course" element={<NodeApiCourse />} />
    </Routes>
  );
};

export default AppRoutes;