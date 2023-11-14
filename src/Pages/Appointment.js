import React from 'react'
import { Card, Typography } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react'
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
const TABLE_HEAD = ['Name', 'Job', 'Action']
const TABLE_ROWS = [
  {
    name: 'John Michael',
    job: 'Manager',
    date: '23/04/18',
  },
  {
    name: 'Alexa Liras',
    job: 'Developer',
    date: '23/04/18',
  },
  {
    name: 'Laurent Perrier',
    job: 'Executive',
    date: '19/09/17',
  },
  {
    name: 'Michael Levi',
    job: 'Developer',
    date: '24/12/08',
  },
  {
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
]
const Appointment = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(!open)
  return (
    <div className='mx-2'>
      <p className='text-center pt-5 text-3xl font-semibold text-deep-purple-800'>
        Appointment
      </p>
      <Card className='h-full w-full overflow-scroll mt-4'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                >
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, job }, index) => {
              const isLast = index === TABLE_ROWS.length - 1
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {job}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Button onClick={handleOpen}>View</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
      <div>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Appointment</DialogHeader>
          <DialogBody>
            The key to more success is to have a lot of pillows. Put it this
            way, it took me twenty five years to get these plants, twenty five
            years of blood sweat and tears, and I&apos;m never giving up,
            I&apos;m just getting started. I&apos;m up to something. Fan luv.
          </DialogBody>
          <DialogFooter>
            <Button
              variant='gradient'
              color='black'
              onClick={handleOpen}
              className='mr-1'
            >
              <span>Cancel</span>
            </Button>
            <Button variant='gradient' color='red'>
              <span>Delete</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  )
}

export default Appointment
