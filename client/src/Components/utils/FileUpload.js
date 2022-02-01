import React, { useState } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'

function FileUpload() {

  const [images, setImages] = useState([])

  const dropHandler = (files) => {

    let formData = new FormData()

    const config = {
      header: {
        'content-type': 'multipart/form-data'
      }
    }
    formData.append("file", files[0])

    axios.post(`http://localhost:3001/post/images`, formData, config)
      .then((response) => {
        if (response.data.success) {
          setImages([...images, response.data.filePath])
        } else {
          alert('Failed to Save')
        }
      })
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({getRootProps, getInputProps}) => (
          <div
            style={{
              width: 300, height: 240, border: '1px solid lightgray',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            {...getRootProps()}
            >
            <input {...getInputProps()} />
            <div style={{ fontSize: '3rem' }}>+</div>
          </div>
        )}
      </Dropzone>
      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        {images.map((image, index) => {
          <div key={index}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:3001/${image}`}
            />
          </div>
        })}
      </div>
    </div>
  );
}

export default FileUpload;
