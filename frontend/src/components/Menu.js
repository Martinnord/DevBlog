import { Editor } from 'slate-react'
import { Value } from 'slate'

import React from 'react'
import ReactDOM from 'react-dom'

class Menu extends React.Component {

  onClickMark(event, type) {
    const { value, onChange } = this.props
    event.preventDefault()
    const change = value.change().toggleMark(type)
    onChange(change)
  }

  hasMark(type) {
    // const { value } = this.props
    // return value.activeMarks.some(mark => mark.type == type)
  }

  renderMarkButton(type, icon) {
    const isActive = this.hasMark(type)
    const onMouseDown = event => this.onClickMark(event, type)

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  render() {
    return (
      <div className="menu hover-menu" ref={this.props.menuRef}>
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
      </div>
    )
  }
}

export default Menu
