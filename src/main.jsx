import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />    
      <Toaster 
        position="top-center"
        reverseOrder={false}/>
    </Provider>
  </StrictMode>,
)
