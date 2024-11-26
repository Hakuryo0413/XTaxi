import React from 'react';
import './about.css';
import img1 from '@src/image/phone-hand.png';
import img2 from '@src/image/cab-file2.png';
import img3 from '@src/image/license-driver.png';

const About: React.FC = () => {
    return (
        <div className="about bg-primary">
            <section className="about-section">
                <div className="about-image">
                    <img src={img1} alt="image" />
                </div>
                <article className="about-article">
                    <h2>Xtaxi</h2>
                    <p> 
                    Xtaxi offers efficient, reliable LA taxi service to meet the transportation needs of residents, <br/>
                    visitors and our corporate clients. 
                    Our extensive service area includes HaNoi, HoChiMinh City Etc
                    </p>
                </article>
            </section>
            
            <section className="about-section">
                <div className="about-image">
                    <img src={img2} alt="Section 2" />
                </div>
                <article className="about-article">
                    <h2>Service</h2>
                    <p>
                    We offer a full range of taxi services. 
                    Call us for dependable service for airport shuttle,<br/> sightseeing tours, or for transportation to medical visits, social visits or shopping. <br/>
                    We offer corporate accounts, which provide businesses with a convenient method for<br/> managing their corporate transportation needs. 
                    Please contact us to learn more about <br/>starting a corporate account for airport shuttle service, driving your clients or other taxi services.
                    </p>
                </article>
            </section>
            
            <section className="about-section">
                <div className="about-image">
                    <img src={img3} alt="Section 3" />
                </div>
                <article className="about-article">
                    <h2>Our Taxi Cabs Are Licensed</h2>
                    <p>
                    Xtaxi, we employ only professional trained drivers. 
                    Our drivers are licensed and required <br/>to successfully complete a formal training program, which includes training in defensive <br/>driving and safety. 
                    In addition, we perform background checks and random drug testing to ensure<br/> your safety and give our customers the highest level of confidence in our reliable taxi service.
                    </p>
                </article>
            </section>
        </div>
    );
};

export default About;
