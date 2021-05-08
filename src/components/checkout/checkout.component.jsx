import React, {useState, useEffect} from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";
import "./checkout.styles.scss";
import AddressForm from "../address-form/address-form.component";
import PaymentForm from "../payment-form/payment-form.component";
import {commerce} from "../../lib/commerce";
import {Link} from "react-router-dom";

const steps = ["Shipping adress","Payment details"];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
	const [activeStep,setActiveStep] = useState(0)
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});
	
	useEffect(()=>{
		const generateToken = async () =>{
			try{
				const token = await commerce.checkout.generateToken(cart.id, {type:"cart"});
				setCheckoutToken(token);
			} catch(error){
				console.log(error);
			}		
		}
		
		generateToken();
	},[]);
	
	const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

	const next = (data) => {
		setShippingData(data);
		nextStep();
	};
	
	const Confirmation = () =>{ return(
		<div>
			<Typography variant="h5">Thank you for your purchase</Typography>
			<Divider className="divider" />
		<Button variant="outlined" type="button" component={Link} to="/" > Back to Home</Button>
		</div>
	)};
	
	const Form = () => (
		activeStep === 0 
		? <AddressForm checkoutToken={checkoutToken} next={next}/> 
		: <PaymentForm shippingData={shippingData} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken}/>
		
	)
	
	return (
		<div>
			<div className="toolbar"/>
			<main className="layout">
				<Paper className="paper">
					<Typography variant="h4" align="center">Checkout</Typography>
					<Stepper activeStep={activeStep}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? Confirmation(): checkoutToken && <Form />}
				</Paper>
			</main>
		</div>
	)
}

export default Checkout;