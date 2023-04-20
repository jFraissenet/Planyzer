import axios from 'axios';

export async function HttpRequest(
  url: string,
  type: string,
  body?: object | Array<number>
) {
  const header: object = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if (type === 'get') {
    console.log('Url : ' + url);
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((ex) => console.log('Erreur Http : ' + ex.message));
  }
}
