import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import aos
import Aos from 'aos';
import 'aos/dist/aos.css';

// Import components
import Header from './components/landingpage/Header';
import Footer from './components/landingpage/Footer';
import Hero from './components/landingpage/Hero';
import Overview from './components/landingpage/Overview';
import Brands from './components/landingpage/Brands';
import Feature1 from './components/landingpage/Feature1';
import Feature2 from './components/landingpage/Feature2';
import Feature3 from './components/landingpage/Feature3';
import Product from './components/landingpage/Product';
import Pricing from './components/landingpage/Pricing';
import Testimonials from './components/landingpage/Testimonials';
import Cta from './components/landingpage/Cta';

// Import Pages
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/dashboard/pages/Home/Home';

// Layout logic based on current location
const Layout = ({ children }) => {
  const location = useLocation();

  // Chỉ hiển thị Header và Footer ở landing page (`/`)
  const showHeaderFooter = location.pathname === '/';

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  // Initialize aos
  React.useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Landing page */}
          <Route
            path='/'
            element={
              <>
                <Hero />
                <Overview />
                <Brands />
                <Feature1 />
                <Feature2 />
                <Feature3 />
                <Product />
                <Pricing />
                <Testimonials />
                <Cta />
              </>
            }
          />
          {/* Login page */}
          <Route path='/login' element={<Login />} />
          {/* Register page */}
          <Route path='/register' element={<Register />} />
          {/* Dashboard page */}
          <Route path='/dashboard' element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
