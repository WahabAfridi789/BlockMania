import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

import CampaignCard from '../containers/explore-product/campaignCard'; // Import the CampaignCard component

const MyCampaigns = ({ campaign }) => { // Destructure the campaign prop
    console.log(campaign);

  return (
     <div className="container row">
              {campaign.map((product, index) => (
    <div className="col mb-4" key={index}>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12">
        <CampaignCard product={product} />
      </div>
    </div>
    ))}
    </div>
   
  );
}

export default MyCampaigns;
