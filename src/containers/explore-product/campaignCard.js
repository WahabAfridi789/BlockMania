// import React from 'react';
// import Link from 'next/link';

// const CampaignCard = (data) => {
//   const { product } = data;

//   const campaign = {
//     title: product.title,
//     description: product.description,
//     target: product.target,
//     deadline: product.deadline,
//     amountCollected: product.amountCollected,
//     image: product.image,
//     pId: product.pId,
//     owner: product.owner,
//   };

//   const daysLeft = (deadline) => {
//     const difference = new Date(deadline).getTime() - Date.now();
//     const remainingDays = difference / (1000 * 3600 * 24);
//     return remainingDays.toFixed(0);
//   };

//   return (
//     <div className="card mb-4" style={{ width: '300px' }}>
//      <Link href={{
//   pathname: '/campaignDetail',
//   query: { campaignData: JSON.stringify(campaign) }
// }}>
  
//     <img
//       src={campaign.image}
//       alt="campaign"
//       className="card-img-top"
//       style={{ height: '200px', objectFit: 'cover' }}
//     />
  
// </Link>
//       <div className="card-body bg-dark bg-gradient">
//         <h5 className="card-title">
//           {campaign.title.length > 10 ? campaign.title.substring(0, 10) + '...' : campaign.title}
//         </h5>
//         <p className="card-text">
//           {campaign.description.length > 10 ? campaign.description.substring(0, 10) + '...' : campaign.description}
//         </p>
//         <p className="card-text">
//           {daysLeft(campaign.deadline)} Days Left
//         </p>
//       </div>
//       <div className="card-footer d-flex justify-content-between bg-dark bg-gradient">
//         <button className="btn btn-success">Donate</button>
//         <button className="btn btn-info">Details</button>
//       </div>
//     </div>
//   );
// };

// export default CampaignCard;
import React from "react";
import Link from "next/link";

const CampaignCard = (data) => {
    const { product } = data;

    const campaign = {
        title: product.title,
        description: product.description,
        target: product.target,
        deadline: product.deadline,
        amountCollected: product.amountCollected,
        image: product.image,
        pId: product.pId,
        owner: product.owner,
    };

    const daysLeft = (deadline) => {
        const difference = new Date(deadline).getTime() - Date.now();
        const remainingDays = difference / (1000 * 3600 * 24);
        return remainingDays.toFixed(0);
    };

    // Check if the campaign's deadline has passed or is in negative days
    const isCampaignExpired = daysLeft(campaign.deadline) <= 0;

    if (isCampaignExpired) {
        // Don't render the card if the campaign is expired
        return null;
    }

    return (
        <div className="card mb-4" style={{ width: "300px" }}>
            <Link
                href={{
                    pathname: "/campaignDetail",
                    query: { campaignData: JSON.stringify(campaign) },
                }}
            >
                <img
                    src={campaign.image}
                    alt="campaign"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                />
            </Link>
            <div className="card-body bg-dark bg-gradient">
                <h5 className="card-title">
                    {campaign.title.length > 10
                        ? campaign.title.substring(0, 10) + "..."
                        : campaign.title}
                </h5>
                <p className="card-text">
                    {campaign.description.length > 10
                        ? campaign.description.substring(0, 10) + "..."
                        : campaign.description}
                </p>
                <p className="card-text">
                    {daysLeft(campaign.deadline)} Days Left
                </p>
            </div>
            <div className="card-footer d-flex justify-content-between bg-dark bg-gradient">
                   <Link
                href={{
                    pathname: "/campaignDetail",
                    query: { campaignData: JSON.stringify(campaign) },
                }}
            >
                <button className="btn btn-success">Donate</button>
            </Link>
                <Link
                    href={{
                        pathname: "/campaignDetail",
                        query: { campaignData: JSON.stringify(campaign) },
                    }}
                >
                    <button className="btn btn-info">Details</button>
                </Link>
            </div>
        </div>
    );
};

export default CampaignCard;
