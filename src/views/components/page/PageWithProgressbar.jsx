// @ts-nocheck
import { Progressbar } from '../Progressbar'

export const PageWithProgressbar = props => {
  return (
    <>
      {props.progressbar || <Progressbar />}
      {props.children}
    </>
  )
}
