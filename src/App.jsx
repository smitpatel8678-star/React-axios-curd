import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import FileExplore from './FileExplore'
import AuthLayout from './Components/AuthLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AuthLayout>
            <FileExplore />
          </AuthLayout>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App