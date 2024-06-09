import { TasksContextType } from './../components/TasksContext'
import { useState } from 'react'

type UseFetchResultType = {
  data: TasksContextType[] | null
  isLoading: boolean
  isSuccess: boolean
  error: any | null
  get: () => void
  post: (data: TasksContextType) => void
}

const useFetch = (): UseFetchResultType => {
  const url = 'http://localhost:3001/todos'
  const [data, setData] = useState<TasksContextType[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)

  const get = () => {
    setTimeout(() => {
      setData(null)
      setIsLoading(false)
      setIsSuccess(false)
      setError(null)
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error('Error fetching users data')
          }
          return res.json()
        })
        .then((data) => {
          setData(data)
          setIsLoading(false)
          setIsSuccess(true)
          setError(null)
        })
        .catch((err) => {
          setIsLoading(false)
          setIsSuccess(false)
          setError(err.message)
        })
    }, 1000)
  }
  const post = (input: TasksContextType) => {
    setTimeout(() => {
      setData(null)
      setIsLoading(false)
      setIsSuccess(false)
      setError(null)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input), // body data type must match "Content-Type" header
      })
        .then((res) => {
          if (!res.ok) {
            throw Error('Error fetching users data')
          }
          return res.json()
        })
        .then((res) => {
          console.log('post response', res)
          setData([...(data ?? []), res])
          setIsLoading(false)
          setIsSuccess(true)
          setError(null)
        })
        .catch((err) => {
          setIsLoading(false)
          setIsSuccess(false)
          setError(err.message)
        })
    }, 1000)
  }

  //   useEffect(() => {
  //     setTimeout(() => {
  //       fetch(url)
  //         .then((res) => {
  //           if (!res.ok) {
  //             throw Error('Error fetching users data')
  //           }
  //           return res.json()
  //         })
  //         .then((data) => {
  //           setData(data)
  //           setIsLoading(false)
  //           setError(null)
  //         })
  //         .catch((err) => {
  //           setIsLoading(false)
  //           setError(err.message)
  //         })
  //     }, 1000)
  //   }, [url])

  return { data, isLoading, isSuccess, error, get, post }
}

export default useFetch
