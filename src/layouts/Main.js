import React from 'react'
import Header from '../Components/Header'
import Drawerbar from '../Components/Drawerbar'
import Leftbar from '../Components/Leftbar'
import { Outlet } from 'react-router-dom'

const Main = () => {
  const [open, setOpen] = React.useState(false)
  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)
  return (
    <main>
      <Header openDrawer={openDrawer} />
      <Drawerbar
        open={open}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
      <section>
        <div className='hidden lg:block lg:fixed left-0 h-full'>
          <Leftbar />
        </div>
        <div className='lg:flex-1 lg:ml-[275px] bg-gray-300 min-h-screen'>
          <Outlet />
        </div>
      </section>
    </main>
  )
}

export default Main
