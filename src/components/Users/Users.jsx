import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UserSearchForm from "./UserSearchForm";
import s from "../Users/users.module.css"

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users,onFilterChanged, ...props}) => {
    return <div className={s.usersPageStyle}>

        <div className="one" ><h1>Users</h1></div>

        <UserSearchForm onFilterChanged={onFilterChanged}/>

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>


        <div>

            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                    />
                )
            }
        </div>
    </div>
}

export default Users;




