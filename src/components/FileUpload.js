import React, { Component } from 'react'
import DropZone from 'react-dropzone'

class FileUpload extends Component {
  handleFileChange = file => {
    this.props.getProfileImage(file)
  }

  handleDrop = file => {
    const [{ preview }] = file
    console.log(file)
    this.setState({
      preview
    })
    this.handleFileChange([file])
  }

  render() {
    this.state = {
      preview: null
    }

    const { preview } = this.state
    const { children, disableClick } = this.props
    return (
      <div>
        <div>{preview && <img src={preview} alt="image preview" />}</div>
        <DropZone
          className="ignore"
          multiple={false}
          onDrop={this.handleFileChange}
          disableClick={disableClick}
        >
          {children}
        </DropZone>
      </div>
    )
  }
}

export default FileUpload
