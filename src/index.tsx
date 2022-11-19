import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/Router'
import { Global, css } from '@emotion/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Global
      styles={css`body {
        height: 100vh;/
      }
      #root,main {
        height: 100%;
      }
      a{
        text-decoration: none;
        :hover {
          text-decoration: underline;
        }
      }`}
    />
    <Router />
  </StrictMode>
)
