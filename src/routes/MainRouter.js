import React from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom';
import { Intro } from '../pages/Intro';
import { MainLayout } from '../Layouts/MainLayout';
import { Survey } from '../pages/Survey';

export const MainRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Intro />} />
          <Route path='survey' element={<Survey />} />
          <Route path='results' element={<div />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
