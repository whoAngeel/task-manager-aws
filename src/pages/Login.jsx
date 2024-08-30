import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

function Login() {
	const { form } = Form.useForm();

	const onFinish = (values) => {
		console.log(values);
	};
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div className="w-10/12 sm:w-10/12 md:w-5/12 bg-base-100 rounded-lg py-4  ">
				<h2 className="text-3xl font-bold text-center">Log In</h2>
				<Form
					layout="vertical"
					className="m-5"
					form={form}
					onFinish={onFinish}
				>
					<Form.Item
						required
						tooltip=""
						name={"email"}
						label={<Typography>Email:</Typography>}
						rules={[
							{
								required: true,
								message: "Please enter your email",
							},
							{
								whitespace: true,
								message: "The field must not be empty",
							},
							{
								type: "email",
								message: "Please enter a valid email",
							},
						]}
					>
						<Input placeholder="usuario@example.com" />
					</Form.Item>
					<Form.Item
						required
						name={"password"}
						label={<Typography>Password:</Typography>}
						rules={[
							{
								required: true,
								message: "Please enter your password",
							},
						]}
					>
						<Input.Password placeholder="************" />
					</Form.Item>
					<Form.Item>
						<Button block type="primary" htmlType="submit">
							Continue
						</Button>
					</Form.Item>
					<div className="text-xs text-right">
						<span>
							Don't have an account?{" "}
							<Link to={"/register"}>Register Here</Link>
						</span>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default Login;
