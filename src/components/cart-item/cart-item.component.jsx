import React from "react";
import { Typography, Button, Card, CardActions, CardContent, CardMedia} from "@material-ui/core";
import "./cart-item.styles.scss";

const CartItem = ({item, handleUpdateCartQuantity, handleRemoveFromCart}) => {
	return (
		<Card>
			<CardMedia className="media" image={item.media.source} alt={item.name}/>
			
			<CardContent className="cardContent">
				<Typography variant="h4">{item.name}</Typography>
				<Typography variant="h4">{item.line_total.formatted_with_symbol}</Typography>
			</CardContent>
			
			<CardActions className="cardActions">
				<div className="buttons">
					<Button type="button" size="small" onClick={()=> handleUpdateCartQuantity(item.id,item.quantity -1)}>-</Button>
					<Typography>{item.quantity}</Typography>
					<Button type="button" size="small" onClick={()=> handleUpdateCartQuantity(item.id,item.quantity+1)}>+</Button>
				</div>
				<Button variant="contained" type="button" color="secondary" onClick={()=> handleRemoveFromCart(item.id)}>Remove</Button>
			</CardActions>
			
		</Card>
	)
};

export default CartItem;