import Button from "@/app/components/Button";
import Image from "next/image";
import { Suspense } from "react";

const MyComponent = () => {
  return (
    <div className="padding tablet_padding">
      <h3 className="medium_font font_size_24">Manage Active Power Classes</h3>
      <div className="date_and_time_form_div card_border rounded py-3 px-3 px-xxl-5 px-xl-5 px-lg-5 px-md-5 mt-3">
        <div className="mb-4">
          <label
            htmlFor="exampleFormControlInput1 medium_font font_size_14"
            className="form-label"
          >
            Class Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Class Name"
            style={{ height: "55px" }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="exampleFormControlInput1 medium_font font_size_14"
            className="form-label"
          >
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="subject"
            style={{ height: "55px" }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="exampleFormControlInput1 medium_font font_size_14"
            className="form-label"
          >
            Duration
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="1 Hour"
            style={{ height: "55px" }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="exampleFormControlInput1 medium_font font_size_14"
            className="form-label"
          >
            Description
          </label>
          <textarea
            rows={7}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Description"
          />
        </div>
        <h3 className="medium_font font_size_20 my-4">Schedule</h3>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Start Date
              </label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
              >
                <option selected=""> 3 jan </option>
                <option value={1}>4 jan</option>
                <option value={2}>5 jan</option>
                <option value={3}>6 jan</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                End Date
              </label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
              >
                <option selected=""> 3 jan </option>
                <option value={1}>4 jan</option>
                <option value={2}>5 jan</option>
                <option value={3}>6 jan</option>
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Start Time
              </label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
              >
                <option selected=""> 3 jan </option>
                <option value={1}>4 jan</option>
                <option value={2}>5 jan</option>
                <option value={3}>6 jan</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                End Time
              </label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
              >
                <option selected=""> 3 jan </option>
                <option value={1}>4 jan</option>
                <option value={2}>5 jan</option>
                <option value={3}>6 jan</option>
              </select>
            </div>
          </div>
        </div>
        <h3 className="medium_font font_size_20 my-4">Upload Media</h3>

        <div className="settings_card_upload_photo_main_div my-4 w-100">
          <input type="file" id="fileUpload" className="file-upload-input" />
          <label htmlFor="fileUpload">
            <Image
              src={"/assets/images/dashboard/power-classes/card-image-3.png"}
              width={100}
              height={203}
              className="manage_active_upload_file rouned-3"
            />
          </label>
        </div>
        <div className="btn_div mt-5 mb-2">
          <Button text="Save Power Class" />
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
