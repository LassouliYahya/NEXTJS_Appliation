import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Post from "../../components/index/Post";
import FollowTab from "../../components/profile/FollowTab";


class ProfileTabs extends React.Component {
  state = {
    tab:0,
  };
  handleChange=(event,value)=>{
this.setState({
  tab:value,
})
  }
  render() {
    const {tab}=this.state;
    const {posts,
      user,   
      auth,
        handleDeletePost,
      isDeletingPost,
      handleToggleLike,
      handleAddComment,
      handleDeleteComment
    }=this.props;

    return <div>
      <AppBar position="static" color="default" >
        <Tabs
        value={tab}
        onChange={this.handleChange}
        fullWidth
        indicatorColor="secondary"
        textColor="secondary"
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Follower" />
        </Tabs>
      </AppBar>
      {
        tab === 0 &&  (
          <TabContainer>
            {posts.map((post)=>(
             <Post 
             key={post._id} 
             auth={auth} 
             post={post} 
             isDeletingPost={isDeletingPost}
             handleDeletePost={handleDeletePost}
             handleToggleLike={handleToggleLike}
             handleAddComment={handleAddComment}
             handleDeleteComment={handleDeleteComment}
             />
            ))}
          </TabContainer>
        )
      }
      {
         tab === 1 &&  (
          <TabContainer>
<FollowTab users={user.following} />
          </TabContainer>
        )
      }
        {
         tab === 2 &&  (
          <TabContainer>
<FollowTab users={user.followers} />
          </TabContainer>
        )
      }
    </div>;
  }
}

const  TabContainer=({children})=> {
  return (
    <Typography  component="div"  style={{padding:"1em"}} >
      {children}
    </Typography>
  )
}


export default ProfileTabs;
