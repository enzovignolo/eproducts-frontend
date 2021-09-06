import { React, useContext, useState } from 'react';
import AppContext from '../../AppContext';
import Products from './Products';
const FilterProduct = () => {
	const value = useContext(AppContext);
	const [filter, setFilter] = useState({});
	const onFilterSearch = (e) => {
		e.preventDefault();
		setFilter(e);
	};
	return (
		<div>
			<h2 className='mt-3 mx-4' style={{ textAlign: 'left' }}>
				Search
			</h2>
			<div className='d-flex'>
				<form id='filter-form' onSubmit={onFilterSearch}>
					<div className='form-row row mt-1 m-3'>
						<div className='form-group col-sm-5'>
							<label for='productName'>Name</label>
							<input
								type='text'
								name='name'
								className='form-control'
							></input>
						</div>
						<div className='form-group col-sm-3'>
							<label for='productPrice'>Price Range</label>
							<div className='input-group'>
								<input
									type='number'
									step='1'
									name='minPrice'
									className='form-control w-25'
									placeholder='min'
								></input>
								<span className='input-group-text'>-</span>
								<input
									type='number'
									step='1'
									className='form-control w-25'
									name='maxPrice'
									placeholder='max'
								></input>
							</div>
						</div>
					</div>
					<div className='form-row row m-3'>
						<div className='form-group col-sm-5'>
							<label for='productCategory'>Category</label>
							<input
								type='text'
								name='category'
								className='form-control'
							></input>
						</div>
						<div className='form-group col-sm-3'>
							<label for='productStock'>Stock range</label>
							<div className='input-group'>
								<input
									type='number'
									step='1'
									name='minStock'
									className='form-control'
									placeholder='min'
								></input>
								<span className='input-group-text'>
									{' '}
									-{' '}
								</span>
								<input
									type='number'
									step='1'
									name='maxStock'
									className='form-control'
									placeholder='max'
								></input>
							</div>
						</div>
					</div>
					<div className='form-row row m-3'>
						<div className='form-group col-sm-5'>
							<select
								className='form-select form-select form-control'
								name='orderBy'
								aria-label='.form-select-lg '
							>
								<option selected value={false}>
									Sort By
								</option>
								<option value='{"price":"desc"}'>
									Higher price
								</option>
								<option value='{"price":"asc"}'>
									Lower price
								</option>
								<option value='{"stock":"desc"}'>
									Higher Stock
								</option>
								<option value='{"stock":"asc"}'>
									Lower Stock
								</option>
							</select>
						</div>
					</div>
					<button className='btn btn-info' type='submit'>
						Apply Filter
					</button>
				</form>
			</div>
			<Products query={{ ...filter }}></Products>
		</div>
	);
};

export default FilterProduct;
