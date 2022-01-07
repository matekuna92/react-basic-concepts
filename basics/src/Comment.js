/* function Comment(props) {
    return (
      <div className="Comment">
        <div className="UserInfo">
          <img className="Avatar"
            src={props.author.avatarUrl}
            alt={props.author.name}
          />
          <div className="UserInfo-name">
            {props.author.name}
          </div>
        </div>
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
} */

// we should extract components from the above component, so we can reuse individual components instead:
function Avatar(props) {
	return (
		<img className="Avatar"
			src={props.user.avatarUrl}
			alt={props.user.name}
		/>
	)
}

function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.user} />
			<div className="UserInfo-name">
				{props.user.name}
			</div>
		</div>
	)
}

// now Comment component can be simplified:
// UserInfo already contains Avatar component, so we only need UserInfo under the comment
function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} /> 
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
}

function Comment() {
    return (
		<div>
        
		</div>
    );
}

export default Comment;
