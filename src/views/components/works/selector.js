// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { cdate } from 'cdate'

export const selectYear = data => {
  return cdate(data.createAt).format('MMMM D, YYYY')
}

export const selectRole = data => {
  return data.role.join(' / ')
}

export const selectProjectNumber = num => {
  return num.toString().padStart(2, '0')
}
