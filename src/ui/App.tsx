import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './screens/Home';
import Map from './screens/Map';
import QRScanner from './screens/QRScanner';
import Multas from './screens/Multas';
import PagarMultas from './screens/PagarMultas';
import NotFound from './NotFound';
import './index.css';

const App = () => {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/Map' element={<Map />} />
				<Route path='/QRScanner' element={<QRScanner />} />
				{/* Rutas que se acceden desde los botones del HomePage: */}
				<Route path='/Multas' element={<Multas />} />
				<Route path='/PagarMultas' element={<PagarMultas />} />
				{/* Cualquier otra ruta que no exista o no este definida aun: */}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
