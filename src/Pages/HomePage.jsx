import Navbar from "../Components/Common/Navbar";
import HeroSection from "../Components/Home/heroSection"
import SetItSection from "../Components/Home/SetItSection"
import Footer from "../Components/Home/Footer"

function HomePage(){


    return (
        <div className="homePageSection">
              <Navbar />

       <HeroSection />

       <SetItSection />

       
       <Footer />
     
        </div>
    )
}

export default HomePage;