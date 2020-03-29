import React, { Component } from "react";
import "../stylesheets/App.css";
import Header from "./Header";
import Search from "./Search";
import TableData from "./TableData";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
const getData = async () => (await axios.get("/api/user")).data


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false,
			data: [],
			searchText: "",
			editUserStatus: false,
			userEditObject: {},
			userObject: {}
		};
	}
	
	componentWillMount() {
		(async () =>{
			this.setState({ data: (await getData()).dataUser });
		})()
	}

	getArrayTextSearch = () => {
		let arr = [];
		this.state.data.forEach((item) => {
			if (item.name.toLowerCase().indexOf(this.state.searchText) !== -1) {
				arr.push(item);
			}
		});
		return arr;
	};

	getTextSearch = (dl) => {
		this.setState({ searchText: dl.toLowerCase().trim() });
	};

	isCheck = () => {
		this.setState({ status: !this.state.status });
	};

	getNewDataUser = (name, tel, per) => {
		let item = {
			name: name,
			telephone: tel,
			permissions: per
		};
		this.state.data.push(item);
		this.setState({ data: this.state.data });
	};

	editUser = (user) => {
		this.setState({ userEditObject: user });
	};

	changeEditUserStatus = () => {
		this.setState({ editUserStatus: !this.state.editUserStatus });
	};

	getUserEditInfo = (item) => {
		let user = this.state.data.find((user) => user._id === item.id);
		user.name = item.name;
		user.telephone = item.telephone;
		user.permissions = item.permissions;
	};

	getUserRemovedInfo = (idUser) => {
		let tempData = this.state.data.filter((item) => item._id !== idUser);
		this.setState({
			data: tempData
		});
	};

	render() {
		
		
		return (
			<Router>
				<div>
					<Header />
					<div className="searchForm">
						<div className="container">
							<div className="row">
								<Search
									status={() => this.isCheck()}
									displayForm={this.state.status}
									getTextSearch={(dl) => this.getTextSearch(dl)}
								/>
								<div className="col-12">
									<hr />
								</div>
								<TableData
									data={this.getArrayTextSearch()}
									editUser={(user) => this.editUser(user)}
									changeEditUserStatus={() => this.changeEditUserStatus()}
									getUserRemovedInfo={(idUser) =>
										this.getUserRemovedInfo(idUser)
									}
								/>
								<AddUserForm
									displayForm={this.state.status}
									getNewDataUser={(name, tel, per) =>
										this.getNewDataUser(name, tel, per)
									}
								/>
								<EditUserForm
									editUserStatus={this.state.editUserStatus}
									changeEditUserStatus={() => this.changeEditUserStatus()}
									userEditObject={this.state.userEditObject}
									getUserEditInfo={(item) => this.getUserEditInfo(item)}
								/>
							</div>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
