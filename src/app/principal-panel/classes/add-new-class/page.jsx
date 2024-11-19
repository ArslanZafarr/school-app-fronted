'use client'
import Button from '@/app/components/Button';
import './add-new-student.css';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useCreateClassMutation } from '@/redux/features/principal-panel/classes/ClassesApi';
import { useState, useEffect } from 'react';

const Page = () => {
    const initialFormData = {
        grade: '',
        school_id: ''
    };

    const [createClass, { isLoading, isError }] = useCreateClassMutation();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        const storedSchoolId = localStorage.getItem('school_Id');
        if (storedSchoolId) {
            setFormData(prevFormData => ({
                ...prevFormData,
                school_id: storedSchoolId
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const tempErrors = {};

        if (!formData.grade) tempErrors.grade = 'Grade is required';
        if (!formData.school_id) tempErrors.school_id = 'School ID is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();
        for (const key in formData) {
            formPayload.append(key, formData[key]);
        }

        if (validateForm()) {
            try {
                const response = await createClass(formPayload).unwrap();
                toast.success('Data submitted successfully.');
                setFormData(initialFormData);
                setErrors({});
                router.push('/principal-panel/classes');
            } catch (error) {
                const message = error.data?.message || 'Invalid data';
                toast.error(message);
                console.log(error);
            }
        } else {
            console.log("Validation failed");
        }
    };

    if (isLoading) return (<div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}><h1>Loading...</h1></div>);
    if (isError) return (<div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}><h1>Error occurred...</h1></div>);

    return (
        <div className='add_new_teacher_main_div padding tablet_padding'>
            <div className='teachers_div'>
                <div className="teachers_heading d-flex justify-content-between align-items-center mb-3">
                    <h2 className="medium_font font_size_24"> Add New Class </h2>
                </div>
            </div>
            <div className='inputs_div card_border rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="grade" className="form-label medium_font font_size_16">
                            Grade
                        </label>
                        <input
                            type="text"
                            name='grade'
                            value={formData.grade}
                            onChange={handleChange}
                            className={`form-control ${errors.grade ? 'is-invalid' : ''}`}
                            id="grade"
                            placeholder='Enter grade'
                        />
                        {errors.grade && <div className="invalid-feedback">{errors.grade}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="school_id" className="form-label medium_font font_size_16">
                            School ID
                        </label>
                        <input
                            type="text"
                            name='school_id'
                            value={formData.school_id}
                            onChange={handleChange}
                            className={`form-control ${errors.school_id ? 'is-invalid' : ''}`}
                            id="school_id"
                            placeholder='Enter school ID'
                            disabled
                        />
                        {errors.school_id && <div className="invalid-feedback">{errors.school_id}</div>}
                    </div>

                    <div className='btn_div mt-5 mb-3' style={{ width: '200px' }}>
                        <Button text="Add Class" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
