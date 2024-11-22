'use client'
import Link from 'next/link';
import { useState } from 'react';
import './forgot-password.css';
import '@/app/globals.css';
import Image from 'next/image';
import Button from '@/app/components/Button';

const Page = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter your email');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);

    try {


    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <section className='login_section'>
        <div className='main_container'>
          <div className='sub_container d-none d-xxl-block d-xl-block d-lg-block d-md-block'>
            <Image className='login_image img-fluid' src="/assets/images/login-page/login-page-image.jpg" alt='image' width={960} height={900} />
          </div>
          <div className='sub_container'>
            <div className='login_form_container d-flex flex-column justify-content-center align-items-center h-100 w-100'>
              <div className='logo_div text-center'>
                <Image src='/assets/images/login-page/logo.png' alt='image' width={40} height={40} />
                <h5 className='mt-2'>Brainlux</h5>
              </div>
              <div className='login_text text-center mb-2 mt-5 my-xxl-5 my-xl-5 my-lg-5 my-md-5'>
                <h3 className='medium_font font_size_32 login_heading'> Forgot Password </h3>
              </div>
              <form className='p-3 w-75 responsive_width' onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Enter Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='p-3 responsive_width'>
                  <Button className="loginBtn" text='Continue' type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
