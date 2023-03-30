import ReactDOM from 'react-dom/client';
import DemoRouter from './DemoRouter';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const greatingMessage = <div className='text-black'>Hello React!</div>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DemoRouter />);
