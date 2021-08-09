import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

type IServiceCategory = "data" | "airtime" | "electricity-bill" | "tv-subscription"

interface ITransactionInitiate {
	type: string
	productID: number
	amount: number
	customerid: string
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
	const [cardToken, setCardToken] = useState("")

	const [providers, setProviders] = useState<any[]>([])
	const [products, setProducts] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({ customerid: '', amount: '' })

	const timer = useRef<undefined | number>()

	const fetchProviders = async (category: IServiceCategory) => {
		try {
			const { status, data: response } = await axios.get<IResponse>(`${API_ENDPOINT}billpayment/categories/${category}`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (response.status === 2) {
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
			const { status, data: response } = await axios.get<IResponse>(`${API_ENDPOINT}billpayment/providers/${providerID}/products`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (response.status === 2) {
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

			if (response.status === 2) {
				throw new Error(response.message && typeof response.message !== 'string' ? response.message.join('. ') : response?.message)
			}

			return response.data
		} catch (e) {
			alert("\u26A0 " + e.message || "Failed to initiate transaction")
			console.error(e)
			throw e
		}
	}

	const confirmTransaction = async (requestID: number, cardID: number): Promise<{ id: number, reference: string }> => {
		try {
			if (!requestRef || !cardID) {
				throw new Error("Required info was omitted")
			}
			const { status, data: response } = await axios.post<IResponse>(`${API_ENDPOINT}billpayment/confirm`, {
				requestID,
				cardID
			}, {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (response.status === 2) {
				throw new Error(response.message && typeof response.message !== 'string' ? response.message.join('. ') : response?.message)
			}
			if (!response.data) {
				throw new Error("Failed to process request")
			}
			return response.data
		} catch (e) {
			alert("\u26A0 " + e.message || "Failed to initiate transaction")
			console.error(e)
			throw e
		}
	}

	const makePayment = async (type: "token" | "card" | "wallet", transaction: string, cardid: number): Promise<{ id: number, reference: string } | undefined> => {
		try {
			if (!transaction || !cardid) {
				throw new Error("Required info was omitted")
			}
			let endpoint: string
			switch (type) {
				case "card":
					endpoint = 'payment/paywithcard'
					break
				case "token":
					endpoint = 'payment/paywithtoken'
					break
				case "wallet":
					endpoint = 'payment/paywithwallet'
					break
			}
			const { data: response } = await axios.post<IResponse>(`${API_ENDPOINT}${endpoint}`, {
				transactionreference: transaction,
				servicename: "BILL_PAYMENT",
				cardid
			}, {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (response.status === 2) {
				throw new Error(response.message && typeof response.message !== 'string' ? response.message.join('. ') : response?.message)
			}
			alert("\u2705 " + "Purchase successful")
			return response.data
		} catch (e) {
			alert("\u26A0 " + e.message || "Failed to initiate transaction")
			console.error(e)
			throw e
		}
	}

	return (
		<div className="container is-vcentered pt-6">
			<div className='card'>
				<div className='card-content'>
					<div className="section">
						<div className='field'>
							<label className="label is-uppercase is-size-5">Bearer Token</label>
							<p className="control">
								<input autoFocus className="input" type="password" value={token} placeholder="Enter Bearer token" onChange={(e) => {
									setToken(e.target.value)
									localStorage.setItem("bearerToken", e.target.value)
									clearTimeout(timer.current)
									timer.current = setTimeout(() => alert("\u2705 Auth Token Updated!"), 800) as any
								}} />
							</p>
						</div>
						{loading ?
							<progress className="progress is-small is-danger" max="100"></progress>
							:
							<>
								{step === 'category' && (
									<div className='select'>
										<select value={selectedCategory} onChange={(e) => {
											if (!e.target.value) {
												return
											}
											setLoading(true)
											setSelectedCategory(e.target.value as IServiceCategory)

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
									</div>
								)}
								{(step === 'product' && providers?.length > 0) && (
									<div className='select'>
										<select value={selectedProvider} onChange={(e) => {
											if (!e.target.value) {
												return
											}
											setLoading(true)
											setSelectedProvider(e.target.value as any)

											fetchProducts(parseInt(e.target.value))
												.then((products) => {
													setProducts(products)
													setStep('purchase')
												}).finally(() => setLoading(false))
										}} >
											<option>Select Provider</option>
											{providers.map((p) => (<option value={p.id}>{p.name}</option>))}
										</select>
									</div>
								)}
								{(step === 'purchase' && products?.length > 0) && (
									<>
										{!selectedProduct &&
											<div className='select'>
												<select value={selectedProduct} onChange={(e) => {
													if (!e.target.value) {
														return
													}
													setLoading(true)
													const query = parseInt(e.target.value)
													const product = products.find(p => p.id === query)
													if (!product) {
														setLoading(false)
														return
													}
													setForm({ ...form, amount: product.amount })
													setSelectedProduct(product)
													setLoading(false)
												}}>
													<option>Select Product</option>
													{products.map((p) => (<option value={p.id} key={p.id}>{p.name}</option>))}
												</select>
											</div>
										}
										{(selectedCategory === 'airtime' && selectedProduct) && (
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
												initiateTransaction({ ...form, amount: parseFloat(form.amount), type: selectedCategory, productID: (selectedProduct as any).id })
													.then(({ id }) => {
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
												<p className='control'>
													<button type='submit' className='button is-primary'>Submit</button>
												</p>
											</form>
										)}
										{(selectedCategory !== 'airtime' && selectedProduct) && (

											<form onSubmit={(e) => {
												e.preventDefault()
												e.stopPropagation()

												setLoading(true)
												initiateTransaction({ ...form, amount: parseFloat(form.amount), type: selectedCategory as any, productID: (selectedProduct as any).id })
													.then(({ id, customerName }) => {
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
														<input required className="input" type="number" value={form.amount} readOnly={parseInt((selectedProduct as any)?.amount || "0") > 0} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount to pay" />
													</p>
												</div>
												<p className='control'>
													<button type='submit' className='button is-primary'>Submit</button>
												</p>
											</form>
										)}
									</>
								)}
								{(step === 'confirm' && requestRef) && (
									<form onSubmit={(e) => {
										e.preventDefault()
										e.stopPropagation()
										if (!cardToken) {
											throw new Error("Token must be provided")
										}
										setLoading(true)
										confirmTransaction(requestRef as any, cardToken as any)
											.then(({ reference }) => makePayment("token", reference, parseInt(cardToken)))
											.then(() => {
												const restart = window.confirm("Process another transaction?");
												if (restart) {
													window.location.reload();
												}
											})
											.catch(e => console.error(e))
											.finally(() => setLoading(false))
									}} className='section has-text-centered'>
										<div className="field">
											<label>Enter Card Token For Payment</label>
											<p className="control is-expanded">
												<input required className="input" type="number" value={`${cardToken}`} onChange={(e) => setCardToken(parseInt(e.target.value) as any)} placeholder="Enter Card Token" />
											</p>
										</div>
										<p className='control is-expanded'>
											<button type='submit' className='button is-primary'>Pay</button>
										</p>
									</form>
								)}
							</>
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
