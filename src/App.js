import { BrowserRouter as Router } from 'react-router-dom';
import './style.css';

import Header from './components/Atom/Header/index';
import Footer from './components/Atom/Footer/index';
import RoutesConfig from './RoutesConfig';

function App() {
  return (
    <Router>    
        <Header/>
        <RoutesConfig />
        <Footer className="footer" />
    </Router>
  );
}

export default App;