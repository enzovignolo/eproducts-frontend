import { React, useContext } from 'react';
import AppContext from '../../AppContext';

const Navbar = () => {
	const [state, dispatch] = useContext(AppContext);
	const onUserSelect = (e) => {
		e.preventDefault();
		dispatch({
			type: 'setUserId',
			value: e.target.userId.value,
		});
		return false;
	};
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
			<div className='container-fluid'>
				<a className='navbar-brand' href='/'>
					E-products
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarColor01'
					aria-controls='navbarColor01'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div
					className='collapse navbar-collapse'
					id='navbarColor01'
				>
					<ul className='navbar-nav me-auto'>
						<li className='nav-item'>
							<a className='nav-link' href='/'>
								Products
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href='/add-product'>
								Add product
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href='/cart'>
								Cart
							</a>
						</li>
					</ul>
					<form className='d-flex' onSubmit={onUserSelect}>
						<input
							className='form-control me-sm-2'
							type='text'
							placeholder='Select user'
							id='userId'
						/>
						<button
							className='btn btn-secondary my-2 my-sm-0'
							type='submit'
						>
							Select
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
