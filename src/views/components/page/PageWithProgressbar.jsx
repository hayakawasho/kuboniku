// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
