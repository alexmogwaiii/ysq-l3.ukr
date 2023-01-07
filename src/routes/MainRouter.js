import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Intro } from '../pages/Intro';
import { MainLayout } from '../Layouts/MainLayout';

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/ysq-l3.urk' element={<MainLayout />}>
          <Route path='/ysq-l3.urk' exact element={<Intro />} />
          <Route path='/survey' element={<div />} />
          <Route path='/results' element={<div />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
