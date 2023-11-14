import React from 'react'
import { Input } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'

const getQuestion = [
  {
    question: 'What Is a Law Firm?',
    ans: `A law firm is a business entity formed by one or more lawyers to engage in the practice of law. The primary service rendered by a law firm is to advise ...,
    A law firm is a business entity formed by one or more lawyers to engage in the practice of law. The primary service rendered by a law firm is to advise
    A law firm is a business entity formed by one or more lawyers to engage in the practice of law. The primary service rendered by a law firm is to advise`,
  },
  {
    question: 'What Is a Law Firm?',
    ans: `A law firm is a business entity formed by one or more lawyers to engage,`,
  },
]

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handaleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('question', question)
    formData.append('answer', answer)
    fetch('', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }
  const handaleUpdate = () => {
    console.log(question, answer)
    const formData = new FormData()
    formData.append('question', question)
    formData.append('answer', answer)
    fetch('', {
      method: 'PUT',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }
  const handaleDelete = () => {
    console.log(question, answer)
    const formData = new FormData()
    formData.append('question', question)
    formData.append('answer', answer)
    fetch('', {
      method: 'DELETE',
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
        FAQ's
      </p>
      <div className='flex justify-center'>
        <form action='' onSubmit={handaleSubmit}>
          <div className='mt-6 p-6 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow-lg rounded-lg'>
            <Input
              onChange={(e) => setQuestion(e.target.value)}
              size='lg'
              label='Question'
            />
            <Input
              onChange={(e) => setAnswer(e.target.value)}
              size='lg'
              label='Answer'
            />
            <Button color='blue' type='submit'>
            Add Faq's
            </Button>
          </div>
        </form>
      </div>
      <div className='flex justify-center'>
        <div>
          {getQuestion?.map((item, i) => (
            <Card key={i} className='mt-6  w-[350px] md:w-[600px] lg:w-[900px]'>
              <CardBody>
                <Typography variant='h5' color='blue-gray' className='mb-2'>
                  {item.question}
                </Typography>
                <Typography>{item.ans}</Typography>
              </CardBody>
              <CardFooter className='pt-0 flex justify-between'>
                <Button onClick={handaleUpdate} color='green'>
                  Update
                </Button>
                <Button onClick={handaleDelete} color='red'>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Question
