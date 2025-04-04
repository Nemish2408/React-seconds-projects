import React from 'react'
import Footer from '../UI/Footer'
import { Outlet } from 'react-router-dom'
import Headers from '../UI/Headers'

const AppLayout = () => {
  return (
    <>
      <Headers />
      <Outlet />
      <Footer />
    </>
  )
}

export default AppLayout
