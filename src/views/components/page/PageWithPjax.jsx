// @ts-nocheck

export const PageWithPjax = props => {
  return (
    <div className="l-window" data-taxi>
      <div className="l-content" data-taxi-view>
        {props.children}
      </div>
    </div>
  )
}
