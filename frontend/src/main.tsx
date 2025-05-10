import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoginProvider } from './context/LoginContext.tsx'
import { ProfileProvider } from './context/ProfileContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfileProvider>
      <LoginProvider>
        <App/>
      </LoginProvider>
    </ProfileProvider>
  </StrictMode>
)
