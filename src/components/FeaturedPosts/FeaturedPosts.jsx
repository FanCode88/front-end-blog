import './featuredPosts.scss';
import Image from '../Image';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { format } from 'timeago.js';

const fetchPost = async () => {
    const res = await axios.get(
        `${
            import.meta.env.VITE_API_URL
        }/posts?featured=true&limit=4&sort=newest`
    );
    return res.data;
};

const FeaturedPosts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['featuredPosts'],
        queryFn: () => fetchPost(),
    });

    if (isPending) return 'loading...';
    if (error) return 'Something went wrong!' + error.message;

    const posts = data.posts;
    if (!posts || posts.length === 0) {
        return;
    }

    return (
        <div className="featuredPosts">
            {/* FIRST POST */}
            <div className="firstPost">
                {posts[0].img && <Image src={posts[0].img} w={550} h={350} />}
                <div className="details">
                    <h1>01.</h1>
                    <Link className="site">{posts[0].category}</Link>
                    <span>{format(posts[0].createdAt)}</span>
                </div>
                <Link className="post" to={`/posts/${posts[0].slug}`}>
                    {posts[0].title}
                </Link>
            </div>

            <div className="secondPost">
                {posts[1] && (
                    <div className="imageSource">
                        {posts[1].img && (
                            <Image src={posts[1].img} w={220} h={170} />
                        )}
                        <div className="contentPost">
                            <div className="details">
                                <h1>02.</h1>
                                <Link className="site" to="/test">
                                    {posts[1].category}
                                </Link>
                                <span>{format(posts[1].createdAt)}</span>
                            </div>
                            <Link
                                className="post"
                                to={`/posts/${posts[1].slug}`}
                            >
                                {posts[1].title}
                            </Link>
                        </div>
                    </div>
                )}

                {posts[2] && (
                    <div className="imageSource">
                        {posts[2].img && (
                            <Image src={posts[2].img} w={220} h={170} />
                        )}
                        <div className="contentPost">
                            <div className="details">
                                <h1>03.</h1>
                                <Link className="site" to="/test">
                                    {posts[2].category}
                                </Link>
                                <span>{format(posts[2].createdAt)}</span>
                            </div>
                            <Link
                                className="post"
                                to={`/posts/${posts[2].slug}`}
                            >
                                {posts[2].title}
                            </Link>
                        </div>
                    </div>
                )}

                {posts[3] && (
                    <div className="imageSource">
                        {posts[3].img && (
                            <Image src={posts[3].img} w={220} h={170} />
                        )}
                        <div className="contentPost">
                            <div className="details">
                                <h1>04.</h1>
                                <Link className="site" to="/test">
                                    {posts[3].category}
                                </Link>
                                <span>{format(posts[3].createdAt)}</span>
                            </div>
                            <Link
                                className="post"
                                to={`/posts/${posts[3].slug}`}
                            >
                                {posts[3].title}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedPosts;
