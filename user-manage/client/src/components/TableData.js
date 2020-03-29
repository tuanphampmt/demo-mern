import React, {Component} from 'react';
import TableDataRow from "./TableDataRow";

class TableData extends Component {
    // getUserRemovedInfo = (idUser) => {
    //     this.props.getUserRemovedInfo(idUser)
    // };
    mappingDataUser = () => this.props.data.map((user, i) => (
        <TableDataRow
            key={i}
            id={user._id}
            name={user.name}
            telephone={user.telephone}
            permissions={user.permissions}
            STT={i}
            editUser={() => this.props.editUser(user)}
            changeEditUserStatus={() => this.props.changeEditUserStatus()}
            getUserRemovedInfo={() => this.props.getUserRemovedInfo(user._id)}
        />
    ));

    render() {
        return (
            <div className="col">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Điện thoại</th>
                        <th>Quyền</th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.mappingDataUser()}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default TableData;