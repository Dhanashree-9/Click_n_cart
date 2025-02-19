import { useContext } from "react";
import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import MyContext from "../../context/myContext";  // Import your context

const HomePage = () => {
    const { name, loading } = useContext(MyContext);  // Destructure to get `name` and `loading`

    return (
        <Layout>
            <HeroSection />
            <Category />
            <HomePageProductCard />
            <Track />
            <Testimonial />
            <div>{loading ? 'Loading...' : 'Content Loaded'}</div>
            <div>{name}</div>  {/* This will show 'Dhanashree Lomte' */}
        </Layout>
    );
}

export default HomePage;