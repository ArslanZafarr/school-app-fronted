"use client";
import { useParams } from 'next/navigation';
import Button from '@/app/components/Button';
import './add-school-details.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { useSchoolUserQuery, useSchoolUsersQuery, useUpdateSchoolUserMutation } from '@/redux/features/admin-panel/school-management/schoolManagementApi';

const Page = () => {
  const initialFormData = {
    school_name: '',
  };

  const router = useRouter();
  const id = useParams()['update-school-details'];
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const { data: getSchoolUser, isLoading, isError } = useSchoolUserQuery(id);
  const [updateSchool] = useUpdateSchoolUserMutation();
  const { refetch } = useSchoolUsersQuery();

  useEffect(() => {
    if (getSchoolUser) {
      setFormData({
        school_name: getSchoolUser.school.school_name || '',
      });
    }
  }, [getSchoolUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.school_name) tempErrors.school_name = "School name is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }

      try {

        const response = await updateSchool({ id: id, userData: formPayload }).unwrap();
        console.log("🚀 ~ handleSubmit ~ response:", response);
        toast.success(response.message || 'Data updated successfully.');
        setFormData(initialFormData);
        setErrors({});
        refetch();
        router.push('/admin-panel/school-management')
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
  if (isError) return (<div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}><h1>Error loading data</h1></div>);

  return (
    <>
      <div className="school_details_div">
        <div className='school_details_heading'>
          <h2 className='medium_font font_size_24 mb-5'> Update School Details </h2>
        </div>

        <div className='card_border rounded p-xxl-4 p-xl-4 p-lg-4 p-md-4'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="school_name" className="form-label medium_font font_size_16">
                School Name
              </label>
              <input
                type="text"
                name='school_name'
                value={formData.school_name}
                onChange={handleChange}
                placeholder='Enter a name'
                className="form-control"
                id="school_name"
              />
              {errors.school_name && <span className="text-danger">{errors.school_name}</span>}
            </div>
            <div className='Button_div btn_div mt-5' style={{ width: '150px' }}>
              <Button text="Update" type={'submit'} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
