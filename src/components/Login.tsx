import { useState, useContext, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import useSWR from 'swr'
import fetcher from '../utils/common-functions'
import { User } from '../utils/type'
import { UserContext } from '../utils/customHook'

const TESTUSER = {
  name: 'Bret',
  email: 'Sincere@april.biz',
}

const formStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const buttonStyle = css`
  width: 100px;
  margin: 0.5em;
`

const textStyle = (borderColor: string) => css`
  margin: 0.5em;
  border: none;
  border-bottom: 2px solid ${borderColor};
  :focus {
    outline: none;
    border-bottom: 4px solid blue;
  }
`

export default function Login() {
  const [userName, setUserName] = useState(TESTUSER.name)
  const [email, setEmail] = useState(TESTUSER.email)
  const [borderColor, setBorderColor] = useState('black')
  const context = useContext(UserContext)
  const navigate = useNavigate()
  const { data: users, error } = useSWR<Array<User>, Error>(
    `https://jsonplaceholder.typicode.com/users`,
    fetcher
  )

  const changeBorderColor = (color: string) => {
    setBorderColor(color)
  }

  const handleClick = () => {
    if (users) {
      if (userName.length !== 0 && email.length !== 0) {
        const index = users.findIndex(
          (user) => user.username === userName && user.email === email
        )

        if (index !== -1) {
          context.login(users[index])
          navigate('/')
        } else {
          alert('Please Input ..')
          changeBorderColor('red')
        }
      } else {
        changeBorderColor('red')
      }
    } else {
      console.error(`Error_Login: No User`)
    }
  }
  // 開発用自動ログイン
  useLayoutEffect(() => {
    //handleClick()
  })

  if (error) {
    return <div>failed to load..</div>
  }

  if (!users) {
    return <div>Loading...</div>
  }

  return (
    <form css={formStyle}>
      <h2>Login</h2>
      <input
        type="text"
        css={textStyle(borderColor)}
        value={userName}
        placeholder="UserName"
        onChange={(e) => {
          const str = e.currentTarget.value
          setUserName(str)
          if (str.length !== 0) {
            changeBorderColor('black')
          }
        }}
      />
      <input
        type="text"
        css={textStyle(borderColor)}
        value={email}
        placeholder="Emali"
        onChange={(e) => {
          const str = e.currentTarget.value
          setEmail(str)
          if (str.length !== 0) {
            changeBorderColor('black')
          }
        }}
      />
      <input
        type="button"
        css={buttonStyle}
        value="Login"
        onClick={() => handleClick()}
      />
    </form>
  )
}
