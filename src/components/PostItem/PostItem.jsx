import Image from '../Image';
import './postItem.scss';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const PostItem = ({ post }) => {
    return (
        <div className="postItem">
            <div className="details">
                <div className="detailsContent">
                    <Link to={`/posts/${post.slug}`} className="title">
                        {post.title}
                    </Link>
                    <div className="detailsUser">
                        <span>Written by </span>
                        {post.user ? (
                            <Link
                                className="titleName"
                                to={`/posts?author=${post.user.username}`}
                            >
                                {post.user.username}
                            </Link>
                        ) : (
                            <span>Unknown</span>
                        )}
                        <span>on</span>
                        <Link className="titleName">{post.category}</Link>
                        <span>{format(post.createdAt)}</span>
                    </div>
                    <div className="descTitle">
                        {post.img && (
                            <Image
                                src={post.img}
                                w={500}
                                style={{
                                    height: 'auto',
                                    float: 'left',
                                    marginRight: '26px',
                                    marginTop: '20px',
                                }}
                            />
                        )}

                        <p className="desc">{post.content}</p>
                        <Link className="readDesc" to={`/posts/${post.slug}`}>
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
