import React, {Component} from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempValue: ""
        }
    }

    displayForm = () => {
        if (this.props.displayForm) {
            return <div className="btn btn-success btn-block add" onClick={() => this.props.status()}>Đóng lại</div>
        }
        return <div className="btn btn-success btn-block add" onClick={() => this.props.status()}>Thêm mới</div>
    };
    isChange = (event) => {
        this.setState({
            tempValue: event.target.value
        });
        this.props.getTextSearch(this.state.tempValue)
    };

    render() {
        return (
            <div>
                <div className="col-12">
                    <div className="form-group">
                        <div className="btn-group">
                            <input
                                className="form-control inputSearch"
                                type="text"
                                name="seach"
                                placeholder="Nhập tên cần tìm"
                                onChange={event => this.isChange(event)}
                            />
                            <button className="btn btn-primary"
                                    onClick={() => this.props.getTextSearch(this.state.tempValue)}>Tìm
                            </button>
                            {this.displayForm()}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default Search;