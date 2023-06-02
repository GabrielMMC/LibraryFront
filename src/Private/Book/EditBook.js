import React from 'react'
import CreateBook from './CreateBook'
import { renderToast } from '../../utils/Alerts'
import { CircularProgress } from '@mui/material'
import { GET_FETCH } from '../../utils/requests'
import { useParams, useNavigate } from 'react-router-dom'

const EditBook = () => {
  const [data, setData] = React.useState('')

  const params = useParams()
  const history = useNavigate()

  React.useEffect(() => {
    const getData = async () => {
      const response = await GET_FETCH({ url: `books/edit/${params.id}` })
      if (response.status) {
        setData(response)
      } else {
        renderToast({ type: 'error', msg: response.message })
        history('/admin')
      }
    }

    getData()
  }, []);
  return (
    <>
      {data ?
        <CreateBook edit={data} />
        :
        <div className="d-flex justify-content-center p-5">
          <CircularProgress />
        </div>
      }
    </>
  )
}

export default EditBook