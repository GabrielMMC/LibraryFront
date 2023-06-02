import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, Button, LinearProgress, TextField, Icon } from '@mui/material'
import { login } from '../actions/AppActions'
import { POST } from '../../utils/requests'
import { useDispatch } from 'react-redux'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { renderToast } from '../../utils/Alerts'

const Register = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)

  const [name, setName] = React.useState({ value: '', error: false })
  const [email, setEmail] = React.useState({ value: '', error: false })
  const [password, setPassword] = React.useState({ value: '', error: false, visible: false })
  const [confirmPassword, setConfirmPassword] = React.useState({ value: '', error: false, visible: false })

  const history = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    let error = false
    if (name.value === '' || email.value === '' || password.value === '' || confirmPassword.value === '') error = 'Campos em branco'
    if (password.value !== confirmPassword.value) error = 'Senhas diferentes'

    if (!error) {
      const response = await POST({
        url: 'auth/register', body: JSON.stringify({
          name: name.value, email: email.value, password: password.value, confirm_password: confirmPassword.value
        })
      });

      if (response.status) {
        history("/login")
      }
      else { renderToast({ type: 'error', msg: 'Email já cadastrado na base de dados' }) }
    } else { renderToast({ type: 'error', msg: error }) }
  }

  return (
    <div className='d-flex vh-100 align-items-center' style={{ overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
      <div className="p-sm-5 p-3 rounded shadow m-auto bg-white" style={{ width: 500 }}>
        <div style={{ height: '30%' }}>
          <img src={`${URL}/banner.png`} className='img-fluid' alt="logo" />
        </div>
        <div style={{ marginTop: loading ? 16 : 44 }}>
          {loading && <LinearProgress />}
          {error && <Alert variant="filled" severity="error">Houve um erro, tente novamente mais tarde!</Alert>}

          <div className="my-4">
            <TextField fullWidth label={"Nome *"} variant={"standard"} error={Boolean(name.error)}
              value={name.value} onChange={({ target }) => setName({ value: target.value, error: false })} />
          </div>

          <div className="my-4">
            <TextField fullWidth type='email' label={"Email *"} variant={"standard"} error={Boolean(email.error)}
              value={email.value} onChange={({ target }) => setEmail({ value: target.value, error: false })} />
          </div>

          <div className="my-4 d-flex">
            <TextField type={password.visible ? "text" : "password"} fullWidth label={"Senha *"} variant={"standard"} error={Boolean(password.error)}
              value={password.value} onChange={({ target }) => setPassword({ ...password, value: target.value, error: false })} />

            <Icon sx={{ cursor: "pointer" }} onClick={() => setPassword({ ...password, visible: !password.visible })}
              component={password.visible ? VisibilityIcon : VisibilityOffIcon} />
          </div>

          <div className="my-4 d-flex">
            <TextField type={confirmPassword.visible ? "text" : "password"} fullWidth label={"Confirmar senha *"} variant={"standard"} error={Boolean(confirmPassword.error)}
              value={confirmPassword.value} onChange={({ target }) => setConfirmPassword({ ...confirmPassword, value: target.value, error: false })} />

            <Icon sx={{ cursor: "pointer" }} onClick={() => setConfirmPassword({ ...confirmPassword, visible: !confirmPassword.visible })}
              component={confirmPassword.visible ? VisibilityIcon : VisibilityOffIcon} />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <span className='align-self-end me-3'>Já possui uma conta? <Link to={"/login"}> vá para o login</Link></span>
          <Button variant='contained' size='large' onClick={handleSubmit}>Salvar</Button>
        </div>
      </div>
    </div>
  )
}

export default Register