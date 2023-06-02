import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, Button, LinearProgress, TextField, Icon } from '@mui/material'
import { login } from '../actions/AppActions'
import { GET, POST } from '../../utils/requests'
import { useDispatch } from 'react-redux'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { emailRegex } from '../../utils/Regex'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'

const Login = () => {
  const [email, setEmail] = React.useState({ value: '', error: false, message: '' })
  const [password, setPassword] = React.useState({ value: '', error: false, visible: false, message: '' })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const history = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setLoading(true); setError(false)
    let emailError = false; let passwordError = false

    if (!emailRegex().test(email.value)) {
      emailError = true
      setEmail({ value: '', error: true, message: 'E-mail inválido' })
    }
    if (Array.from(password.value).length < 8) {
      passwordError = true
      setPassword({ ...password, error: true, message: 'Senha menor que 8 caracteres' })
    }

    if (!emailError && !passwordError) {
      const response = await POST({ url: 'auth/login', body: JSON.stringify({ email: email.value, password: password.value }) });

      if (response.status) {
        localStorage.setItem("token", response?.access_token);
        localStorage.setItem("user", JSON.stringify(response?.user));
        dispatch(login({ token: response?.access_token, user: response?.user }));


        if (response?.user?.email === 'admin@admin.com') history("/admin/books")
        else history("/")
      }
      else {
        setError(true)
        setEmail({ ...email, value: '', error: true })
        setPassword({ ...password, value: '', error: true })
      }
    }
    setLoading(false)
  }
  const google = window.google;

  React.useEffect(() => {
    google.accounts.id.initialize({
      client_id: "939893131871-dsfd6cgab78a5efsmhd6maak5891t319.apps.googleusercontent.com",
      callback: handleCallbackResponse,
      scope: ''
    })

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: 'outline', size: 'large' }
    )

    google.accounts.id.prompt()
  }, [])

  const handleCallbackResponse = async (resp) => {
    console.log('resp', resp)
  }

  return (
    <div className='d-flex vh-100 align-items-center' style={{ overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
      <div className="p-sm-5 p-3 rounded shadow m-auto bg-white" style={{ width: 500 }}>
        {/* <div style={{ height: '30%' }}>
          <img src={`${URL}/banner.png`} className='img-fluid' alt="logo" />
        </div> */}
        <div style={{ marginTop: loading ? 16 : 44 }}>
          {loading && <LinearProgress />}
          {error && <Alert variant="filled" severity="error">Usuário ou senha incorretos!</Alert>}

          <div className="my-4">
            <TextField fullWidth label={"Email *"} variant={"standard"} error={Boolean(email.error)} helperText={email.message}
              value={email.value} onChange={({ target }) => setEmail({ ...email, value: target.value, error: false, message: '' })} />
          </div>

          <div className="my-4 d-flex">
            <TextField type={password.visible ? "text" : "password"} fullWidth label={"Senha *"} variant={"standard"} error={Boolean(password.error)} helperText={password.message}
              value={password.value} onChange={({ target }) => setPassword({ ...password, value: target.value, error: false, message: '' })} />

            <Icon sx={{ cursor: "pointer" }} onClick={() => setPassword({ ...password, visible: !password.visible })}
              component={password.visible ? VisibilityIcon : VisibilityOffIcon} />
          </div>
        </div>
        <div className="my-3">
          <div id="buttonDiv"></div>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <span className='align-self-end me-3'>Não tem uma conta? <Link to={"/Register"}>Registre-se</Link></span>
          <Button variant='contained' size='large' onClick={handleSubmit}>Salvar</Button>
        </div>
      </div>
    </div>
  )
}

export default Login