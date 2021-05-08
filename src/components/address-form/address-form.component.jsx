import React, {useState, useEffect} from "react";
import { InputLabel, Select, MenuItem, Grid, Typography, Button} from "@material-ui/core";
import { useForm, FormProvider} from "react-hook-form";
import TextInput from "../text-field/text-field.component";
import { commerce } from "../../lib/commerce";
import {Link} from "react-router-dom";

const AddressForm = ({next, checkoutToken}) => {
	
	const [shippingCountries,setShippingCountries] = useState([]);
	const [shippingCountry,setShippingCountry] = useState("");
	
	const [shippingSubdivisions,setShippingSubdivisions] = useState([]);
	const [shippingSubdivision,setShippingSubdivision] = useState("");
	
	const [shippingOptions,setShippingOptions] = useState([]);
	const [shippingOption,setShippingOption] = useState("");

	const methods = useForm();

	const fetchShippingCountries = async (checkoutTokenId) => {
		const response = await commerce.services.localeListShippingCountries(checkoutTokenId);
		setShippingCountries(response.countries);
		setShippingCountry(Object.keys(response.countries)[0])
	}
	
	const fetchShippingSubdivisions = async (countryCode) => {
		const response = await commerce.services.localeListSubdivisions(countryCode);
		setShippingSubdivisions(response.subdivisions);
		setShippingSubdivision(Object.keys(response.subdivisions)[0]);
	}
	
	const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country, region});
		
		setShippingOptions(options);
		setShippingOption(options[0].id);
	}
	
	useEffect(() => (fetchShippingCountries(checkoutToken.id)),[]); 
	
	useEffect(() => {
		if(shippingCountry){
			fetchShippingSubdivisions(shippingCountry)
		}
	},[shippingCountry]);
	
	useEffect(() => {
		if(shippingSubdivision){
			fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
		}
		
	},[shippingSubdivision]);
	
	const countries = Object.entries(shippingCountries).map(([code,name]) => ({id:code, label:name}));
	const subdivisions = Object.entries(shippingSubdivisions).map(([code,name]) => ({id:code, label:name}));
	const options = shippingOptions.map((option) => ({id:option.id, label:`${option.description} - (${option.price.formatted_with_symbol})`}));
	
	return (
		<div>
			<Typography variant="h6" gutterBottom>Shipping Address</Typography>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
					<Grid container spacing={3}>
						<TextInput 
							required
							name="firstName"
							label="First name"
						/>
						<TextInput 
							required
							name="lastName"
							label="Last name"
						/>
						<TextInput 
							required
							name="address"
							label="Address"
						/>
						<TextInput 
							required
							name="email"
							label="Email"
						/>
						<TextInput 
							required
							name="city"
							label="City"
						/>
						<TextInput 
							required
							name="zip"
							label="ZIP / Postal Code"
						/>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
								{countries.map((country) =>(
								<MenuItem key={country.id} value={country.id}>
									{country.label}
								</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
								{subdivisions.map((subdivision) =>(
								<MenuItem key={subdivision.id} value={subdivision.id}>
									{subdivision.label}
								</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
								{options.map((option) =>(
								<MenuItem key={option.id} value={option.id}>
									{option.label}
								</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div style={{display:"flex", justifyContent:"space-between"}}>
						<Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
						<Button type="submit" variant="contained" color="primary">Next</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}

export default AddressForm;