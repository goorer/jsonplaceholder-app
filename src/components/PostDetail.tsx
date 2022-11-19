import { useState, useContext } from 'react'
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import fetcher from '../utils/common-functions'
import { Post, Comment, User } from '../utils/type'
import { UserContext } from '../utils/customHook'

const tableLayout = css`
  table-layout: auto;
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
`

const tableCellLayout = css`
  border: 1px solid black;
`

const textareaStyle = css`
  height: 100px;
  width: 100%;
  margin: 0.5em;
`

const buttonStyle = (display: string = '') => css`
  width: 100px;
  margin: 0.5em;
  ${display}
`

export default function PostDetail() {
  const { id } = useParams()
  const context = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [edit, setEdit] = useState(false)
  const { data: post, error: pError } = useSWR<Post, Error>(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    fetcher
  )
  const { data: comments, error: cError } = useSWR<Array<Comment>, Error>(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`,
    fetcher
  )
  const { data: users, error: uError } = useSWR<Array<User>, Error>(
    `https://jsonplaceholder.typicode.com/users`,
    fetcher
  )

  const hadleClickEdit = () => {
    if (!edit) {
      setTitle(post ? post.title : '')
      setBody(post ? post.title : '')
    }
    setEdit(!edit)
  }

  const handleClickUpdate = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: post?.id,
        title: title,
        body: body,
        userId: context.state.user.id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(
        (json) => {
          console.log('UPDATE POST!: ' + json)
          setEdit(!edit)
        },
        (error) => {
          console.error('Error:' + error)
        }
      )
  }

  if (pError || cError || uError) {
    return <div>failed to load..</div>
  }

  if (!post || !comments || !users) {
    return <div>Loading...</div>
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      {post.userId === context.state.user.id ? (
        !edit ? (
          <input
            css={buttonStyle()}
            type="button"
            value={!edit ? 'Edit' : 'Cancel'}
            onClick={hadleClickEdit}
          />
        ) : (
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
          >
            <input
              css={buttonStyle(!edit ? 'display: none;' : '')}
              type="button"
              value={'Update'}
              onClick={handleClickUpdate}
            />
            <input
              css={buttonStyle()}
              type="button"
              value={!edit ? 'Edit' : 'Cancel'}
              onClick={hadleClickEdit}
            />
          </div>
        )
      ) : (
        <div></div>
      )}
      {!edit ? (
        <h2>Title: {post.title}</h2>
      ) : (
        <textarea
          css={textareaStyle}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      )}
      {!edit ? (
        <p>{post.body}</p>
      ) : (
        <textarea
          css={textareaStyle}
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
        />
      )}
      <table css={tableLayout}>
        <thead>
          <tr>
            <th css={tableCellLayout}>Name</th>
            <th css={tableCellLayout}>Comment</th>
          </tr>
        </thead>
        <tbody>
          {!comments ? (
            <tr>
              <td css={tableCellLayout}></td>
              <td css={tableCellLayout}></td>
            </tr>
          ) : (
            comments.map((comment) => {
              const index = users.findIndex(
                (user) => user.email === comment.email
              )
              return (
                <tr key={comment.id}>
                  <td css={tableCellLayout}>
                    {index !== -1 ? users[index].name : comment.name}
                  </td>
                  <td css={tableCellLayout}>{comment.body}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
