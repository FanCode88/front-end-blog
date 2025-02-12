import './postListPage.scss';
import PostList from '../../components/PostList/PostList';
import SideMenu from '../../components/SideMenu/SideMenu';
import { useState } from 'react';

const PostListPage = () => {

    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(!open);

    return (
        <div className="postListPage">
            <h1 className="titlePost">Development Blog</h1>
            <button className="btnToggle" onClick={toggleMenu}>
                {open ? 'Close' : 'Filter or Search'}
            </button>
            <div className="contentPost">
                <div className="container">
                    <PostList />
                </div>
                <div className="secondContainer">
                    <div className={`${open ? 'block' : 'hidden'}`}>
                        <SideMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostListPage;
