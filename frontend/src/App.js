import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from './pages/start_page/StartPage';
import RegistrationPage from './pages/registration_page/RegistrationPage';
import ExpeditionsPage from './pages/expeditions_page/ExpeditionsPage';
import AllExpeditionsPage from './pages/all_expeditions_page/AllExpeditionsPage';
import NotFoundPage from './pages/not_found_page/NotFoundPage';
import { useState } from 'react';

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage userId={userId} setUserId={setUserId} setToken={setToken} />}></Route>
          <Route path="/register" element={<RegistrationPage />}></Route>
          <Route path="/:id" element={<NotFoundPage />}></Route>
          <Route path="/expeditions" element={<AllExpeditionsPage userId={userId} token={token} />}></Route>
          <Route path="/expeditions/:id" element={<NotFoundPage />}></Route>
          <Route path="/expeditions/user/:userId" element={<ExpeditionsPage token={token} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
