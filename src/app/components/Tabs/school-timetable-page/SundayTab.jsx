import React from 'react'
import Button from '../../Button'
import Image from 'next/image'

const Sunday = () => {
  return (
    <div className='create_timetable_card card_border rounded p-4 mt-3'>
   <div className='row'>
        <div className='col-6'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Start Time
            </label>
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Large select example"
            >
              <option selected="">Open this select menu</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>

          </div>
        </div>
        <div className='col-6'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              End Time
            </label>
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Large select example"
            >
              <option selected="">Open this select menu</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>

          </div>
        </div>
      </div>

    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        No of Hours
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder='Teacher'
      />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Add Subject
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder='Subject'
      />
    </div>
    <div style={{ width: '200px' }}>
        <button type="button" class="btn btn_outline my-3">Add more subject</button>
      </div>
      <div className='content_upload_card mb-3'>
        <div className='upload_file_div '>
          <h3 className='medium_font font_size_18 mb-4'> Upload Media </h3>
          <div className='upload_file_area'>
            <div className='upload_file_content_area'>
              <input type="file" id="fileUpload" className="file-upload-input" />
              <label htmlFor="fileUpload" className='d-flex flex-column justify-content-center align-items-center' style={{ height: '200px' }}>
                <Image className='mb-3 cursor_image' src="/assets/images/dashboard/content-upload/Upload-icon.png" alt='image' width={50} height={50} />
                <p className='medium_font font_size_16 mb-1'> Drag & drop files or Browse </p>
                <p className='font_size_14 text_muted'> Supported formats: JPEG, PNG </p>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='btn_div'>
        <Button text="Save" className="my-4" />
      </div>
  </div>
  )
}

export default Sunday
