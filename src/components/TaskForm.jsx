import { Form, Input } from "antd";
import React, { useState } from "react";
import { useTask } from "../context/TaskContext";
import axios from "axios";
import { useCookies } from "react-cookie";
function TaskForm() {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const { pushTask } = useTask();
	const [cookies] = useCookies(["user"]);
	const onFinish = async (values) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/users/${
					cookies.user?.userId
				}/tasks`,
				{ title: values.title }
			);
			console.log(response.data);
			pushTask(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
		form.setFieldValue("title", "");
	};

	return (
		<div className="">
			<Form form={form} onFinish={onFinish}>
				<Form.Item
					form={form}
					name="title"
					validateStatus="success"
					rules={[
						{ required: true, message: "Please input your title!" },
						{ whitespace: true, message: "Title cannot be empty" },
					]}
				>
					<Input
						placeholder="Title"
						disabled={isLoading}
						variant="outlined"
						size="middle"
						allowClear
						showCount
						maxLength={50}
					></Input>
				</Form.Item>
			</Form>
		</div>
	);
}

export default TaskForm;
