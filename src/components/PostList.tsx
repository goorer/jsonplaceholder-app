import { useContext } from 'react'
import { css } from '@emotion/react'
import { Post, User } from '../utils/type'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import fetcher from '../utils/common-functions'
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

export default function PostList() {
  const context = useContext(UserContext)
  const { data: posts, error: pError } = useSWR<Array<Post>, Error>(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  )

  const { data: users, error: uError } = useSWR<Array<User>, Error>(
    'https://jsonplaceholder.typicode.com/users',
    fetcher
  )

  if (pError || uError) {
    return <div>failed to load..</div>
  }
  if (!posts || !users) {
    return <div>Loading...</div>
  }

  return (
    <table css={tableLayout}>
      <thead>
        <tr>
          <th css={tableCellLayout}>Name</th>
          <th css={tableCellLayout}>Title</th>
        </tr>
      </thead>
      <tbody>
        {posts
          .filter((post) => post.userId !== context.state.user.id)
          .map((post) => {
            const index = users?.findIndex((user) => user.id === post.userId)
            return (
              <tr key={post.id}>
                <td css={tableCellLayout}>{users[index].username}</td>
                <td css={tableCellLayout}>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
