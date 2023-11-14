import React from 'react'
import { Drawer, IconButton } from '@material-tailwind/react'
 import Leftbar from './Leftbar'
 import lawicon from '../Assets/law-icon.png'
const Drawerbar = ({ open, closeDrawer }) => {
  return (
    <div>
      <React.Fragment>
        <Drawer open={open} onClose={closeDrawer}>
          <div className='mb-2 flex items-center justify-between p-4'>
            <img src={lawicon} alt='brand' className='w-[50px] h-[40px]' />
            <IconButton variant='text' color='blue-gray' onClick={closeDrawer}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </IconButton>
          </div>
          <Leftbar />
        </Drawer>
      </React.Fragment>
    </div>
  )
}

export default Drawerbar
