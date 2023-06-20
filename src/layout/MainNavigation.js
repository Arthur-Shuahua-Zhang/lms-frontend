import * as React from "react";
import { Link } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import SchoolIcon from '@mui/icons-material/School';
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import GroupIcon from '@mui/icons-material/Group';

import classes from './MainNavigation.css';



import { Typography, useTheme } from '@mui/material';



function MainNavigation(props) {
	const [value, setValue] = React.useState(0);

	// Inside your component
	const theme = useTheme();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<BottomNavigation
			sx={{ width: '100vw', bgcolor: '#f4e3ff' , boxShadow: 2}}
			showLabels
			value={value}Í
			onChange={handleChange}
			className={classes.container}
		>
			<BottomNavigationAction
				label="MenuTree"
				value="menutree"
				icon={<WidgetsOutlinedIcon />}
			/>

			<span className="spacer"></span>

			<BottomNavigationAction
				component={Link}
				to="/usermanagement"
				label="User Management"
				value="User Management"
				icon={<GroupIcon />}
			/>

			<BottomNavigationAction
				component={Link}
				to="/course"
				label="Course"
				value="Course"
				icon={<SchoolIcon />}
			/>

			<BottomNavigationAction
				component={Link}
				to="/signup"
				label="SignUp"
				value="signup"
				icon={<AppRegistrationOutlinedIcon />}
			/>

			<BottomNavigationAction
				component={Link}
				to="/signin"
				label="SignIn"
				value="signin"
				icon={<LoginOutlinedIcon />}
			/>




		</BottomNavigation>
	);
}

export default MainNavigation;
