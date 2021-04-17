import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {
    return (
       <div className={styles.userInfo}>

                    <div>
                       <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
           <div className={styles.userInfo}>
                    <div>
                        {user.followed
                            ? <button className={"button1"} disabled={followingInProgress
                                .some(id => id === user.id)}
                                      onClick={() => { unfollow(user.id) }}>
                                Unfollow</button>
                            : <button className={"button1"} disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => { follow(user.id) }}>
                                      Follow</button>}

                    </div>

                <span>
                    <span >
                        <div>{user.name}</div>
                        <div>{user.status?user.status:"No Status"}</div>
                    </span>

                </span>
           </div>
            </div>)
}

export default User;