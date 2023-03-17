import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdEdit, MdDelete, MdSearch, MdSave } from 'react-icons/md'
import { CircularProgress, IconButton, Pagination, Tooltip, Button } from '@mui/material'
import { DELETE, GET } from '../../utils/requests'
import { renderAlert, renderToast } from '../../utils/Alerts'
import { moneyMask } from '../../utils/masks/currency'
import { STORAGE_URL } from '../../utils/variables'
import Filter from '../../utils/Filter'

const ListBooks = () => {
  const [allow, setAllow] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const [dateOf, setDateOf] = React.useState('')
  const [dateFor, setDateFor] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [books, setBooks] = React.useState([])
  const [genders, setGenders] = React.useState([])
  const [selectedGender, setSelectedGender] = React.useState([])
  const [pagination, setPagination] = React.useState({
    totalItems: '', pageNumber: 0, perPage: 10
  })
  console.log('paginaiton', pagination)
  console.log('books', books)

  const history = useNavigate()

  let timeout
  const handleSearch = (value) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => { setSearch(value); setPagination({ ...pagination, pageNumber: 0 }) }, 750)
  }

  React.useEffect(() => {
    if (allow) getData()
  }, [pagination.pageNumber, allow, search])

  const getData = async () => {
    setLoading(true)
    const response = await GET({
      url: `books/?page=${pagination.pageNumber + 1}&dateOf=${dateOf ? dateOf : ''}&dateFor=${dateFor ? dateFor : ''}&search=${search}&gender=${selectedGender}`
    })
    // console.log('resp', response)

    setPagination({ ...pagination, totalItems: response.pagination.total_pages }); setBooks(response.books); setGenders(response.genders); setLoading(false)
  }

  const handleSize = (description) => {
    let value = Array.from(description)
    let tooltip = false
    if (value.length > 80) { value = value.splice(0, 80).toString().replace(/,/g, '') + '...'; tooltip = true }
    else { value = value.toString().replace(/,/g, ''); tooltip = false }

    return { value, tooltip }
  }

  const handleDelete = async (id) => {
    const response = await DELETE({ url: `books/${id}` })
    // console.log('delete', response)

    if (response.status) getData()
    else renderToast({ type: 'error', error: 'Falha ao deletar produto, tente novamente mais tarde!' })
  }

  return (
    <div className='anime-left'>
      <div className="row my-5">
        <div className='col-sm-6'>
          <div className="d-flex align-items-center">
            <h6 className="dash-title">Livros</h6>
            <Filter setDateOf={setDateOf} setDateFor={setDateFor} dateOf={dateOf} dateFor={dateFor} setAllow={setAllow} setPagination={setPagination}
              setSearch={setSearch} options={genders} selectedGender={selectedGender} setSelected={setSelectedGender} />
          </div>
          <p className='small mb-4'>Encontre todos seus livros cadastrados!</p>

          <div class="input-group-with-icon">
            <input class="form-control" type="text" placeholder="Buscar pelo título..." onChange={({ target }) => handleSearch(target.value)} required />
            <MdSearch className='search-icon' size={25} />
          </div>
        </div>

        <div className="col-sm-6">
          <div className="d-flex ms-auto align-items-end justify-content-end h-100">
            <Button variant='contained' endIcon={<MdSave />} onClick={() => history('/admin/books/create')} size='large'>Adicionar livro</Button>
          </div>
        </div>
      </div>

      {!loading ?
        <table className='table table-hover table-striped text-center'>
          <thead>
            <tr className='small' style={{ fontWeight: 500 }}>
              <td>IMAGEM</td>
              <td>NOME</td>
              <td>DESCRIÇÃO</td>
              <td>GÊNERO</td>
              <td>PREÇO</td>
              <td>ESCRITOR</td>
              <td>PÁGINAS</td>
              <td>AÇÕES</td>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? books.map((item, index) => {
              const synopsis = handleSize(item.synopsis)
              const title = handleSize(item.title)
              return (
                <tr key={index} className=''>
                  <td>
                    <div style={{ width: 100, height: 100 }}>
                      <img className={`w-100 h-100 rounded pointer`} src={`${STORAGE_URL + '/' + item.thumb}`} alt="product" />
                    </div>
                  </td>
                  <td>{title.tooltip ? <Tooltip placement='top' arrow title={item.title}><p>{title.value}</p></Tooltip> : title.value}</td>
                  <td style={{ maxWidth: 200 }}>{synopsis.tooltip ?
                    <Tooltip placement='top' arrow title={item.synopsis}>
                      <p style={{ cursor: 'pointer' }}>{synopsis.value}</p>
                    </Tooltip> : synopsis.value
                  }
                  </td>
                  <td>{item.gender?.key}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{moneyMask(item.price)}</td>
                  <td>{item.writer}</td>
                  <td>{item.pages} Pg</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <IconButton color='secondary' onClick={() => history(`/admin/books/edit/${item.id}`)}><MdEdit /></IconButton>
                    <IconButton color='error' onClick={() => renderAlert({ id: item.id, item: 'livro', article: 'o', deleteFunction: handleDelete })}><MdDelete /></IconButton>
                  </td>
                </tr>
              )
            }) : <tr><td colSpan={8} className='text-center'>Sem dados encontrados!</td></tr>}
          </tbody>
        </table> : <div className='d-flex justify-content-center p-5'><CircularProgress /></div>
      }

      {books.length > 0 && pagination.totalItems &&
        <div className='d-flex justify-content-end'>
          <Pagination color='primary' shape="rounded" count={Math.ceil(pagination.totalItems / pagination.perPage)}
            page={pagination.pageNumber + 1} onChange={(e, page) => {
              window.scrollTo(0, 0); setPagination({ ...pagination, pageNumber: page - 1 }); setAllow(true)
            }
            } />
        </div>
      }
    </div>
  );
}

export default ListBooks