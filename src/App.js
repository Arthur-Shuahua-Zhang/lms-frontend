import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Course from "./pages/Courses";
import MainNavigation from "./layout/MainNavigation";
import Users from "./pages/Users";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Navigate to="/signin" />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/course" element={<Course />} />
				<Route path="/usermanagement" element={<Users />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	);
}

export default App;
