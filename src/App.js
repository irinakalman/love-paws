import logo from './logo.svg';
import './App.css';
import Profile from './pages/profile/profile';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout/layout';
import Inboxes from './pages/inboxes/inboxes';
import Inbox from './pages/inbox/inbox';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="inboxes" element={<Inboxes />} />
          <Route path="inbox/:catId" element={<Inbox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
