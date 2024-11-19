import "./total-students-widget.css";

const TotalStudentsWidget = ({ classes }) => {
  return (
    <>
      <div className="total_students_widget_card border rounded p-4 m-4">
        <h3 className="semiBol_font font_size_20 mb-3">Total Students</h3>
        {classes.map((curData, index) => (
          <div
            key={index}
            className="sub_widget border-bottom py-4 d-flex justify-content-between align-items-center"
          >
            <div className="d-flex justify-content-center">
              <div
                className="icon_div border rounded-circle p-2"
                style={{
                  borderColor: `${curData.color}!important`,
                  color: curData.color,
                }}
              >
                {index + 1}
              </div>
              <div>
                <p className="font_size_16 ms-3 m-0">Class {curData.grade}</p>
              </div>
            </div>
            <div className="text_div" style={{ color: curData.color }}>
              <p className="font_size_14 m-0">
                {curData.students_count} Students
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TotalStudentsWidget;
