const getRandomElement = (arr) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
};

const getElementById = (arr, id) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');

  return arr.find((element) => element.id === id);
};

const getElementIndexById = (arr, id) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');

  return arr.findIndex((element) => element.id === id);
};

module.exports = {
  getRandomElement,
  getElementById,
  getElementIndexById,
};
