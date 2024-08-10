import HeroSection from "../Components/Home/heroSection"
import SetItSection from "../Components/Home/SetItSection"
import Footer from "../Components/Home/Footer"
import Navbar2 from "../Components/Common/Navbar2";

function HomePage(){


    return (
        <div className="homePageSection">
              <Navbar2 />

       <HeroSection />

       <SetItSection />

       
       <Footer />
     
        </div>
    )
}

export default HomePage;