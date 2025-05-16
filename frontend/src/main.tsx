import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoginProvider } from './context/LoginContext.tsx'
import { ProfileProvider } from './context/ProfileContext.tsx'
import App from './App.tsx'
import { SearchEventProvider } from './context/SearchEventContext.tsx'


createRoot(document.getElementById('root')!).render(

  <StrictMode>

        <SearchEventProvider>
          <ProfileProvider>
            <LoginProvider>
              <App/>
            </LoginProvider>
          </ProfileProvider>
        </SearchEventProvider>
      
  </StrictMode>

)
