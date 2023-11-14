import React from 'react'
import { Input } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@material-tailwind/react'
import lawer from '../Assets/team-1.jpg'

const lawers = [
  {
    image: lawer,
    name: 'Istiak',
    experiencn: `The field of law is incredibly competitive and to make yourself`,
    designation: `During your name.`,
    description: `Providing an invaluable insight into the workings of a law firm and designed to help students improve their skills and legal knowledge, vacation schemes usually last a month.`,
  },
  {
    image: lawer,
    name: 'Istiak',
    experiencn: `The field of law is incredibly competitive and to make yourself stand out you'll need plenty of legal work experience.`,
    designation: `During your name.`,
    description: `Providing an invaluable insight into the workings of.Providing an invaluable insight into the workings of..`,
  },
  {
    image: lawer,
    name: 'Istiak',
    experiencn: `The field of law is incredibly competitive and to make yourself stand out you'll need plenty of legal work experience.`,
    designation: `During your name.`,
    description: `Providing an invaluable insight into the workings of.Providing an invaluable insight into the workings of..`,
  },
  {
    image: lawer,
    name: 'Istiak',
    experiencn: `The field of law is incredibly competitive and to make yourself stand out you'll need plenty of legal work experience.`,
    designation: `During your name.`,
    description: `Providing an invaluable insight into the workings of.Providing an invaluable insight into the workings of..`,
  },
]

export const Advocate = () => {
  const [image, setImage] = useState('')
  const [lawername, setLawerName] = useState('')
  const [experience, setExperience] = useState('')
  const [designation, setDesignation] = useState('')
  const [description, setDescription] = useState('')
  const handaleSubmit = (event) => {
    event.preventDefault()
    const getLawerdata = {
      image,
      lawername,
      experience,
      designation,
      description,
    }
    console.log(getLawerdata)
    // const formData = new FormData()
    // formData.append('image', image)
    // formData.append('lawername', lawername)
    // formData.append('experience', experience)
    // formData.append('designation', designation)
    // formData.append('description', description)
    // fetch('', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error))
  }
  const handaleUpdate = () => {
    console.log('update')
    //  const formData = new FormData()
    //  formData.append('image', image)
    //  formData.append('lawername', lawername)
    //  formData.append('experience', experience)
    //  formData.append('designation', designation)
    //  formData.append('description', description)
    //  fetch('', {
    //    method: 'PUT',
    //    body: formData,
    //  })
    //    .then((res) => res.json())
    //    .then((data) => console.log(data))
    //    .catch((error) => console.error(error))
  }
  const handaleDelete = () => {
    console.log('delete')
    //const formData = new FormData()
    // formData.append('image', image)
    // formData.append('lawername', lawername)
    // formData.append('experience', experience)
    // formData.append('designation', designation)
    // formData.append('description', description)
    //   fetch('', {
    //     method: 'DELETE',
    //     body: formData,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.error(error))
  }

  return (
    <div>
      {' '}
      <p className='text-center pt-5 text-3xl font-semibold text-deep-purple-800'>
        Add Lawer
      </p>
      <div className='flex justify-center'>
        <form action='' onSubmit={handaleSubmit}>
          <div className='mt-6 p-8 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow rounded-lg'>
            <input
              type='file'
              onChange={(e) => setImage(e.target.files[0])}
              size='lg'
            />
            <Input
              onChange={(e) => setLawerName(e.target.value)}
              size='lg'
              label='Lawer Name'
            />
            <Input
              onChange={(e) => setExperience(e.target.value)}
              size='lg'
              label='Experience'
            />
            <Input
              onChange={(e) => setDesignation(e.target.value)}
              size='lg'
              label='Designation'
            />
            <Input
              onChange={(e) => setDescription(e.target.value)}
              size='lg'
              label='Description'
            />
            <Button color='blue' type='submit'>
            Add Lawer
            </Button>
          </div>
        </form>
      </div>
      <div className='flex justify-center'>
        <div className='p-3 grid grid-cols-1 md:grid-cols-3 gap-4'>
          {lawers?.map((item, i) => (
            <Card className='mt-6 relative' key={i}>
              <CardHeader color='blue-gray' className='mt-4'>
                <img
                  src={lawer}
                  alt='cardimage'
                  className='w-[100%] object-cover'
                />
              </CardHeader>
              <CardBody className='mb-14'>
                <div>
                  <div>
                    <h1 className='text-xl font-semibold'>
                      Name :
                      <span className='text-[17px] font-normal ml-1'>
                        <br />
                        {item.name}
                      </span>
                    </h1>
                    <p className='text-xl font-semibold mt-1'>
                      Experience :
                      <span className='text-[17px] font-normal ml-1'>
                        <br /> {item.experiencn}
                      </span>
                    </p>
                    <p className='text-xl font-semibold mt-1'>
                      Designation :
                      <span className='text-[17px] font-normal ml-1'>
                        <br /> {item.designation}
                      </span>
                    </p>
                    <p className='text-xl font-semibold mt-1'>
                      Description :
                      <span className='text-[17px] font-normal ml-1'>
                        <br /> {item.description}
                      </span>
                    </p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className='pt-0 absolute bottom-0 w-full'>
                <div className='flex justify-between '>
                  <Button onClick={handaleUpdate} color='green'>
                    Update
                  </Button>
                  <Button onClick={handaleDelete} color='red' className=''>
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
