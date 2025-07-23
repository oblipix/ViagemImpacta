import React from 'react';
import PackageDetails from '../components/PackageDetails';

function PackageDetailsPage({ packageData, onBack }) {
  return <PackageDetails packageData={packageData} onBack={onBack} />;
}

export default PackageDetailsPage;
