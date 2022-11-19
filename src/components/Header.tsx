import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { UserContext } from '../utils/customHook'

const headerStyle = css`
  padding: 0.5em;
`
const navStyle = css`
  display: flex;
  flex-direction: center;
  gap: 10px;
`

const ankerStyle = css`
  margin: 0.5em;
  font-size: 15px;
  color: #0d0d0d;
  :link {
    color: #0d0d0d;
  }
  :hover {
    text-decoration: underline;
  }
  visited {
    color: #0d0d0d;
  }
`

export default function Header() {
  const context = useContext(UserContext)
  const navigate = useNavigate()

  if (context.state.user.id === -1) {
    return (
      <header>
        <nav></nav>
      </header>
    )
  }

  return (
    <header css={headerStyle}>
      <nav css={navStyle}>
        <Link to="/" css={ankerStyle}>
          Home
        </Link>
        <Link to="post/all" css={ankerStyle}>
          Post
        </Link>
        <input
          type="button"
          value="Logout"
          onClick={() => {
            context.logout()
            navigate('/')
          }}
        />
      </nav>
    </header>
  )
}
