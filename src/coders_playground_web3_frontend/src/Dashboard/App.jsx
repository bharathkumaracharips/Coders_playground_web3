import React from 'react';
import { NavbarComp } from '../components/Navbar-comp';
import { About } from '../components/about-comp';
import { FeatureCarouselDemo } from '../components/features-comp';
import { Footer } from '../components/footer-comp';
import { Partners } from '../components/partners-comp';
const Dashboard = () => {
  return (
    <div>
      <NavbarComp />
      <About />
      <FeatureCarouselDemo />
      <Partners />
      <Footer />
    </div>
  );
};

export default Dashboard;