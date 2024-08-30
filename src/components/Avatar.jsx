import { Button } from "antd";
import React, { useCallback } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Avatar() {
	const [cookies] = useCookies();
	const { logout } = useAuth();
	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle avatar placeholder"
			>
				<div className="w-10 bg-neutral text-neutral-content rounded-full">
					<span>{cookies.user.name[0]}</span>
				</div>
			</div>
			<div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-3">
				<p className="text-sm text-center m-2">
					{"Hello, " + cookies.user.name + "!"}
				</p>
				<Link to="/profile">
					<Button type="dashed" block>
						Profile
					</Button>
				</Link>
				<Link to={"/map-test"}>
					<Button type="dashed" block>
						Map Test
					</Button>
				</Link>
				<div>
					<Button type="dashed" block onClick={logout}>
						Logout
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Avatar;
