import { Link } from 'react-router-dom';
import './mainCategories.scss';
import Search from '../../components/Search/Search';

const MainCategories = () => {
    return (
        <div className="mainCategories">
            <div className="linksCategori">
                <Link to="/posts" className="links">
                    All Posts
                </Link>
                <Link to="/posts?cat=web-design" className="links2">
                    Web Design
                </Link>
                <Link to="/posts?cat=development" className="links2">
                    Development
                </Link>
                <Link to="/posts?cat=databases" className="links2">
                    DataBases
                </Link>
                <Link to="/posts?cat=seo" className="links2">
                    Search Engines
                </Link>
                <Link to="/posts?cat=marketing" className="links2">
                    Marketing
                </Link>
            </div>
            <span className="line"></span>
            <Search />
        </div>
    );
};

export default MainCategories;
