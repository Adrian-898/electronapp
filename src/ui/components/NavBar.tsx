import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav id='tabBar' className='row fixed-bottom'>
			<ul
				className='nav nav-tabs nav-underline justify-content-evenly bg-light border-2 border-top border-dark-subtle'
				id='tabButtons'
			>
				<NavLink
					className={'nav-link fs-1 fw-bold d-flex align-items-center px-4'}
					id='scanner-tab'
					type='button'
					to={'/QRScanner'}
				>
					<i className='bi bi-camera tab-bar-icon' />
					Escáner QR
				</NavLink>

				<NavLink
					className={'nav-link fs-1 fw-bold d-flex align-items-center px-4'}
					id='home-tab'
					type='button'
					to={'/'}
				>
					<i className='bi bi-house-door tab-bar-icon'></i>
					Inicio
				</NavLink>

				<NavLink
					className={'nav-link fs-1 fw-bold d-flex align-items-center px-4'}
					id='map-tab'
					type='button'
					to={'/Map'}
				>
					<i className='bi bi-geo-alt tab-bar-icon'></i>
					Ubicación
				</NavLink>
			</ul>
		</nav>
	);
};

export default NavBar;
