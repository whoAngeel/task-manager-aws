import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, redirect } from "react-router-dom";

function Register() {
	const [form] = Form.useForm();
	const [clientReady, setClientReady] = useState(false);
	const { register: registerHandler, isLoading } = useAuth();

	useEffect(() => {
		setClientReady(true);
	}, []);
	const register = (values) => {
		// console.log(values);
		registerHandler(values);
	};
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="w-10/12 sm:w-10/12 md:w-5/12 bg-base-100 rounded-lg py-4">
				<h3 className="text-3xl font-bold text-center">Register</h3>
				<Form
					form={form}
					layout="vertical"
					onFinish={register}
					className="m-5"
				>
					<Form.Item
						label="Name:"
						required
						name={"name"}
						rules={[
							{
								required: true,
								message: "Please input your full name!",
							},
							{
								whitespace: true,
								message: "The field must not be empty",
							},
							{
								pattern:
									/^[a-zA-Z\u00E0-\u00FC\u00F1\u00D1]+( [a-zA-Z\u00E0-\u00FC\u00F1\u00D1]+)*$/,
								message: "The input is not a valid full name",
							},
						]}
					>
						<Input placeholder="Name" />
					</Form.Item>

					<Form.Item
						label="Email:"
						required
						name={"email"}
						rules={[
							{
								required: true,
								message: "Please input your email!",
							},
							{
								whitespace: true,
								message: "The field cannot be empty",
							},
							{
								type: "email",
								message: "The input is not valid email!",
							},
						]}
					>
						<Input placeholder="user@example.com" type="email" />
					</Form.Item>

					<Form.Item
						label="Password:"
						required
						tooltip="The password must contain at least 6 characters, at least one number"
						name={"password"}
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
							{
								min: 6,
								message:
									"The password must contain at least 6 characters",
							},
							{
								pattern: /^(?=.*[0-9])[a-zA-Z0-9]+$/,
								message:
									"The password must contain at least one number",
							},
						]}
					>
						<Input.Password placeholder="password" />
					</Form.Item>
					<Form.Item shouldUpdate>
						{() => (
							<Button
								type="primary"
								block
								loading={isLoading}
								htmlType="submit"
								disabled={
									!clientReady ||
									!form.isFieldsTouched(true) ||
									!!form
										.getFieldsError()
										.filter(({ errors }) => errors.length).length
								}
							>
								{isLoading ? (
									<span>Registering...</span>
								) : (
									"Register"
								)}
							</Button>
						)}
					</Form.Item>
					<div className="text-xs text-right">
						<span>
							Do you already have an account?{" "}
							<Link to={"/login"}>Log in here</Link>
						</span>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default Register;
