import './App.css';
import Products from './Components/Products/Products';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Components/Cart/Cart';
import EditProduct from './Components/Products/EditProduct';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import AddProduct from './Components/Products/AddProduct';
import { useState } from 'react';
import AppContext from './AppContext';

function App() {
	const [userId, setUserId] = useState('default');
	const userSettings = {
		userId,
		setUserId,
	};
	const onUserSelect = (e) => {
		e.preventDefault();
		setUserId(e.target.userId.value);

		return false;
	};
	return (
		<AppContext.Provider value={userSettings}>
			<div className='App'>
				<BrowserRouter>
					<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
						<div className='container-fluid'>
							<ul className='navbar-nav me-auto'>
								<li className='nav-item'>
									<Link to='/' className='nav-link'>
										E-Products
									</Link>
								</li>

								<li className='nav-item'>
									<Link to='/cart' className='nav-link'>
										Cart
									</Link>
								</li>
								{userSettings.userId === 'admin' ? (
									<li className='nav-item'>
										<Link
											to='/add-product'
											className='nav-link'
										>
											Add product
										</Link>
									</li>
								) : (
									''
								)}
							</ul>
						</div>
						<form
							className='d-flex m-2'
							onSubmit={onUserSelect}
						>
							<input
								className='form-control me-sm-2'
								type='text'
								placeholder='Select user'
								id='userId'
							/>
							<button
								className='btn btn-secondary my-2 my-sm-0 pr-4'
								type='submit'
							>
								Select
							</button>
						</form>
					</nav>

					<Switch>
						<Route path='/add-product'>
							<AddProduct />;
						</Route>
						<Route path='/cart'>
							<Cart />
						</Route>
						<Route path='/edit-product/:id'>
							<EditProduct />;
						</Route>
						<Route path='/'>
							<Products />
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		</AppContext.Provider>
	);
}

export default App;
