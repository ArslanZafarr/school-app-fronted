import Image from "next/image";
import Link from "next/link";
import './logout.css';

const Logout = () => {
    return (
        <div>
            {/* Button trigger modal */}
            <Link href={'#'}
                type="button"
                className="btn hover_color text-dark logout_btn"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                <span>
                    <Image className="me-3" src="/assets/images/dashboard/logout.png" width={20} height={20} alt="image" />
                    Log out
                </span>
            </Link>

            {/* Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content p-3">
                        <div className="modal-header border-0">
                            <h1 className="medium_font font_size_22" id="staticBackdropLabel">
                                Log out
                            </h1>
                        </div>
                        <div className="modal-body">
                            <p className="font_size_18">You are about to log out of Siksha Matic. Are you sure?</p>
                        </div>
                        <div className="modal-footer border-0">
                            <Link href={'#'}
                                type="button"
                                className="btn modal_btn_2"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </Link>
                            <Link href={'#'} type="button" className="btn modal_btn rounded-3">
                                Confirm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logout;
