async function getPhotos (
  event: any,
  context: any
) {
  return {
    statusCode: 200,
    body: 'Hello from lambda, it is alive',
  };
};

export { getPhotos };