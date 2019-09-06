import React, { useEffect, useState } from 'react'
import instructorReview from '../services/instructorReview'

const InstructorReviews = () => {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    instructorReview.getAll().then(data => {
      console.log(data)
      setReviews(data)
    })
  }, [])

  return (
    <pre>
      {JSON.stringify(reviews, null, 2)}
    </pre>
  )
}

export default InstructorReviews