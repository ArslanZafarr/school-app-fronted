import Button from '../Button';
import './zoom-links-card.css';

const ZoomLinksCard = () => {
    return (
        <div>
            <h3 className='medium_font font_size_18 d-block d-xxl-none d-xl-none d-lg-none d-md-none'>Zoom Links</h3>
            <div className='zoom_links_card border rounded p-3 m-3'>
                <h3 className='medium_font font_size_18 d-none d-xxl-block d-xl-block d-lg-block d-md-block'>Zoom Links</h3>
                <p className='font_size_14'>Organize educational subjects efficiently
                    through zoom links.</p>
                <div className="progress position-relative">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "90%" }}
                        aria-valuenow={90}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                    </div>
                </div>
                <div className='progress_bar_heading_div mt-2 d-flex justify-content-between align-items-center'>
                    <p className='progress_bar_heading text-success font_size_12'>Progress</p>
                    <p className='progress_bar_heading text-info font_size_12'>90%</p>
                </div>
                <div className='button'>
                    <Button text="Manage" className="zoom_links_btn font_size_14 mt-2" />
                </div>
            </div>
        </div>
    )
}

export default ZoomLinksCard
