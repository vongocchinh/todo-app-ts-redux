import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Routers from './Router/Routers';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routers />
      </Router>
    </>
  );
}

export default App;
