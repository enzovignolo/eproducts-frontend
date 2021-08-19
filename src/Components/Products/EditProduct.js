import { React, useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AppContext from '../../AppContext';
import axios from 'axios';
import envVars from '../../envVars';
const EditProduct = (props) => {
	//GETTING CONTEXT
	const userSettings = useContext(AppContext);
	console.log(userSettings);
	//Hook to grab the id from the parent component
	const { id } = useParams();
	//Hook to redirect after edit
	const history = useHistory();
	//States to manage the inputs
	const [product, setProduct] = useState('');
	const [productName, setProductName] = useState('');
	const [productPrice, setProductPrice] = useState('');
	const [productImg, setProductImg] = useState('');
	//Hook to look for the product to edit
	useEffect(() => {
		const fetchData = async () => {
			const results = await axios(
				`${envVars.apiHost}/productos/${id}`
			);

			setProduct(results.data);
			setProductName(results.data.name);
			setProductPrice(results.data.price);
			setProductImg(results.data.thumbnail);
		};
		fetchData();
	}, []);
	//Function to make submit the edit
	const onEditSubmit = async (event) => {
		event.preventDefault();
		const result = await axios({
			method: 'PUT',
			url: `${envVars.apiHost}/productos/${id}`,
			data: {
				name: productName,
				price: productPrice,
				thumbnail: productImg,
			},
			headers: {
				user: userSettings.userId,
			},
		});
		history.push('/');
	};
	if (product) {
		return (
			<form onSubmit={onEditSubmit}>
				<fieldset className='container '>
					<div className='form-group'>
						<label
							htmlFor='productName'
							className='form-label mt-4 row'
						>
							Name
						</label>
						<input
							type='text'
							className='form-control w-25 row'
							id='productName'
							value={productName}
							onChange={(e) =>
								setProductName(e.target.value)
							}
						></input>
					</div>
					<div className='form-group'>
						<label
							htmlFor='productPrice'
							className='form-label mt-4 row'
						>
							Price
						</label>
						<input
							type='number'
							min='0'
							step='0.01'
							className='form-control w-25 row'
							id='productPrice'
							value={productPrice}
							onChange={(e) =>
								setProductPrice(e.target.value)
							}
						></input>
					</div>
					<div className='form-group'>
						<label
							htmlFor='productImg'
							className='form-label mt-4 row'
						>
							Thumbnail
						</label>
						<input
							type='text'
							className='form-control w-25 row'
							id='productImg'
							value={productImg}
							onChange={(e) => setProductImg(e.target.value)}
						></input>
					</div>
					<div
						className='form-group'
						style={{ textAlign: 'justify', margin: '1% 0' }}
					>
						<button
							type='submit'
							className='btn btn-primary row'
						>
							Edit product
						</button>
					</div>
				</fieldset>
			</form>
		);
	} else return <h1></h1>;
};

export default EditProduct;
