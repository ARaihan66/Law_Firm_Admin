import React from 'react'
import avater from '../Assets/avater.png'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react'
const comments = [
  {
    name: ' Istiak Ahamed',
    img: avater,
    phone: '01725846895',
    email: 'istiak123@gmail.com',
    description: `A law firm is a business entity formed by one or more
                lawyers to engage in  ...,`,
  },
  {
    name: ' Istiak Ahamed',
    img: avater,
    phone: '01725846895',
    email: 'istiak123@gmail.com',
    description: `A law firm is a business entity formed by one or more
                lawyers to engage in the...,`,
  },
  {
    name: ' Istiak Ahamed',
    img: avater,
    phone: '01725846895',
    email: 'istiak123@gmail.com',
    description: `A law firm is a business entity formed by one or more
                ,`,
  },
]
export const ClientComment = () => {
  return (
    <div>
      <p className='text-center pt-5 text-3xl font-semibold text-deep-purple-800'>
        Words form Client
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4'>
        {comments?.map((item, i) => (
          <Card className='mt-6 relative' key={i}>
            <div className='flex justify-center'>
              <img src={item.img} alt='cardimage' className='w-[100px] mt-4' />
            </div>
            <CardBody className='mb-14'>
              <Typography variant='h5' className='mb-2'>
                {item.name}
              </Typography>
              <Typography>
                <p className='text-xl font-semibold mt-1 '>
                  Phone :
                  <span className='text-[17px] font-normal ml-1'>
                    <br />
                    {item.phone}
                  </span>
                </p>
                <p className='text-xl font-semibold mt-1 '>
                  Email :
                  <span className='text-[17px] font-normal ml-1'>
                    <br /> {item.email}
                  </span>
                </p>
                <p className='text-xl font-semibold mt-1'>
                  Comment :
                  <span className='text-[17px] font-normal ml-1'>
                    <br /> {item.description}
                  </span>
                </p>
              </Typography>
            </CardBody>
            <CardFooter className='pt-0 absolute bottom-0'>
              <Button color='red' className='mb-0'>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
