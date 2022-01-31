import React, { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios"
export const AppContext = createContext();

export const withAppContext = (Component) => (props) =>
	<AppContext.Consumer>{(value) => <Component {...value} {...props} />}</AppContext.Consumer>;

const AppProvider = ({ children }) => {
	const [logError, setLogError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState(() => {
		return localStorage.getItem('token')
	})
	const onFinish = (values, props) => {
		setLoading(true);
		// var axios = require('axios');
		var data = JSON.stringify(values);

		var config = {
			method: "post",
			url: "https://api-ela-test.herokuapp.com/login",
			headers: {
				'Authorization': `Bearer ${token}`
			},
			data: data
		};

		axios(config)
			.then(function (response) {
				// console.log(response)
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("uid", response.data.user._id);
				props.history.push("/List");
				setLoading(false);
			})
			.catch(function (error) {
				setLogError(true);
				setLoading(false);
			});
	};

	const onFinishFailed = (errorInfo) => {
		// console.log("Failed:", errorInfo);
	};


	const [data, setData] = useState([])
	const [dataLoader, setDataLoader] = useState(false)

	const getPosts = () => {
		setDataLoader(true)
		let token = localStorage.getItem('token')
		// console.log(token)

		var config = {
			method: 'get',
			url: 'https://api-ela-test.herokuapp.com/posts/',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		};

		axios(config)
			.then(function (response) {
				setData(response.data);
				setDataLoader(false)
			})
			.catch(function (error) {
				setDataLoader(false)
				// console.log(error);
			});

	}

	const [singleData, setSingleData] = useState({})
	const [singleDataLoader, setSingleDataLoader] = useState(false)


	const getSingle = (id) => {
		setSingleDataLoader(true)
		let token = localStorage.getItem('token')
		// console.log(token)

		var config = {
			method: 'get',
			url: `https://api-ela-test.herokuapp.com/posts/${id}`,
			headers: {
				'Authorization': `Bearer ${token}`
			}
		};

		axios(config)
			.then(function (response) {
				setSingleDataLoader(false)
				setSingleData(response.data);
			})
			.catch(function (error) {
				setSingleDataLoader(false)
				// console.log(error);
			});
	}


	const onUpdate = (obj, handleOk, clearState) => {
		let token = localStorage.getItem('token')
		// console.log(token)

		var config = {
			method: 'patch',
			url: `https://api-ela-test.herokuapp.com/posts/${obj._id}`,
			headers: {
				'Authorization': `Bearer ${token}`
			},
			data: obj
		};

		axios(config)
			.then(function (response) {
				getPosts()
				handleOk()
				clearState()

			})
			.catch(function (error) {
				// console.log(error);
			});
	};

	const deletePost = (id) => {
		let token = localStorage.getItem('token')
		// console.log(token)

		var config = {
			method: 'delete',
			url: `https://api-ela-test.herokuapp.com/posts/${id}`,
			headers: {
				'Authorization': `Bearer ${token}`
			},
		};

		axios(config)
			.then(function (response) {
				getPosts()

			})
			.catch(function (error) {
				// console.log(error);
			});
	};




	
	const addPost = (obj, handleOk, clearState) => {
		let token = localStorage.getItem('token')
		// console.log(token)

		var config = {
			method: 'post',
			url: `https://api-ela-test.herokuapp.com/posts/`,
			headers: {
				'Authorization': `Bearer ${token}`
			},
			data: obj
		};

		axios(config)
			.then(function (response) {
				getPosts()
				handleOk()
				clearState()

			})
			.catch(function (error) {
				// console.log(error);
			});
	};

		
	const logout = (props) => {
		localStorage.removeItem("uid")
		localStorage.removeItem("token")
		props.history.push('/')
	};


	return (
		<AppContext.Provider
			value={{
				onFinish,
				onFinishFailed,
				logError,
				loading,
				data,
				getSingle,
				singleData,
				onUpdate,
				getPosts,
				dataLoader,
				singleDataLoader,
				addPost,
				deletePost,
				logout
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
