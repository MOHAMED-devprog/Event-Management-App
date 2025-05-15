import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoginProvider } from './context/LoginContext.tsx'
import { ProfileProvider } from './context/ProfileContext.tsx'
import App from './App.tsx'
import { SearchEventProvider } from './context/SearchEventContext.tsx'
import { RemovingRegistrationProvider } from './context/RemovingRegistrationContext.tsx'
import { RegistrationProvider } from './context/RegistrationContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <RemovingRegistrationProvider>
      <RegistrationProvider>
        <SearchEventProvider>
          <ProfileProvider>
            <LoginProvider>
              <App/>
            </LoginProvider>
          </ProfileProvider>
        </SearchEventProvider>
      </RegistrationProvider>
    </RemovingRegistrationProvider>
  </StrictMode>

)
