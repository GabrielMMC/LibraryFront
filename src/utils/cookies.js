export const setCookie = (key, value, secondsToExpiration = 1) => {
    const expirationDate = new Date(Date.now() + secondsToExpiration * 1000);
    document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()}`;
}

export const getCookie = (key) => {
    const cookies = document.cookie.replaceAll(" ", "").split(";");
    const response = cookies.find(x => x.startsWith(`${key}=`))?.split("=");
    if (response) return {
        key: response[0],
        value: response[1]
    }
    else return response;
}

export const deleteCookie = (key) => {
    const prevDate = new Date(0).toUTCString();
    document.cookie = `${key}=; expires=${prevDate}; path=/;`;
}