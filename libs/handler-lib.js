export default function handler(lambda) {
  return function (event, context) {
    return Promise.resolve()
      .then(() => lambda(event, context))
      .then((responseBody) => [200, responseBody])
      .catch((err) => [500, { error: err.message }])
      .then(([statusCode, body]) => ({
        statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body),
      }));
  };
}
