import axios from "axios";

const getData = async (url) => {
  const {data} = await axios.get(url)
  return data
}

const getTodos = async (url) => {
  const {data} = await axios.get(url)
  return data
}

const getPosts = async (url) => {
  const {data} = await axios.get(url)
  return data
}

export {getData ,getTodos, getPosts};
