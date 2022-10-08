function getParameter(nameOfParameter) {
  let parameters = new URLSearchParams(window.location.search);
  if (parameters.has(nameOfParameter)) {
    return parameters.get(nameOfParameter);
  }
  return `The parameter ${nameOfParameter} HASN'T been found!`;
}
