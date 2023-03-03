const formatDate = (date_to_format) => {
  let temp_date = new Date(
    date_to_format
      .replace(/-/g, "/")
      .replace(/T.+/, "")
  );
  return temp_date.toLocaleDateString("pt-BR");
};

export default formatDate;