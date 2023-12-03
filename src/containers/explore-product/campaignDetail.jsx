import React from 'react';

const CampaignDetails = () => {
  return (
    <div>
      {/* Loader */}
      <div>Loading...</div>

      <div className="w-full row flex-md-row flex-column mt-4 gap-3">
        <div className="col-md-7 col-12">
          <img src="campaign_image_url.jpg" alt="campaign" className="w-100 h-100 object-cover rounded-xl" />
          <div className="w-100 bg-secondary mt-2">
            <div className="w-100 bg-success" style={{ width: '50%', maxWidth: '100%' }}>
            </div>
          </div>
        </div>

        <div className="col-md-5 col-12 d-flex flex-column gap-3">
          <div>
            <h4 className="font-weight-bold fs-5 text-white text-uppercase">Creator</h4>
            <div className="mt-3 d-flex flex-row align-items-center gap-3">
              <div className="w-52 h-52 d-flex justify-content-center align-items-center rounded-circle bg-dark cursor-pointer">
                <img src="user_image_url.jpg" alt="user" className="w-60 h-60 object-fit" />
              </div>
              <div>
                <h4 className="font-weight-bold fs-6 text-white break-all">John Doe</h4>
                <p className="mt-1 font-italic fs-7 text-muted">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-weight-bold fs-5 text-white text-uppercase">Story</h4>
            <div className="mt-3">
              <p className="font-italic fs-6 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>

          <div>
            <h4 className="font-weight-bold fs-5 text-white text-uppercase">Donators</h4>
            <div className="mt-3 d-flex flex-column gap-2">
              <p className="font-italic fs-6 text-muted">1. Donator1</p>
              <p className="font-italic fs-6 text-muted">2. Donator2</p>
              <p className="font-italic fs-6 text-muted">3. Donator3</p>
            </div>
          </div>
        </div>

        <div className="col-lg-5 col-12">
          <h4 className="font-weight-bold fs-5 text-white text-uppercase">Fund</h4>
          <div className="mt-3 p-4 bg-dark rounded">
            <p className="font-weight-medium fs-5 text-center text-muted">
              Fund the campaign
            </p>
            <div className="mt-3">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-100 py-2 px-3 border border-dark bg-transparent text-white fs-5 placeholder-text-muted rounded"
                value="0.1"
                onChange={(e) => {}}
              />

              <div className="my-3 p-4 bg-secondary rounded">
                <h4 className="font-weight-bold fs-6 text-white">Back it because you believe in it.</h4>
                <p className="mt-3 font-italic fs-6 text-muted">Support the project for no reward, just because it speaks to you.</p>
              </div>

              <button className="btn btn-primary w-100" onClick={() => {}}>
                Fund Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
