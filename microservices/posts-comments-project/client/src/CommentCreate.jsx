import { useState } from 'react'

// eslint-disable-next-line react/prop-types
export default function CommentCreate({ postId }) {
  const [content, setContent] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    await fetch(`http://localhost:4001/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })

    setContent('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Comment</label>
          <input
            type="text"
            className="form-control"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}
