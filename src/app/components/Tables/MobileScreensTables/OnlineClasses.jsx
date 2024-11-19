import Link from "next/link";

const OnlineClasses = () => {
    const tableData = [
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },

    ];
  return (
    <>
    <div className='mobile_screen_table d-flex justify-content-center'>
        <table className="my-5 medium_font font_size_14 ">
            <div className='border rounded'>
                {tableData.map((curData, index) => (
                    <div key={index} className='main_div border-bottom p-3'>
                        <thead>
                        <tr>
                            <th>Class</th>
                            <th>Subject</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th className="payment-header">Duration</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={index}>
                                <td><span> {curData.class} </span></td>
                                <td>{curData.subject}</td>
                                <td>{curData.start_time}</td>
                                <td>{curData.end_time}</td>
                                <td>
                                    <span>{curData.duration}</span>
                                </td>
                                <td className="icon_main_div">
                                    <Link className="text-decoration-none" href="#">
                                        <p className="medium_font font_size_12"> {curData.details} </p>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                ))}
            </div>
        </table>
    </div>
    <div className='mt-4 mb-3 text-center'>
        <Link href={'#'} class="btn load_more_btn">Load More</Link>
    </div>
</>
  )
}

export default OnlineClasses
