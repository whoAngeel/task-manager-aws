import { Form, Input } from "antd";
import React from "react";
import { useTask } from "../context/TaskContext";
function TaskForm() {
	const [form] = Form.useForm();
	const { pushTask } = useTask();
	const onFinish = (values) => {
		pushTask(form.getFieldValue("title"));
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
						variant="outlined"
						size="middle"
						allowClear
						showCount
						maxLength={30}
					></Input>
				</Form.Item>
			</Form>
		</div>
	);
}

export default TaskForm;
