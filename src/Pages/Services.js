import React from 'react'
import { Input } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react'
import { useState } from 'react'
const Services = () => {
  const [practiceType, setPracticeType] = useState('')
  const [practiceDescription, setPracticeDescription] = useState('')
  const handaleSubmit = () => {
    console.log('update')
    const formData = new FormData()

    formData.append('practiceType', practiceType)
    formData.append('practiceDescription', practiceDescription)

    fetch('', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }
  return (
    <div>
      {' '}
      <p className='text-center pt-5 text-3xl font-semibold text-deep-purple-800'>
        Add Practice Area
      </p>
      <div className='flex justify-center'>
        <form action='' onSubmit={handaleSubmit}>
          <div className='mt-6 p-8 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow rounded'>
            <Input
              onChange={(e) => setPracticeType(e.target.value)}
              size='lg'
              label='Practice Type'
            />
            <Input
              onChange={(e) => setPracticeDescription(e.target.value)}
              size='lg'
              label='Practice Description'
            />

            <Button color='blue' type='submit'>
              Add Practice Area
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Services
