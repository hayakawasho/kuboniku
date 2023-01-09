import { cdate } from 'cdate'

export const zeroPadding = (num, pad = 2) => {
  return num.toString().padStart(pad, '0')
}

export const selectYear = metadata => {
  return cdate(metadata.createAt).format('MMMM D, YYYY')
}

export const selectRole = metadata => {
  return metadata.role.join(' / ')
}
