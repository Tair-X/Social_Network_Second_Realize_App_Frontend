import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {
    if(props.profile==null){return <Preloader/>}
    let textTile=props.isOwner?`Hi, ${props.profile.fullName}`:`It is ${props.profile.fullName}'s page`;

    return (
        <div>
            <div className="one"><h1>{textTile}</h1></div>
            <ProfileInfo savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateStatus={props.updateStatus}
                         ownId={props.ownId}
            />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;