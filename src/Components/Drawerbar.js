import React from 'react'
import { Drawer, IconButton } from '@material-tailwind/react'
 import Leftbar from './Leftbar'
 import lawicon from '../Assets/law-icon.png'
const Drawerbar = ({ open, closeDrawer }) => {
  return (
    <div>
      <React.Fragment>
        <Drawer open={open} onClose={closeDrawer}>
          <div className='mb-2 float-right p-4'>
            <IconButton variant='text' color='blue-gray' onClick={closeDrawer}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-[40px] h-[40px]'
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
