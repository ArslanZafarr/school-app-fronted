import Link from 'next/link';
import './reset-password.css';
import '@/app/globals.css'
import Image from 'next/image';
import Button from '@/app/components/Button';

const Page = () => {
  return (
    <>
      <section className='login_section'>
        <div className='main_container'>
          <div className='sub_container d-none d-xxl-block d-xl-block d-lg-block d-md-block'>
            <Image className='login_image img-fluid' src="/assets/images/login-page/login-page-image.jpg" alt='image' width={960} height={900} />
          </div>
          <div className='sub_container '>
            <div className='login_form_container d-flex flex-column justify-content-center align-items-center h-100 w-100'>
              <div className='logo_div text-center'>
                <Image src='/assets/images/login-page/logo.png' alt='image' width={40} height={40} />
                <h5 className='mt-2'> Siksha Matic </h5>
              </div>
              <div className='login_text text-center mb-2 mt-5 my-xxl-5 my-xl-5 my-lg-5 my-md-5'>
                <h3 className='medium_font font_size_32 login_heading'> Reset Password </h3>
              </div>
              <form className='p-3 w-75 responsive_width'>
                <div className="mb-4">
                  <label htmlFor="userNameId" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Create New Password"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userNameId" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Your Password"
                  />
                </div>
              </form>
              <div className='p-3 w-75 responsive_width'>
                <Button className="loginBtn" text='Change Password' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
