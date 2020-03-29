import React, { Component } from "react";
import axios from "axios";
const postData = async (id) => await axios.post("/api/delete/" + id);
class TableDataRow extends Component {
	checkPermissions = () => {
		if (parseInt(this.props.permissions) === 1) {
			return "Admin";
		} else if (parseInt(this.props.permissions) === 2) {
			return "Moderator";
		}
		return "Normal User";
	};

	editClick = async () => {
		this.props.editUser();
		this.props.changeEditUserStatus();
	};
	onSubmit = async (event) => {
		event.preventDefault();
		this.props.getUserRemovedInfo();
		await postData(this.props.id);
	};
	// getUserRemovedInfo = (idUser) => {
	//     this.props.getUserRemovedInfo(idUser)
	// };

	render() {
		return (
			<tr>
				<td>{this.props.STT + 1}</td>
				<td>{this.props.name}</td>
				<td>{this.props.telephone}</td>
				<td>{this.checkPermissions()}</td>
				<td>
					<form onSubmit={this.onSubmit}>
						<div className="btn-group">
							<button
								className="btn btn-success"
								onClick={() => this.editClick()}
							>
								<i className="fa fa-edit" /> Sửa
							</button>
							<button type="submit" className="btn btn-danger">
								<i className="fa fa-remove" /> Xoá
							</button>
						</div>
					</form>
				</td>
			</tr>
		);
	}
}

export default TableDataRow;
