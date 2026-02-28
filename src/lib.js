export function APIURL(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`;
}

export function callApi(reqMethod, url, data, responseHandler, errorHandler) {

  fetch(url, { method: reqMethod })
    .then(response => response.json())
    .then(res => {
      if (res.cod !== 200) {
        throw new Error(res.message);
      }
      responseHandler(res);
    })
    .catch(err => errorHandler(err.message));
}