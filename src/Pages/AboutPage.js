import React from 'react';

const AboutPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h1>About Us</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in pulvinar lectus, non tempus lectus. Nulla suscipit tincidunt libero sit amet eleifend. Sed porttitor urna vel enim posuere vestibulum.</p>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Lorem Ipsum</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut sapien eget ligula eleifend vulputate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;