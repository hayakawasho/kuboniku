const rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/

/**
 * Parse value to data type.
 *
 * @link   https://github.com/jquery/jquery/blob/3.1.1/src/data.js
 * @param  {string} data - A value to convert.
 * @return {mixed}  Returns the value in its natural data type.
 */

function parseVal(data: any) {
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
 * @return  {Array} data
 */
export function getNodeDataType(node: HTMLElement) {
  const data: { [key: string]: string } = {}
  const attrs = node.dataset

  for (const i in attrs) {
    data[i] = parseVal(attrs[i])
  }

  return data
}
