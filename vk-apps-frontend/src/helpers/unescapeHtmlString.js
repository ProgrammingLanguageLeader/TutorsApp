const unescapeHtmlString = htmlEscapedString => {
  const parser = new DOMParser();
  const unescapedDocument = parser.parseFromString(htmlEscapedString, 'text/html');
  return unescapedDocument.documentElement.textContent;
};

export default unescapeHtmlString;