import { useEffect, useState } from 'react'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:4002/posts')
      .then(res => res.json())
      .then(data => setPosts(Object.values(data)))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h2>Posts</h2>
      <ul style={{ padding: '4px' }}>
        {posts.map(post => (
          <li
            key={post.id}
            style={{
              listStyle: 'none',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '8px'
            }}
          >
            ({post.id}): {post.title}
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
