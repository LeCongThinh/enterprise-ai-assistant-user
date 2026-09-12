// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import { UserLayout } from '../layouts/UserLayout';
import { HomePage } from '../pages/HomePage';

export const AppRoutes = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </UserLayout>
  );
};