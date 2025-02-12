import { Link } from 'react-router-dom';
import './homePage.scss';
import MainCategories from '../../components/MainCategories/MainCategories';
import FeaturedPosts from '../../components/FeaturedPosts/FeaturedPosts';
import PostList from '../../components/PostList/PostList';

const HomePage = () => {
    return (
        <div className="homePage">
            <div className="homeContent">
                <Link to="/">Home</Link>
                <span>•</span>
                <span className="title">Blogs and Articles</span>
            </div>
            <div className="main">
                <div className="titleContent">
                    <h1 className="hTitle">
                        Lorem ipsum dolor sit amet consectetur.
                    </h1>
                    <p className="pTitle">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolorem quisquam impedit maiores?
                    </p>
                </div>
                <Link to="write" className="write">
                    <svg
                        viewBox="0 0 200 200"
                        width="200"
                        height="200"
                        className="svgCircle"
                    >
                        <path
                            id="circlePath"
                            fill="none"
                            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                        />
                        <text>
                            <textPath href="#circlePath" startOffset="0%">
                                Write your story •
                            </textPath>
                            <textPath href="#circlePath" startOffset="50%">
                                Share your idea •
                            </textPath>
                        </text>
                    </svg>
                    <button className="btnCenter">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="50"
                            height="50"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                        >
                            <line x1="6" y1="18" x2="18" y2="6" />
                            <polyline points="9 6 18 6 18 15" />
                        </svg>
                    </button>
                </Link>
            </div>
            {/* CATEGORI */}
            <MainCategories />
            {/* POSTS */}
            <FeaturedPosts />
            <div className="contentPosts">
                <h1>Recent Posts</h1>
                <PostList />
            </div>
        </div>
    );
};

export default HomePage;
