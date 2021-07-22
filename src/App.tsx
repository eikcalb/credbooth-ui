import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

type IServiceCategory = "data" | "airtime" | "electricity-bill" | "tv-subscription"

interface ITransactionInitiate {
	type: string
	productID: number
	amount: number
	customerid: string
	phone: string
}

interface IResponse {
	status: 1 | 2
	message: string | string[]
	error: string
	data: any
}

const API_ENDPOINT = "https://credbillpayment-j5ncn.ondigitalocean.app/"

function App() {
	const [token, setToken] = useState(localStorage.getItem("bearerToken") || "")
	const [step, setStep] = useState<"category" | "product" | "purchase" | "confirm">("category")
	const [selectedCategory, setSelectedCategory] = useState<IServiceCategory | undefined>()
	const [selectedProvider, setSelectedProvider] = useState()
	const [selectedProduct, setSelectedProduct] = useState()
	const [requestRef, setRequestRef] = useState()
	const [cardToken, setCardToken] = useState()

	const [providers, setProviders] = useState<any[]>([])
	const [products, setProducts] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({ phone: '', customerid: '', amount: '' })

	const fetchProviders = async (category: IServiceCategory) => {
		try {
			const { status, data: response } = await axios.get<IResponse>(`${API_ENDPOINT}billpayment/providers/${category}`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (status !== 200 || response.status === 2) {
				throw new Error(response.message && typeof response.message !== 'string' ? response.message.join('. ') : response?.message)
			}

			return response.data
		} catch (e) {
			alert("\u26A0 " + e.message || "Failed to get providers")
			console.error(e)
		}
	}

	const fetchProducts = async (providerID: number) => {
		try {
			const { status, data: response } = await axios.get<IResponse>(`${API_ENDPOINT}billpayment/products/${providerID}`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (status !== 200 || response.status === 2) {
				throw new Error(response.message && typeof response.message !== 'string' ? response.message.join('. ') : response?.message)
			}

			return response.data
		} catch (e) {
			alert("\u26A0 " + e.message || "Failed to get products")
			console.error(e)
		}
	}

	const initiateTransaction = async (data: ITransactionInitiate) => {
		try {
			const { status, data: response } = await axios.post<IResponse>(`${API_ENDPOINT}billpayment/validate`, data,
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			)

			if (status !== 200 || response.status === 2) {
				throw new Error(response.message && typeof response.message !== 'string' ? response.message.join('. ') : response?.message)
			}

			return response.data
		} catch (e) {
			alert("\u26A0 " + e.message || "Failed to initiate transaction")
			console.error(e)
		}
	}

	const confirmTransaction = async (requestID: number, cardID: number) => {
		try {
			if (!requestRef || !cardID) {
				throw new Error("Required info was omitted")
			}
			const { status, data: response } = await axios.post<IResponse>(`${API_ENDPOINT}billpayment/pay`, {
				requestID,
				cardID
			}, {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (status !== 200 || response.status === 2) {
				throw new Error(response.message && typeof response.message !== 'string' ? response.message.join('. ') : response?.message)
			}

			alert("\u2705 " + response.message)
			return response.data
		} catch (e) {
			alert("\u26A0 " + e.message || "Failed to initiate transaction")
			console.error(e)
		}
	}

	return (
		<div className="container">
			<div className="section">
				<div className='field'>
					<label className="label is-uppercase">Bearer Token</label>
					<p className="control">
						<input className="input" type="password" value={token} placeholder="Enter Bearer token" onChange={(e) => {
							setToken(e.target.value)
							localStorage.setItem("bearerToken", e.target.value)
						}} />
					</p>
				</div>
				{loading ?
					<progress className="progress is-small is-danger" max="100"></progress>
					:
					<>
						{step === 'category' && (
							<select value={selectedCategory} onChange={(e) => {
								setLoading(true)
								setSelectedCategory(e.target.value as IServiceCategory)
								if (!e.target.value) {
									return
								}
								fetchProviders(e.target.value as IServiceCategory)
									.then((providers) => {
										setProviders(providers)
										setStep('product')
									}).finally(() => setLoading(false))
							}} >
								<option>Select Service</option>
								<option value='airtime'>Airtime</option>
								<option value='data'>Data</option>
								<option value='tv-subscription'>TV Subscription</option>
								<option value='electricity-bill'>Electricity Bill</option>
							</select>
						)}
						{(step === 'product' && providers?.length > 0) && (
							<select value={selectedProvider} onChange={(e) => {
								setLoading(true)
								setSelectedProvider(e.target.value as any)
								if (!e.target.value) {
									return
								}
								fetchProducts(parseInt(e.target.value))
									.then((products) => {
										setProducts(products)
										setStep('purchase')
									}).finally(() => setLoading(false))
							}} >
								<option>Select Provider</option>
								{providers.map((p) => (<option value={p.id}>{p.name}</option>))}
							</select>
						)}
						{(step === 'purchase' && products?.length > 0) && (
							<>
								{selectedCategory === 'airtime' && (
									<form onSubmit={(e) => {
										e.preventDefault()
										e.stopPropagation()

										setLoading(true)
										const provider = providers.find((item) => item.id === parseInt(selectedProvider as any))
										if (!provider) {
											alert("\u26A0 Failed to process request")
											console.log("Cannot find provider", providers, selectedProvider, providers.find((item) => item.id === selectedProvider))
											setLoading(false)
											return
										}
										initiateTransaction({ ...form, amount: parseInt(form.amount) * 100, type: selectedCategory, productID: provider.code })
											.then((id) => {
												setRequestRef(id)
												setStep('confirm')
											})
											.finally(() => setLoading(false))
									}} className='section'>
										<div className="field">
											<p className="control">
												<input required className="input" type="tel" value={form.customerid} onChange={(e) => setForm({ ...form, customerid: e.target.value })} placeholder="Phone number to recharge" />
											</p>
										</div>
										<div className="field has-addons">
											<p className="control">
												<a className="button is-static">
													&#x20A6;
												</a>
											</p>
											<p className="control is-expanded">
												<input required className="input" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount to recharge" />
											</p>
										</div>

										<div className="field has-addons">
											<p className="control">
												<a className="button is-static">
													+234
												</a>
											</p>
											<p className="control is-expanded">
												<input required className="input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Contact phone number" />
											</p>
										</div>
										<p className='control'>
											<button type='submit' className='button is-primary'>Submit</button>
										</p>
									</form>
								)}
								{selectedCategory !== 'airtime' && (
									<>
										{!selectedProduct &&
											<select value={selectedProvider} onChange={(e) => {
												setSelectedProduct(e.target.value as any)
											}} >
												{products.map((p) => (<option value={p.code}>{p.name}</option>))}
											</select>
										}
										{selectedProduct &&
											<form onSubmit={(e) => {
												e.preventDefault()
												e.stopPropagation()

												setLoading(true)
												initiateTransaction({ ...form, amount: parseInt(form.amount) * 100, type: selectedCategory as any, productID: selectedProduct as any })
													.then((id) => {
														setRequestRef(id)
														setStep('confirm')
													})
													.finally(() => setLoading(false))
											}} className='section'>
												<div className="field">
													<p className="control">
														<input required className="input" type="text" value={form.customerid} onChange={(e) => setForm({ ...form, customerid: e.target.value })} placeholder="Enter customer details" />
													</p>
												</div>
												<div className="field has-addons">
													<p className="control">
														<a className="button is-static">
															&#x20A6;
														</a>
													</p>
													<p className="control is-expanded">
														<input required className="input" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount to pay" />
													</p>
												</div>

												<div className="field has-addons">
													<p className="control">
														<a className="button is-static">
															+234
														</a>
													</p>
													<p className="control is-expanded">
														<input required className="input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Contact phone number" />
													</p>
												</div>
												<p className='control'>
													<button type='submit' className='button is-primary'>Submit</button>
												</p>
											</form>
										}
									</>
								)}
							</>
						)}
						{(step === 'confirm' && requestRef) && (
							<form onSubmit={(e) => {
								e.preventDefault()
								e.stopPropagation()

								setLoading(true)
								confirmTransaction(requestRef as any, cardToken as any)
									.finally(() => setLoading(false))
							}} className='section'>
								<div className="field">
									<label>Enter Card Token For Payment</label>
									<p className="control is-expanded">
										<input required className="input" type="number" value={`${cardToken}`} onChange={(e) => setCardToken(parseInt(e.target.value) as any)} placeholder="Enter Card Token" />
									</p>
								</div>
								<p className='control'>
									<button type='submit' className='button is-primary'>Submit</button>
								</p>
							</form>
						)}
					</>
				}
			</div>
		</div>
	);
}

export default App;
