import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Components
import Header from './components/common/Header';
import AuthGuard from './components/guards/AuthGuard';

// Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/HomePage';
import FighterProfile from './pages/Fighter/FighterProfile';
import FightPage from './pages/Fight/FightPage';
import RankingPage from './pages/RankingPage';
import FightHistoryPage from './pages/Fight/FightHistoryPage';

function App() {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/" />} />
          
          <Route path="/" element={
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          } />
          
          <Route path="/profile" element={
            <AuthGuard>
              <FighterProfile />
            </AuthGuard>
          } />
          
          <Route path="/fight" element={
            <AuthGuard>
              <FightPage />
            </AuthGuard>
          } />
          
          <Route path="/ranking" element={
            <AuthGuard>
              <RankingPage />
            </AuthGuard>
          } />
          
          <Route path="/history" element={
            <AuthGuard>
              <FightHistoryPage />
            </AuthGuard>
          } />
        </Routes>
      </main>
      
      <footer className="bg-black py-4 border-t border-red-800">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>As Lendas &copy; {new Date().getFullYear()} - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default App;