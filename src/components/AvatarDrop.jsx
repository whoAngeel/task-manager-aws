import { Avatar, Dropdown, Typography } from "antd";
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Avatar2() {
	const [cookies] = useCookies();
	const { logout } = useAuth();
	const items = [
		{
			key: "1",
			label: <Typography.Text strong>{cookies.user.name}</Typography.Text>,
		},
		{
			type: "divider",
		},

		{
			key: "2",
			label: (
				<Link to={"/profile"}>
					<span>Profile</span>
				</Link>
			),
		},
		{
			key: "3",
			danger: true,
			label: <a onClick={logout}>Log out</a>,
		},
	];
	return (
		<Dropdown menu={{ items: items }}>
			<Avatar
				size={{
					xs: 32,
					sm: 32,
					md: 40,
					lg: 64,
					xl: 64,
					xxl: 100,
				}}
				className="bg-secondary"
			>
				{cookies.user.name[0]}
			</Avatar>
		</Dropdown>
	);
}

export default Avatar2;
