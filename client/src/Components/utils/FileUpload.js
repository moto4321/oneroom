import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function FileUpload(props) {

  const { id } = useParams()

  const [images, setImages] = useState([])
  const [storedImages, setStoredImages] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3001/post/images/${id}`)
    .then((response) => {
      const { result } = response.data
      setStoredImages(result)
    })
  }, [])

  const dropHandler = (files) => {

    let formData = new FormData()

    const config = {
      header: {
        'content-type': 'multipart/form-data'
      }
    }
    formData.append("file", files[0])

    if (props.editPost) {

      axios.post(`http://localhost:3001/post/images`, formData, config)
      .then((response) => {
        if (response.data.success) {
          setStoredImages([...storedImages, response.data.filePath])
          props.refreshFunction([...storedImages, response.data.filePath])
        } else {
          alert('Failed to Save')
        }
      })

    } else {
      axios.post(`http://localhost:3001/post/images`, formData, config)
      .then((response) => {
        if (response.data.success) {
          setImages([...images, response.data.filePath])
          props.refreshFunction([...images, response.data.filePath])
        } else {
          alert('Failed to Save')
        }
      })
    }
  }

  const deleteHandler = (image) => {

    if (props.editPost) {
      const currentIndex = storedImages.indexOf(image)

      let newStoredImages = [...storedImages]
      newStoredImages.splice(currentIndex, 1)

      setStoredImages(newStoredImages)
      props.refreshFunction(newStoredImages)
    } else {
      const currentIndex = images.indexOf(image)

      let newImages = [...images]
      newImages.splice(currentIndex, 1)

      setImages(newImages)
      props.refreshFunction(newImages)
    }
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
            <div style={{ fontSize: '1rem' }}>이미지를 추가하세요</div>
          </div>
        )}
      </Dropzone>
      { props.editPost ? (
        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        {storedImages.map((image, index) => (
          <div key={index}>
            <img 
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:3001/${image}`}
              onClick={() => {deleteHandler(image)}}
            />
            {/* {console.log(image)} */}
          </div>
        ))}
      </div>
      ) : (
        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        {images.map((image, index) => (
          <div key={index}>
            <img 
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:3001/${image}`}
              onClick={() => {deleteHandler(image)}}
            />
            {/* {console.log(image)} */}
          </div>
        ))}
      </div>
      )}

    </div>
  );
}

export default FileUpload;
