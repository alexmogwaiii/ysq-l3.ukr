import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Intro } from '../pages/Intro';
import { MainLayout } from '../Layouts/MainLayout';

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' exact element={<Intro />} />
          <Route path='survey' element={<div />} />
          <Route path='results' element={<div />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
