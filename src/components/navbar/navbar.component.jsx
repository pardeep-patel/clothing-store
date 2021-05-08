import React from "react";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import "./navbar.styles.scss";
import icon from '../../assets/images/icon.png';
import {Link, useLocation} from "react-router-dom";


const Navbar = ({totalItems}) => {
	const location = useLocation();

	return (
		<div>
			<AppBar positon="fixed" className="appBar" color="inherit">
				<Toolbar>
					<Typography component={Link} to="/" variant="h6" className="title" color="inherit">
						<img src={icon} alt="Shop" height="25px" className="image"/>
						Clothing Store
					</Typography>
					<div className="grow" />
					
					{location.pathname == "/" &&(
					<div className="button">
						<IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
							<Badge badgeContent={totalItems} color="secondary">
								<ShoppingCart />
							</Badge>
						</IconButton>
					</div>)}
					
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar;