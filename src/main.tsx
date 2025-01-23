import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import { Result } from 'antd'
import FirstContent from './Components/FirstContent.tsx'
import SecondContent from './Components/SecondContent.tsx'
import Skills from './Components/Skills.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<FirstContent />} />
          <Route path="/aboutme" element={<SecondContent />} />
          <Route path='/skills' element={<Skills />} />
        </Route>
        <Route path="*" element={<Result status={'404'} title="404" subTitle={<Link to={"/"}>Home</Link>}></Result>} />
      </Routes>
  </BrowserRouter>
  </StrictMode>,
)
