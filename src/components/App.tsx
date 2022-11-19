import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import useSWR from 'swr'
import { Post } from '../utils/type'
import { UserContext } from '../utils/customHook'
import fetcher from '../utils/common-functions'

const tableLayout = css`
  table-layout: auto;
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
`

const tableCellLayout = css`
  border: 1px solid black;
`

export default function App() {
  const context = useContext(UserContext)
  const { data: posts, error } = useSWR<Array<Post>, Error>(
    `https://jsonplaceholder.typicode.com/posts?userId=${context.state.user.id}`,
    fetcher
  )

  if (error) {
    return <div>failed to load..</div>
  }

  return (
    <div>
      <h1>Hello,{context.state.user.username}</h1>
      {!posts ? (
        <div>Loading...</div>
      ) : (
        <table css={tableLayout}>
          <thead>
            <tr>
              <th css={tableCellLayout}>Title</th>
              <th css={tableCellLayout}>Body</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td css={tableCellLayout}>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </td>
                  <td css={tableCellLayout}>{post.body}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
