import React from "react";
import {Container, Typography, Button, Grid} from "@material-ui/core";
import "./cart.styles.scss";
import  CartItem from "../cart-item/cart-item.component";
import {Link} from "react-router-dom";

const Cart = ({cart, handleUpdateCartQuantity,handleRemoveFromCart,handleEmptyCart}) => {
	
	const EmptyCart = () => (
		<Typography variant="subtitle">You have no items in your shopping cart
			<Link to="/" className="link"> start adding some.</Link>
		</Typography>
	);
	
	const FilledCart = ()=> (
		<div>
			<Grid container spacing={3}>
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={12} md={6} lg={4} key={item.id}>
						<CartItem item={item} handleUpdateCartQuantity={handleUpdateCartQuantity} handleRemoveFromCart={handleRemoveFromCart}/>
					</Grid>
				))}
			</Grid>
			<div className="cardDetails">
				<Typography variant="h4">
					Subtotal: {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button className="emptyButton" size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
					<Button component={Link} to="/checkout" className="checkoutButton" size="large" type="button" variant="contained" color="primary">Checkout</Button>
				</div>
			</div>
		</div>
	);
	
	if(!cart.line_items) return "Loading...";
	
	return (
		<Container>
			<div className="toolbar" />
			<Typography className="title" variant="h3" gutterbottom>
				Your Shopping Cart
			</Typography>
			{ !cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	)
};

export default Cart;