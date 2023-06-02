import React from 'react'
import useForm from '../../utils/useForm'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GET, POST, PUT } from '../../utils/requests'
import { renderToast } from '../../utils/Alerts'
import { STORAGE_URL } from '../../utils/variables'
import SavePreset from '../SavePreset'
import { moneyMask } from '../../utils/masks/currency'
import numberMask from '../../utils/masks/clearString'
import { TextField, Button, FormControl, MenuItem, InputLabel, Select } from '@mui/material'

const CreateBook = ({ edit }) => {
  const { form, setForm, errors, handleChange, handleBlur, setErrors, handleFileChange } = useForm({
    title: '',
    synopsis: '',
    price: '',
    gender_id: '',
    writer: '',
    pages: '',
    thumb: { value: '', url: '' }
  })
  const [genders, setGenders] = React.useState([])
  const [loadingSave, setLoadingSave] = React.useState(false)

  const history = useNavigate()

  React.useEffect(() => {
    const getData = async () => {
      const response = await GET({ url: 'genders' })
      setGenders(response.genders)
    }

    if (edit) {
      setForm({
        title: edit.book.title,
        synopsis: edit.book.synopsis,
        price: edit.book.price,
        gender_id: edit.book.gender_id,
        writer: edit.book.writer,
        pages: edit.book.pages,
        thumb: { value: '', url: edit.book.thumb }
      })
      setGenders(edit.genders)
    } else {
      getData()
    }
  }, [])

  const handleSave = async () => {
    let newErrors = {}
    let body = new FormData()

    Object.keys({ ...form }).forEach(item => {
      if (form[item]) body.append(item, form[item])
      else newErrors[item] = 'Campo em branco'

      if (item === 'price') body.append(item, numberMask(form[item]))
      if (item === 'thumb') body.append('thumb', form.thumb?.value)
    })

    if (Object.keys(newErrors).length === 0) {
      console.log('uai', newErrors)
      setLoadingSave(true)
      let response = ''

      if (edit) {
        body.append('id', edit.book.id)
        response = await POST({ url: 'books/update', body })
      }
      if (!edit) response = await POST({ url: 'books/create', body })
      // console.log('response', response)

      if (response.status) { renderToast({ type: 'success', msg: response.message }); history('/admin/books') }
      else renderToast({ type: 'error', msg: response.message })

      setLoadingSave(false)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <form className='p-3 w-1200' onSubmit={(e) => { e.preventDefault(); handleSave() }}>
      <h6 className='display-6'>Livros</h6>
      <p className='text-muted'>{edit ? 'Edite seu livro!' : 'Cadastre um livro para o seu sistema!'}</p>
      <hr />
      <div className="row my-4">
        <div className="col-sm-6">
          <TextField fullWidth name='title' label={"Título *"} value={form.title} helperText={errors?.title} onBlur={handleBlur} onChange={handleChange} error={Boolean(errors?.title)} />
        </div>

        <div className="col-sm-6">
          <TextField fullWidth name='writer' label={"Escritor *"} value={form.writer} helperText={errors?.writer} onBlur={handleBlur} onChange={handleChange} error={Boolean(errors?.writer)} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gênero *</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" name='gender_id' value={form.gender_id} helperText={errors?.gender_id} onBlur={handleBlur} label="Gênero *" onChange={handleChange} error={Boolean(errors?.gender_id)}>
              {genders.map(item => (
                <MenuItem value={item.id}>{item.key}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="col-sm-4">
          <TextField fullWidth name='price' label={"Preço *"} value={moneyMask(form.price)} helperText={errors?.price} onBlur={handleBlur} onChange={handleChange} error={Boolean(errors?.price)} />
        </div>

        <div className="col-sm-4">
          <TextField fullWidth name='pages' label={"Páginas *"} value={numberMask(form.pages)} helperText={errors?.pages} onBlur={handleBlur} onChange={handleChange} error={Boolean(errors?.pages)} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-sm-6">
          <TextField multiline rows={20} fullWidth name='synopsis' label={"Sinópse *"} value={form.synopsis} helperText={errors?.synopsis} onBlur={handleBlur} onChange={handleChange} error={Boolean(errors?.synopsis)} />
        </div>

        <div className='col-sm-6 m-auto' style={{ height: 494, maxWidth: 400 }}>
          <div className='h-100 w-100'>
            <Button className='square-file-button' fullWidth component="label">
              {form.thumb?.url
                ? <img src={form.thumb?.value ? form.thumb?.url : `${STORAGE_URL + '/' + form.thumb?.url}`} className='h-100 w-100' />
                : <p className='m-auto text-center'>Capa do livro</p>}
              <input hidden onChange={handleFileChange} name='thumb' accept="image/*" multiple type="file" />
            </Button>
          </div>
        </div>

        <SavePreset backPath={'/admin/books'} loading={loadingSave} handleSave={handleSave} edit={true} />
      </div>
    </form>
  )
}

export default CreateBook