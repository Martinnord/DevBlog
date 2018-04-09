import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import '../routes/index.css'

class Menu extends Component {
  hasMark(type) {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type == type)
  }

  onClickMark(event, type) {
    const { value, onChange } = this.props
    event.preventDefault()
    const change = value.change().toggleMark(type)
    onChange(change)
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
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <div className="menu hover-menu" ref={this.props.menuRef}>
        {this.renderMarkButton('bold', 'Bold')}
        {this.renderMarkButton('italic', 'Italic')}
        {this.renderMarkButton('underlined', 'Underlined')}
        {this.renderMarkButton('code', 'Code')}
      </div>,
      root
    )
  }
}

class HoveringMenu extends Component {
  state = {
    value: this.props.value
  }

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  updateMenu = () => {
    const { value } = this.state
    const menu = this.menu
    if (!menu) return

    if (value.isBlurred || value.isEmpty) {
      menu.removeAttribute('style')
      return
    }

    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`
    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }

  onChange = ({ value }) => {
    this.props.updateValue(value)
    this.setState({ value })
  }

  menuRef = menu => {
    this.menu = menu
  }

  render() {
    console.log('updateValue', this.props.updateValue)

    return (
      <div>
        <Menu
          menuRef={this.menuRef}
          value={this.state.value}
          onChange={this.onChange}
        />
        <div className="editor">
          <Editor
            className={'post-content'}
            value={this.state.value}
            onChange={this.onChange}
            renderMark={this.renderMark}
          />
        </div>
      </div>
    )
  }

  renderMark = props => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold':
        return <strong>{children}</strong>
      case 'code':
        return <code>{children}</code>
      case 'italic':
        return <em>{children}</em>
      case 'underlined':
        return <u>{children}</u>
    }
  }
}

export default HoveringMenu
