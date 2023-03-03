import { getCookie } from "./cookies"
import { useSelector } from 'react-redux'
import { API_URL } from "./variables";

export const get = async (path) => {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: "application/json",
    ...(token && { Authorization: "Bearer " + token }),
  };

  let response = await fetch(path, {
    method: "GET",
    headers: headers,
  })
    .then(async (res) => await res.json())
    .catch((err) => console.log("Error to get: " + err.message));

  return response;
};

export const POST = async ({ url, body }) => {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: "application/json",
    ...(!(body instanceof FormData) && { "Content-type": "application/json" }),
    ...(token && { Authorization: "Bearer " + token }),
  };

  console.log(headers);
  console.log(body);

  let httpCode;
  let response = await fetch(API_URL + '/' + url, {
    method: "POST",
    headers: headers,
    body: body,
  })
    .then(async (res) => {
      httpCode = res.status;
      return await res.json();
    })
    .catch((err) => console.log("Error to post: " + err.message));

  response["httpCode"] = httpCode;
  return response;
};

export const put = async (path, body) => {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: "application/json",
    ...(!(body instanceof FormData) && { "Content-type": "application/json" }),
    ...(token && { Authorization: "Bearer " + token }),
  };

  let response = await fetch(path, {
    method: "PUT",
    headers: headers,
    body: body,
  })
    .then(async (res) => await res.json())
    .catch((err) => console.log("Error to put: " + err.message));

  return response;
};

export const patch = async (path, body) => {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: "application/json",
    ...(!(body instanceof FormData) && { "Content-type": "application/json" }),
  };

  let response = await fetch(path, {
    method: "PATCH",
    headers: headers,
    body: body,
  })
    .then(async (res) => await res.json())
    .catch((err) => console.log("Error to patch: " + err.message));

  return response;
};

export const useDelete = async (path, body) => {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };

  let response = await fetch(path, {
    method: "DELETE",
    headers: headers,
    body: body,
  })
    .then(async (res) => await res.json())
    .catch((err) => console.log("Error to delete: " + err.message));

  return response;
};

export const DELETE = async (path) => {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + token
  };

  let response = await fetch(path, {
    method: "DELETE",
    headers: headers,
  })
    .then(async (res) => await res.json())
    .catch((err) => console.log("Error to delete: " + err.message));

  return response;
};

// ------------------------------------------------Newer-methods------------------------------------------------

export const GET_CEP = (value) => {
  const response = fetch(`https://viacep.com.br/ws/${value}/json/`)
    .then(async (json) => {
      const data = await json.json();

      if (data.hasOwnProperty("erro")) {
        // clearCEP();
        return "error";
      } else {
        return data;
      }
    })
    .catch((error) => {
      return error;
      // clearCEP();
      // setState({
      //   ...state,
      //   [item]: { ...state[item], value: "", error: true },
      // });
      // renderToast({ type: "error", error: "CEP inválido!" });
    });
  return response;
};
