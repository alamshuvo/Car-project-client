import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { Toaster } from 'sonner'
import CustomCursor from './components/cursor/Cursor.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CustomCursor></CustomCursor>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>,
)
