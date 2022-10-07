function getParameter(parameterName) {
  let parameters = new URLSearchParams(window.location.search);
  if (parameters.has(parameterName)) {
    return parameters.get(parameterName);
  }
  return `The parameter ${parameterName} HASN'T been found!`;
}
