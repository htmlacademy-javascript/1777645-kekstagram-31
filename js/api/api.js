const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {GET_DATA: '/data', SEND_DATA: '/'};
const Method = {GET: 'GET', POST: 'POST'};
const ErrorText = {GET_DATA: 'He удалось загрузить данные. Попробуйте обновить страницу', SEND_DATA: 'He удалось отправить форму. Попробуйте ещё раз'};
const MessageClass = {SUCCESS: 'success', ERROR: 'error', DATA_ERROR: 'data-error'};

const loadData = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, body});
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch {
    throw new Error(errorText);
  }
};

const getData = () => loadData(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => loadData(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData, MessageClass};
