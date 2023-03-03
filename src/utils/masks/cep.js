const cepMask = (value) => {
 value = value.replace(/\D/g, "");
 if (Array.from(value).length <= 8) {
  return { value, mask: value.replace(/(\d{5})(\d{3})/g, "$1-$2") }
 } else {
  return { value: value.substring(0, 8), mask: value.substring(0, 8).replace(/(\d{5})(\d{3})/g, "$1-$2") }
 }
};

export default cepMask