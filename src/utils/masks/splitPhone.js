const splitNumber = (value) => {
 console.log('value', value)
 const area = value.mask.match(/\([^)\d]*(\d+)[^)\d]*\)/g)[0].replace(/\D/g, '')
 const numb = value.mask.substring(value.mask.indexOf(")") + 1).replace(/\D/g, '')

 return { area, numb }
}

export default splitNumber