const setError = (item, state, setState, indexCard) => {
  if (!state.value || (state.length ? Array.from(state.value).length < state.length : false)) {
   setState({...state, error: true, message: 'Número de caracteres inválidos'})
  }
}

export default setError
