import { Outlet } from 'react-router-dom';
    import Navbar from './components/Navbar';

    function App() {
      return (
        <div>
          <Navbar />
          <h1 className="text-3xl font-bold text-center mt-4 text-purple-accent">
            Online Radio Station
          </h1>
          <Outlet />
        </div>
      );
    }

    export default App;
