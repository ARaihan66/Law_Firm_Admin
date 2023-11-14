import React from 'react'
import { List, ListItem } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLogin } from 'react-icons/ai'
const Leftbar = () => {
  const navigate = useNavigate()
  const logOut = () => {
    navigate('/')
  }
  return (
    <div className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 '>
      <List>
        <Link to='/home'>
          <ListItem>Admin</ListItem>
        </Link>
        <Link to='/home/faq'>
          <ListItem>FAQ's</ListItem>
        </Link>
        <Link to='/home/history'>
          <ListItem>Case History</ListItem>
        </Link>
        <Link to='/home/advocate'>
          <ListItem>Add Lawer</ListItem>
        </Link>
        <Link to='/home/servicess'>
          <ListItem>Add Practice Area</ListItem>
        </Link>
        <Link to='/home/client_comment'>
          <ListItem>Client Comment</ListItem>
        </Link>

        <Link to='/home/client_appointment'>
          <ListItem>Appointment</ListItem>
        </Link>

        <ListItem onClick={logOut}>
          <AiOutlineLogin className='mr-2' />
          Logout
        </ListItem>
      </List>
    </div>
  )
}

export default Leftbar
