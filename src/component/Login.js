import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import "./login.css";
import axios from "axios";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { withAppContext } from "../Context/index";

function Login({ onFinish, onFinishFailed, logError, loading,...props }) {
	useEffect(() => {
        if (localStorage.getItem('token')) {
            props.history.push('/List')
        }
    }, [])
	return (
		<div className="LoginPage">
			<div className="loginFormDiv">
				<h2>LOGIN</h2>
				{logError ? <Alert message="Invalid Email Password" type="error" /> : null}
				<Form
					className="form"
					name="basic"
					labelCol={{
						span: 8
					}}
					wrapperCol={{
						span: 16
					}}
					initialValues={{
						remember: true
					}}
					onFinish={(values)=>onFinish(values,props)}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your email!"
							}
						]}
					>
						<Input type="email" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!"
							}
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16
						}}
					>
						<Button type="primary" htmlType="submit" disabled={loading}>
							{loading ? "loading" : "Submit"}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}

export default withAppContext(withRouter(Login));
