import useAuthRedirect from '../../utils/useAuthRedirect';
import Clock from '../Clock/Clock';
import Navbar from '../Nav/Nav';
import './Home.css';
function Home() {
  useAuthRedirect();

  return (
    <div className='homeContainer'>
      <Navbar />
      <h1 className='homeTitle'>Ponto</h1>
      <Clock />
    </div>
  );
}

export default Home;
