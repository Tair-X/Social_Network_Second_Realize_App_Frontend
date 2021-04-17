import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    unfollow, toggleFollowingProgress, requestUsers
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";
import {Spinner} from "react-bootstrap";


class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize,filter} = this.props;
        this.props.getUsers(currentPage, pageSize,filter);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize,filter} = this.props;
        this.props.getUsers(pageNumber, pageSize,filter);
    }

    onFilterChanged = (filter) => {
        const {pageSize} = this.props;
        this.props.getUsers(1, pageSize,filter);
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
                   onFilterChanged={this.onFilterChanged.bind(this)}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter:state.usersPage.filter
    }
}


export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers: requestUsers})
)(UsersContainer)