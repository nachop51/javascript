import { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title) {
      return
    }

    await axios.post('http://localhost:4000/posts', {
      title
    })

    setTitle('')
  }

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default PostCreate
