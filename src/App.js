

import './firebase';
import Links from './components/Links';
//tema de bootswatch
import 'bootswatch/dist/superhero/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {

  return (

    <div className="container p-4">
      <div className="row">
        <Links />
      </div>
      <ToastContainer />
    </div>

  );
}

export default App;
