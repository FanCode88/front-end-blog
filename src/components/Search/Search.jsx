import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './search.scss';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            if (location.pathname === '/posts') {
                setSearchParams({
                    ...Object.fromEntries(searchParams),
                    search: query,
                });
            } else {
                navigate(`/posts?search=${query}`);
            }
        }
    };

    return (
        <div className="search">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
                fill="none"
                stroke="gray"
            >
                <circle cx="10.5" cy="10.5" r="7.5" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input
                className="inputSearch"
                type="text"
                placeholder="Search a post..."
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default Search;
