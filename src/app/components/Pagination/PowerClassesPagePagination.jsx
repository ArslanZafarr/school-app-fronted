import Link from 'next/link';
import './PowerClasses-Page-pagination.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PowerClassesPagePagination = () => {
    return (
        <>
            <div className="power_classes_pagination_div d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-around">
                        <li className="page-item">
                            <Link href="#" className="page-link rounded text-dark" aria-disabled="true">
                                <MdKeyboardArrowLeft />
                            </Link>
                        </li>
                        <ul className="pagination">
                            <li className="page-item">
                                <Link href="#" className="page-links">
                                    1
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link href="#" className="page-links">
                                    2
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link href="#" className="page-links">
                                    3
                                </Link>
                            </li>
                        </ul>
                        <li className="page-item ">
                            <Link href="#" className="page-link rounded text-dark">
                                <MdKeyboardArrowRight />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default PowerClassesPagePagination
