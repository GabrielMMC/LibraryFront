import React from 'react'
import { POST } from '../../utils/requests'
import { renderToast } from '../../utils/Alerts'
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { TextField, Button, IconButton, InputAdornment, CircularProgress } from '@mui/material'
import cpfMask from '../../utils/masks/cpf'
import phoneMask from '../../utils/masks/phone'
import cepMask from '../../utils/masks/cep'
import { emailRegex } from '../../utils/Regex'

const CreateUser = () => {
  // -------------------------------------------------------------------
  //********************************************************************
  // -------------------------States------------------------------------
  const [file, setFile] = React.useState('')
  const [loadingSave, setLoadingSave] = React.useState('')
  const [state, setState] = React.useState({
    name: { value: '', error: false, message: '' },
    email: { value: '', error: false, message: '' },
    phone: { value: '', error: false, message: '', mask: '', length: 10 },
    zip_code: { value: '', error: false, message: '', mask: '', length: 8 },
    document: { value: '', error: false, message: '', mask: '', length: 11 },
    password: { value: '', error: false, message: '', visible: false, length: 8 },
    confirmPassword: { value: '', error: false, message: '', visible: false, length: 8 },
  })
  const [name, setName] = React.useState({ value: '', error: false, message: '' })
  const [email, setEmail] = React.useState({ value: '', error: false, message: '' })
  const [phone, setPhone] = React.useState({ value: '', error: false, message: '', mask: '', length: 10 })
  const [zipCode, setZipCode] = React.useState({ value: '', error: false, message: '', mask: '', length: 8 })
  const [document, setDocument] = React.useState({ value: '', error: false, message: '', mask: '', length: 11 })
  const [password, setPassword] = React.useState({ value: '', error: false, message: '', visible: false, length: 8 })
  const [confirmPassword, setConfirmPassword] = React.useState({ value: '', error: false, message: '', visible: false, length: 8 })

  // -----------------------------------------------------------------
  //******************************************************************
  // -------------------------Saving-data-----------------------------
  const handleSave = async () => {
    setLoadingSave(true)
    let emailError = false
    let otherErrors = false
    let passwordError = false
    let state2 = { ...state }

    if (state.password.value !== state.confirmPassword.value) {
      passwordError = true
      state2.password.error = true; state2.password.message = 'As senhas precisam ser iguais'
      state2.confirmPassword.error = true; state2.confirmPassword.message = 'As senhas precisam ser iguais'
      // console.log('uais')
      // setState({
      //   ...state,
      //   password: { ...state.password, error: true, message: 'As senhas precisam ser iguais' },
      //   confirmPassword: { ...state.confirmPassword, error: true, message: 'As senhas precisam ser iguais' }
      // })
    }

    if (!emailRegex().test(state.email.value)) {
      emailError = true
      state2.email.error = true
    }

    Object.keys({ ...state }).forEach(item => {
      if (!state[item].value || state[item].error) { otherErrors = true; state2[item].error = true }
    })

    if (!otherErrors && !emailError && !passwordError) {
      const response = await POST({
        url: 'users/create', body: JSON.stringify({
          "name": state.name.value,
          "email": state.email.value,
          "zip_code": state.zip_code.value,
          "phone": state.phone.value,
          "document": state.document.value,
          "password": state.password.value
        })
      })

      if (response.status) renderToast({ type: 'success', msg: 'Usuário cadastrado com sucesso!' })
      if (!response.status) renderToast({ type: 'error', msg: 'Erro ao cadastrar usuário' })
    } else { console.log('errors', otherErrors, emailError, passwordError, state.password); setState(state2) }

    setLoadingSave(false)
  }

  // -----------------------------------------------------------------
  //******************************************************************
  // -------------------------Other-functions-------------------------
  const handleFileChange = (file) => {
    //Function to load an image with FileReader
    let fr = new FileReader()
    fr.onload = (e) => {
      //When load, an image URL is generated
      setFile({ value: file, url: e.target.result })
    }
    fr.readAsDataURL(file)
  }

  const handleChange = (item, value, mask) => {
    let state2 = { ...state }
    state2[item].message = ''
    state2[item].error = false

    if (mask) {
      state2[item].value = mask(value).value
      state2[item].mask = mask(value).mask
    } else {
      state2[item].value = value
    }

    setState(state2)
  }

  const setError = (item) => {
    if (!state[item].value || (state[item].length ? Array.from(state[item].value).length < state[item].length : false)) {
      setState({ ...state, [item]: { ...state[item], error: true, message: `Esse campo precisa de ${state[item].length} caracteres` } })
    }
  }


  return (
    <div className='box p-3'>
      <h6 className='display-6'>Usuário</h6>
      <p className='text-muted'>Cadastre um usuário para o seu sistema!</p>
      <hr />

      <div className="row my-5 align-items-end">
        <span className="lead">Dados gerais</span>
        <div className="col-sm-4">
          <TextField fullWidth type='text' label={"Nome *"} error={Boolean(state.name.error)} value={state.name.value}
            onChange={({ target }) => handleChange('name', target.value)} onBlur={() => setError('name')} />
        </div>

        <div className="col-sm-4">
          <TextField fullWidth type='email' label={"Email *"} error={Boolean(state.email.error)} value={state.email.value}
            onChange={({ target }) => handleChange('email', target.value)} onBlur={() => setError('email')} />
        </div>

        <div className="col-sm-4">
          <div style={{ width: 100, height: 100, margin: 'auto' }}>
            <Button className='file-button' component="label">
              {file?.url
                ? <img src={file.url} className='file-img' />
                : <p className='m-auto text-center'>Arquivo de imagem</p>}
              <input hidden onChange={(e) => handleFileChange(e.target.files[0])} accept="image/*" multiple type="file" />
            </Button>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-sm-3">
          <TextField fullWidth type='text' label={"CEP *"} error={Boolean(state.zip_code.error)} helperText={state.zip_code.message} value={state.zip_code.mask}
            onChange={({ target }) => handleChange('zip_code', target.value, cepMask)} onBlur={() => setError('zip_code')} />
        </div>
        <div className="col-sm-6">
          <TextField fullWidth type='text' label={"CPF *"} error={Boolean(state.document.error)} helperText={state.document.message} value={state.document.mask}
            onChange={({ target }) => handleChange('document', target.value, cpfMask)} onBlur={() => setError('document')} />
        </div>
        <div className="col-sm-3">
          <TextField fullWidth type='text' label={"Telefone *"} error={Boolean(state.phone.error)} helperText={state.phone.message} value={state.phone.mask}
            onChange={({ target }) => handleChange('phone', target.value, phoneMask)} onBlur={() => setError('phone')} />
        </div>
      </div>

      <div className="row my-5">
        <div className="col-sm-6">
          <TextField type={state.password.visible ? "text" : "password"} fullWidth label={"Confirmar senha *"} helperText={state.password.message} error={Boolean(state.password.error)}
            value={state.password.value} onChange={({ target }) => handleChange('password', target.value)} onBlur={() => setError('password')}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton onClick={() => setState({ ...state, password: { ...state.password, visible: !state.password.visible } })}>
                    {state.password.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>,
            }} />
        </div>
        <div className="col-sm-6">
          <TextField type={state.confirmPassword.visible ? "text" : "password"} fullWidth label={"Confirmar senha *"} helperText={state.confirmPassword.message} error={Boolean(state.confirmPassword.error)}
            value={state.confirmPassword.value} onChange={({ target }) => handleChange('confirmPassword', target.value)} onBlur={() => setError('confirmPassword')}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton onClick={() => setState({ ...state, confirmPassword: { ...state.confirmPassword, visible: !state.confirmPassword.visible } })}>
                    {state.confirmPassword.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>,
            }} />
        </div>
      </div>

      <div className="d-flex">
        <Button className='ms-auto' sx={{ minWidth: 87 }} variant='contained' disabled={Boolean(loadingSave)} onClick={handleSave}>
          {loadingSave ? <CircularProgress size={25} /> : "Salvar"}
        </Button>
      </div>
    </div>
  )
}

export default CreateUser