import './sideMenu.scss';
import Search from '../../components/Search/Search';
import { useSearchParams } from 'react-router-dom';

const SideMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterChange = (e) => {
        if (searchParams.get('sort') !== e.target.value) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                sort: e.target.value,
            });
        }
    };
    
    const handleCategoryChange = (category) => {
        if (searchParams.get('cat') !== category) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                cat: category,
            });
        }
    };

    return (
        <div className="sideMenu">
            <h1 className="item">Search</h1>
            <Search />
            <h1 className="item1">Filter</h1>
            <div className="filterCategory">
                <label htmlFor="">
                    <input
                        className="labelInput"
                        type="radio"
                        onChange={handleFilterChange}
                        value="newest"
                        name="sort"
                    />
                    Newest
                </label>
                <label htmlFor="">
                    <input
                        className="labelInput"
                        type="radio"
                        onChange={handleFilterChange}
                        value="popular"
                        name="sort"
                    />
                    Most Popular
                </label>
                <label htmlFor="">
                    <input
                        className="labelInput"
                        type="radio"
                        onChange={handleFilterChange}
                        value="trending"
                        name="sort"
                    />
                    Trending
                </label>
                <label htmlFor="">
                    <input
                        className="labelInput"
                        type="radio"
                        onChange={handleFilterChange}
                        value="oldest"
                        name="sort"
                    />
                    Oldest
                </label>
            </div>
            <h1 className="item2">Categories</h1>
            <div className="categories">
                <span
                    className="categoriesLinks"
                    onClick={() => handleCategoryChange('general')}
                >
                    All
                </span>
                <span
                    className="categoriesLinks"
                    onClick={() => handleCategoryChange('web-design')}
                >
                    Web Design
                </span>
                <span
                    className="categoriesLinks"
                    onClick={() => handleCategoryChange('development')}
                >
                    Development
                </span>
                <span
                    className="categoriesLinks"
                    onClick={() => handleCategoryChange('databases')}
                >
                    Databases
                </span>
                <span
                    className="categoriesLinks"
                    onClick={() => handleCategoryChange('seo')}
                >
                    Search Engines
                </span>
                <span
                    className="categoriesLinks"
                    onClick={() => handleCategoryChange('marketing')}
                >
                    Marketing
                </span>
            </div>
        </div>
    );
};

export default SideMenu;
