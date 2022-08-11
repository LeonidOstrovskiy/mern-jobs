import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import PostJob from './screens/PostJob';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import EditJob from './screens/EditJob';
import JobList from './screens/JobList';
import GetAnyJobs from './screens/getAnyJobs';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-holder">
        <ToastContainer position="bottom-center" limit={1} /> <Navbar />
        <Routes>
          <Route index element={<Home />} />{' '}
          <Route path="/users/postjob" element={<PostJob />} />{' '}
          <Route path="/users/login" element={<Login />} />{' '}
          <Route path="/users/signup" element={<SignUp />} />{' '}
          <Route path="/users/editjob/:id" element={<EditJob />} />{' '}
          <Route path="/users/joblist" element={<JobList />} />{' '}
          <Route path="/getjobs" element={<GetAnyJobs />} />{' '}
          <Route
            path="*"
            element={<div className="div-center"> There is nobody here </div>}
          />
        </Routes>{' '}
        <footer className="div-center flex text-white">
          {' '}
          I got no rights to reserve lol{' '}
        </footer>
      </div>{' '}
    </BrowserRouter>
  );
}

export default App;
