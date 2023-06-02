import React from 'react'
import SaveIcon from '@mui/icons-material/Save';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Button, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const SavePreset = (props) => {
  const history = useNavigate()

  return (
    <div className="d-flex mt-5">
      <div className="align-self-center">
        <Button variant='contained' onClick={() => history(props.backPath)} startIcon={<ReplyAllIcon />}> Voltar</Button>
      </div>
      <div className="align-self-center ms-auto">
        <Button variant='contained' disabled={props.loading} onClick={props.handleSave} endIcon={props.loading ? <CircularProgress size={20} /> : <SaveIcon />}>{props.edit ? 'Editar' : 'Salvar'}</Button>
      </div>
    </div>
  )
}

export default SavePreset