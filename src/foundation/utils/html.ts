const rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/

/**
 * Parse value to data type.
 *
 * @link   https://github.com/jquery/jquery/blob/3.1.1/src/data.js
 * @param  {string} data - A value to convert.
 * @return {mixed}  Returns the value in its natural data type.
 */
export const getData = data => {
  if (data === 'true') {
    return true
  }

  if (data === 'false') {
    return false
  }

  if (data === 'null') {
    return null
  }

  // Only convert to a number if it doesn't change the string
  if (data === +data + '') {
    return +data
  }

  if (rbrace.test(data)) {
    return JSON.parse(data)
  }

  return data
}

/**
 * Get element data attributes
 * @param   {DOMElement}  node
 * @return  {Array}       data
 */
export const getNodeData = node => {
  const data: { [key: string]: string } = {}
  const attrs = node.dataset

  for (const i in attrs) {
    data[i] = getData(attrs[i])
  }

  return data
}

export const escapeHtml = str => {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Prepare HTML content that contains mustache characters for use with Ractive
 * @param  {string} str
 * @return {string}
 */
export const unescapeHtml = str => {
  return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
}
