import Button from "@material-ui/core/Button";
import {followUser,unfollowUser  } from "../../lib/api";


const FollowUser = ({isFollowing,toggleFollow}) => {
  const request= isFollowing ? unfollowUser :followUser


  return (<Button color={isFollowing ?"secondary" :"primary"}  variant="contained"
    onClick={()=>{
      toggleFollow(request)
    }}
  >
      {isFollowing ? "Unfollow": "Follow"}
  </Button>)
};

export default FollowUser;
