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
    document: { value: '', error: false, message: '', mask: '', length: 11 },
    password: { value: '', error: false, message: '', visible: false, length: 8 },
    confirmPassword: { value: '', error: false, message: '', visible: false, length: 8 },
  })

  const [address, setAddress] = React.useState({
    uf: { value: '', error: false, message: '' },
    number: { value: '', error: false, message: '' },
    bairro: { value: '', error: false, message: '' },
    localidade: { value: '', error: false, message: '' },
    logradouro: { value: '', error: false, message: '' },
    cep: { value: '', error: false, message: '', mask: '', length: 8 },

  })

  // -----------------------------------------------------------------
  //******************************************************************
  // -------------------------Saving-data-----------------------------
  const handleSave = async () => {
    // setLoadingSave(true)
    let emailError = false
    let otherErrors = false
    let addressErrors = false
    let passwordError = false
    let state2 = { ...state }
    let address2 = { ...address }

    if (state.password.value !== state.confirmPassword.value) {
      passwordError = true
      state2.password.error = true; state2.password.message = 'As senhas precisam ser iguais'
      state2.confirmPassword.error = true; state2.confirmPassword.message = 'As senhas precisam ser iguais'
    }

    if (!emailRegex().test(state.email.value)) {
      emailError = true
      state2.email.error = true
    }

    Object.keys({ ...state }).forEach(item => {
      if (!state[item].value || state[item].error) { otherErrors = true; state2[item].error = true }
    })

    Object.keys({ ...address }).forEach(item => {
      if (!address[item].value || address[item].error) { addressErrors = true; address2[item].error = true }
    })

    if (!otherErrors && !addressErrors && !emailError && !passwordError) {
      const response = await POST({
        url: 'users/create', body: JSON.stringify({
          "name": state.name.value,
          "email": state.email.value,
          "phone": state.phone.value,
          "document": state.document.value,
          "password": state.password.value,
          "zip_code": address.cep.value,
          "city": address.localidade.value,
          "state": address.uf.value,
          "nbhd": address.bairro.value,
          "number": address.number.value,
          "street": address.logradouro.value
        })
      })

      if (response.status) renderToast({ type: 'success', msg: 'Usuário cadastrado com sucesso!' })
      if (!response.status) renderToast({ type: 'error', msg: 'Erro ao cadatrar usuário!' })
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

  const handleAddressChange = (item, value, mask) => {
    let address2 = { ...address }
    address2[item].message = ''
    address2[item].error = false

    if (mask) {
      address2[item].value = mask(value).value
      address2[item].mask = mask(value).mask
    } else {
      address2[item].value = value
    }

    setAddress(address2)
  }


  const setError = (item, state, setState) => {
    if (!state[item].value) {
      if ((state[item].length && Array.from(state[item].value).length < state[item].length)) {
        setState({ ...state, [item]: { ...state[item], error: true, message: `Esse campo precisa de ${state[item].length} caracteres` } })
      } else {
        setState({ ...state, [item]: { ...state[item], error: true, message: `Campo em branco` } })
      }
    }
  }

  // -----------------------------------------------------------------
  //******************************************************************
  // -------------------------Zip-code-functions----------------------
  function handleCepChange(val) {
    val = val.replace(/\D/g, '')
    if (Array.from(val).length >= 8) {
      validateCep(val);
    } else {
      setAddress({ ...address, cep: { ...address.cep, value: val, error: false, message: '' } })
    }
  }

  async function validateCep(cep) {
    const endereco = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        return response;
      })
      .catch((error) => {
        setAddress({ ...address, cep: { ...address.cep, value: '', error: true, message: 'CEP inválido' } })
      })
    const data = await endereco.json();
    console.log('cep', data)
    if (data.hasOwnProperty('erro')) {
      setAddress({ ...address, cep: { ...address.cep, value: '', error: true, message: 'CEP não encontrado!' } })
    } else {
      let address2 = { ...address }
      let keys = Object.keys({ ...address })
      keys.forEach(item => {
        if (address2[item].value !== undefined) address2[item].value = data[item]
      })
      setAddress(address2)
      console.log('address', address2)
    }
  }



  return (
    <div className='p-3 w-1200'>
      <h6 className='display-6'>Usuário</h6>
      <p className='text-muted'>Cadastre um usuário para o seu sistema!</p>
      <hr />

      <div className="row mt-4 align-items-end">
        <span className="lead">Dados gerais</span>
        <div className="col-sm-4">
          <TextField fullWidth type='text' label={"Nome *"} error={Boolean(state.name.error)} value={state.name.value}
            onChange={({ target }) => handleChange('name', target.value)} onBlur={() => setError('name', state, setState)} />
        </div>

        <div className="col-sm-4">
          <TextField fullWidth type='email' label={"Email *"} error={Boolean(state.email.error)} value={state.email.value}
            onChange={({ target }) => handleChange('email', target.value)} onBlur={() => setError('email', state, setState)} />
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

      <div className="row mt-4">
        <div className="col-sm-3">
          <TextField fullWidth type='text' label={"CEP *"} error={Boolean(address.cep.error)} helperText={address.cep.message} value={address.cep.value}
            onChange={({ target }) => handleCepChange(target.value)} onBlur={() => setError('cep', address, setAddress)} />
        </div>
        <div className="col-sm-6">
          <TextField fullWidth type='text' label={"CPF *"} error={Boolean(state.document.error)} helperText={state.document.message} value={state.document.mask}
            onChange={({ target }) => handleChange('document', target.value, cpfMask)} onBlur={() => setError('document', state, setState)} />
        </div>
        <div className="col-sm-3">
          <TextField fullWidth type='text' label={"Telefone *"} error={Boolean(state.phone.error)} helperText={state.phone.message} value={state.phone.mask}
            onChange={({ target }) => handleChange('phone', target.value, phoneMask)} onBlur={() => setError('phone', state, setState)} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-sm-6">
          <TextField type={state.password.visible ? "text" : "password"} fullWidth label={"Confirmar senha *"} helperText={state.password.message} error={Boolean(state.password.error)}
            value={state.password.value} onChange={({ target }) => handleChange('password', target.value)} onBlur={() => setError('password', state, setState)}
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
            value={state.confirmPassword.value} onChange={({ target }) => handleChange('confirmPassword', target.value)} onBlur={() => setError('confirmPassword', state, setState)}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton onClick={() => setState({ ...state, confirmPassword: { ...state.confirmPassword, visible: !state.confirmPassword.visible } })}>
                    {state.confirmPassword.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>,
            }} />
        </div>
        {/* -----------------------------------------------------Address section-----------------------------------------------------*/}
        <div className="my-5">
          <p className="lead">Endereço</p>

          <div className="row mt-4">
            <div className="col-sm-3">
              <TextField fullWidth type='text' label={"Rua *"} error={Boolean(address.logradouro.error)} helperText={address.logradouro.message} value={address.logradouro.value}
                onChange={({ target }) => handleAddressChange('logradouro', target.value)} onBlur={() => setError('logradouro', address, setAddress)} />
            </div>

            <div className="col-sm-6">
              <TextField fullWidth type='text' label={"Bairro *"} error={Boolean(address.bairro.error)} helperText={address.bairro.message} value={address.bairro.value}
                onChange={({ target }) => handleAddressChange('bairro', target.value)} onBlur={() => setError('bairro', address, setAddress)} />
            </div>

            <div className="col-sm-3">
              <TextField fullWidth type='text' label={"Número *"} error={Boolean(address.number.error)} helperText={address.number.message} value={address.number.value}
                onChange={({ target }) => handleAddressChange('number', target.value)} onBlur={() => setError('number', address, setAddress)} />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-sm-4">
              <TextField fullWidth type='text' label={"Estado *"} error={Boolean(address.uf.error)} helperText={address.uf.message} value={address.uf.value}
                onChange={({ target }) => handleAddressChange('uf', target.value)} onBlur={() => setError('uf', address, setAddress)} />
            </div>

            <div className="col-sm-8">
              <TextField fullWidth type='text' label={"Cidade *"} error={Boolean(address.localidade.error)} helperText={address.localidade.message} value={address.localidade.value}
                onChange={({ target }) => handleAddressChange('localidade', target.value)} onBlur={() => setError('localidade', address, setAddress)} />
            </div>
          </div>

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