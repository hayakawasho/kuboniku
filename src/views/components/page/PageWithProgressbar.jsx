// @ts-nocheck
import { Progressbar } from '../Progressbar'

export const PageWithProgressbar = _props => {
  return (
    <>
      {props.children}
      <Progressbar />
    </>
  )
}
