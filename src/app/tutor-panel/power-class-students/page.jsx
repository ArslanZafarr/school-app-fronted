"use client"
import PowerClassesPagePagination from "@/app/components/Pagination/PowerClassesPagePagination"
import "./power-class-students.css"
import Image from "next/image"

const page = () => {

    return (

        <>

            <div className="power-class-students-heading">
                <h1>Students</h1>

            </div>


            <div
                className="power-class-students-content-wrapper"
            >



                <div
                    className="power-class-students-list"
                >

                    <div className="power-class-student">

                        <div
                            className="power-class-student-content"
                        >


                            <Image
                                src="/assets/images/teacher-panel/classes-content/card-image.png"
                                height={56}
                                width={56}
                                alt="student"
                            />
                            <div
                                className="power-class-student-content-inner"
                            >
                                <h5>Bilal Khan</h5>
                                <p>Class B</p>
                            </div>

                        </div>

                        <h5 className="power-class-student-email">student@gmail.com</h5>

                    </div>

                    <div className="power-class-student">

                        <div
                            className="power-class-student-content"
                        >


                            <Image
                                src="/assets/images/teacher-panel/classes-content/card-image.png"
                                height={56}
                                width={56}
                                alt="student"
                            />
                            <div
                                className="power-class-student-content-inner"
                            >
                                <h5>Bilal Khan</h5>
                                <p>Class B</p>
                            </div>

                        </div>

                        <h5 className="power-class-student-email">student@gmail.com</h5>

                    </div>


                    <div className="power-class-student">

                        <div
                            className="power-class-student-content"
                        >


                            <Image
                                src="/assets/images/teacher-panel/classes-content/card-image.png"
                                height={56}
                                width={56}
                                alt="student"
                            />
                            <div
                                className="power-class-student-content-inner"
                            >
                                <h5>Bilal Khan</h5>
                                <p>Class B</p>
                            </div>

                        </div>

                        <h5 className="power-class-student-email">student@gmail.com</h5>

                    </div>


                    <div className="power-class-student">

                        <div
                            className="power-class-student-content"
                        >


                            <Image
                                src="/assets/images/teacher-panel/classes-content/card-image.png"
                                height={56}
                                width={56}
                                alt="student"
                            />
                            <div
                                className="power-class-student-content-inner"
                            >
                                <h5>Bilal Khan</h5>
                                <p>Class B</p>
                            </div>

                        </div>

                        <h5 className="power-class-student-email">student@gmail.com</h5>

                    </div>


                    <div className="power-class-student">

                        <div
                            className="power-class-student-content"
                        >


                            <Image
                                src="/assets/images/teacher-panel/classes-content/card-image.png"
                                height={56}
                                width={56}
                                alt="student"
                            />
                            <div
                                className="power-class-student-content-inner"
                            >
                                <h5>Bilal Khan</h5>
                                <p>Class B</p>
                            </div>

                        </div>

                        <h5 className="power-class-student-email">student@gmail.com</h5>

                    </div>

                    <div className="power-class-student">

                        <div
                            className="power-class-student-content"
                        >


                            <Image
                                src="/assets/images/teacher-panel/classes-content/card-image.png"
                                height={56}
                                width={56}
                                alt="student"
                            />
                            <div
                                className="power-class-student-content-inner"
                            >
                                <h5>Bilal Khan</h5>
                                <p>Class B</p>
                            </div>

                        </div>

                        <h5 className="power-class-student-email">student@gmail.com</h5>

                    </div>

                    <div className="power-class-student">

                        <div
                            className="power-class-student-content"
                        >


                            <Image
                                src="/assets/images/teacher-panel/classes-content/card-image.png"
                                height={56}
                                width={56}
                                alt="student"
                            />
                            <div
                                className="power-class-student-content-inner"
                            >
                                <h5>Bilal Khan</h5>
                                <p>Class B</p>
                            </div>

                        </div>

                        <h5 className="power-class-student-email">student@gmail.com</h5>

                    </div>

                </div>


                <div className="active_power_classes_pagination_div mt-5">
                    <PowerClassesPagePagination />
                </div>

            </div>


        </>

    )
}

export default page
