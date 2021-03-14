function getParams() {
  return JSON.parse(localStorage.getItem("routerParams"));
}

export default {
  getParams
}
