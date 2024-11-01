/* eslint-disable react/prop-types */
const CommentList = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => {
          let content

          if (comment.status === 'approved') {
            content = comment.content
          }

          if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation'
          }

          if (comment.status === 'rejected') {
            content = 'This comment has been rejected'
          }

          return (
            <li key={comment.id}>
              ({comment.id}): {content}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CommentList
