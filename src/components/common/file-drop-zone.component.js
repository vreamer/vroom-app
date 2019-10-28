import React from 'react'
import {useDropzone} from 'react-dropzone'
import './file-drop-zone.component.css'

export const FileDropZone = ({onDrop, accept}) => {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept})

  return (
    <div className='file-dropzone' {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='dropzone-text'>
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drop File or Click to Upload</p>
      }
      </div>
    </div>
  )
}