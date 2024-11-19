import Image from "next/image";
import "./add-faculty-card.css";
import Button from "../Button";

const AddFacultyCard = ({
  handleSubmit,
  classes,
  errors,
  handleChange,
  formData,
  tutor,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="add_faculty_card_div card_border rounded-4 p-xxl-4 p-xl-4 p-lg-4 p-md-4">
        <div className="add_faculty_select_div">
          <div className="select_div">
            <h3 className="medium_font font_size_14"> Power Class </h3>
            <select
              class="orange-select form-select form-select-lg mb-3 font_size_16"
              aria-label=".form-select-lg example"
              value={formData.power_class_id}
              onChange={handleChange}
              name="power_class_id"
            >
              <option selected>Select Power Class</option>
              {classes.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.class_name}
                </option>
              ))}
            </select>
            {errors.power_class_id && (
              <span className="text-danger">{errors.power_class_id}</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label medium_font font_size_16">
              Add Tutor
            </label>
            <select
              class="orange-select form-select form-select-lg mb-3 font_size_16"
              aria-label=".form-select-lg example"
              value={formData.tutor_id}
              onChange={handleChange}
              name="tutor_id"
            >
              <option selected>Select Tutor</option>
              {tutor.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.profile?.full_name}
                </option>
              ))}
            </select>
            {errors.tutor_id && (
              <span className="text-danger">{errors.tutor_id}</span>
            )}
          </div>
        </div>
        <div
          className="add_faculty_btn_div btn_div my-5"
          style={{ width: "190px" }}
        >
          <Button text="Save" className="" />
        </div>
      </div>
    </form>
  );
};

export default AddFacultyCard;
