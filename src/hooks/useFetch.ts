import { TasksContextType } from './../components/TasksContext'
import { useState } from 'react'

type UseFetchResultType = {
  data: TasksContextType[] | null
  isLoading: boolean
  isSuccess: boolean
  error: any | null
  get: () => void
  post: (data: TasksContextType) => void
  put: (data: TasksContextType) => void
  del: (id: TasksContextType['id']) => void
}

const useFetch = (): UseFetchResultType => {
  const url = 'http://localhost:3001/todos'
  const [data, setData] = useState<TasksContextType[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)

  const get = () => {
    setIsLoading(true)
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
  }
  const post = (input: TasksContextType) => {
    setIsLoading(true)
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
  }
  const put = (input: TasksContextType) => {
    setIsLoading(true)
    setIsSuccess(false)
    setError(null)
    fetch(`${url}/${input.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Error fetching users data')
        }
        return res.json()
      })
      .then((res) => {
        const map = new Map(
          [...(data ?? []), res].map((item) => [item.id, item])
        )
        setData(Array.from(map.values()))
        setIsLoading(false)
        setIsSuccess(true)
        setError(null)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsSuccess(false)
        setError(err.message)
      })
  }
  const del = (id: TasksContextType['id']) => {
    setIsLoading(true)
    setIsSuccess(false)
    setError(null)
    fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Error fetching users data')
        }
        return res.json()
      })
      .then(() => {
        setData([...(data ?? [])].filter((item) => item?.id !== id))
        setIsLoading(false)
        setIsSuccess(true)
        setError(null)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsSuccess(false)
        setError(err.message)
      })
  }

  return { data, isLoading, isSuccess, error, get, post, put, del }
}

export default useFetch
