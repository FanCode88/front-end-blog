import './singlePostPage.scss';
import Image from '../../components/Image';
import { Link, useParams } from 'react-router-dom';
import PostMenuAction from '../../components/PostMenuAction/PostMenuAction';
import Search from '../../components/Search/Search';
import Comments from '../../components/Comments/Comments';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'timeago.js';
import { useSearchParams } from 'react-router-dom';

const fetchPost = async (slug) => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${slug}`
    );
    return res.data;
};

const SinglePostPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { slug } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => fetchPost(slug),
    });

    if (isPending) return 'loading...';
    if (error) return 'Something went wrong!' + error.message;
    if (!data) return 'Post not found!';

    const handleCategoryChange = (category) => {
        if (searchParams.get('cat') !== category) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                cat: category,
            });
        }
    };

    return (
        <div className="singlePostPage">
            <div className="detailsContent">
                <div className="content">
                    <h1 className="desc">{data.title}</h1>
                    <div className="separateContent">
                        <span>Wrriten by</span>
                        <Link className="title">
                            {data.user?.username || 'Unknown author'}
                        </Link>
                        <span>on</span>
                        <Link className="title">{data.category}</Link>
                        <span className="timeDay">
                            {format(data.createdAt)}
                        </span>
                    </div>
                    <div className="paragraph">{data.desc}</div>
                </div>
            </div>
            <div className="textContent">
                <div className="descContent">
                    {data.img && (
                        <div className="containerImg">
                            <Image
                                src={data.img}
                                w={400}
                                style={{
                                    height: 'auto',
                                    float: 'left',
                                    marginRight: '26px',
                                }}
                            />
                        </div>
                    )}
                    <p className="desc">{data.content}</p>
                </div>

                <div className="rightMenu">
                    <h1 className="nameUser">Author</h1>
                    <div className="infoUser">
                        {data.user.img && (
                            <Image src={data.user.img} w={50} h={50} />
                        )}
                        <Link className="descName">{data.user.username}</Link>
                    </div>
                    <p className="userDesc">
                        Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <div className="iconSocial">
                        <Link to="">
                            <Image src="facebook.svg" />
                        </Link>
                        <Link to="">
                            <Image src="instagram.svg" />
                        </Link>
                    </div>
                    <PostMenuAction post={data} />
                    <h1 className="categories">Categories</h1>
                    <div className="component">
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

                    <h1 className="searchSpan">Search</h1>
                    <div className="containerSearch">
                        <Search />
                    </div>
                </div>
            </div>
            <Comments postId={data._id} />
        </div>
    );
};

export default SinglePostPage;
