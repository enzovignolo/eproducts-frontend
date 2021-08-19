import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AppContext from '../../AppContext';
import envVars from '../../envVars';
const AddProduct = () => {
	const [product, setProduct] = useState({
		title: '',
		price: '',
		thumbnail: '',
	});
	const userSettings = useContext(AppContext);
	const history = useHistory();

	const handleProductSubmit = async (e) => {
		e.preventDefault();
		const newProduct = {
			name: e.target.productName.value,
			price: e.target.productPrice.value,
			thumbnail: e.target.productImg.value,
		};
		const result = await axios({
			url: `${envVars.apiHost}/productos`,
			method: 'POST',
			data: newProduct,
			headers: { user: userSettings.userId },
		});
		history.push('/');
	};

	return (
		<form onSubmit={handleProductSubmit}>
			<fieldset className='container '>
				<div className='form-group '>
					<label
						htmlFor='productName'
						className='form-label mt-4 row'
					>
						Product Name
					</label>
					<input
						type='text'
						className='form-control w-50 row'
						id='productName'
						placeholder='Enter product name'
					></input>
				</div>
				<div className='form-group '>
					<label
						htmlFor='productPrice'
						className='form-label mt-4 row '
					>
						Price
					</label>
					<input
						type='number'
						min='0'
						step='0.01'
						className='form-control w-25 row'
						id='productPrice'
						placeholder='Enter product price'
					></input>
				</div>
				<div className='form-group '>
					<label
						htmlFor='productImg'
						className='form-label mt-4 row'
					>
						Product Image
					</label>
					<input
						type='text'
						className='form-control w-50 row'
						id='productImg'
						placeholder='Enter product image address'
					></input>
				</div>
				<div
					className='form-group mt-4 mb-4 mr-4'
					style={{ textAlign: 'justify' }}
				>
					<button type='submit' className='btn btn-primary row'>
						Add product to list
					</button>
				</div>
			</fieldset>
		</form>
	);
};

export default AddProduct;
