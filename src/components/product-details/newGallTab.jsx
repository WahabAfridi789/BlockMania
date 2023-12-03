import React from 'react'
import PropTypes from "prop-types";
import Image from "next/image";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";

const NewGallTab = ({ image }) => {
  console.log(image);
  return (
    <div className="product-tab-wrapper">
      <TabContainer defaultActiveKey="nav-0">
        <div className="pd-tab-inner">
          <TabContent className="rn-pd-content">
            <TabPane key={image} eventKey="nav-0">
              <div className="rn-pd-thumbnail">
                <Image
                  src={image}
                  alt="Product"
                  width={560}
                  height={560}
                  priority
                />
              </div>
            </TabPane>
          </TabContent>
        </div>
      </TabContainer>
    </div>
  );
};

NewGallTab.propTypes = {
  image: PropTypes.string, // Use string instead of array
};

export default NewGallTab