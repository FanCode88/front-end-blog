import { useInfiniteQuery } from '@tanstack/react-query';
import PostItem from '../PostItem/PostItem';
import axios from 'axios';
import './postList.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

const fetchPost = async (pageParam, searchParams) => {
    const searchParamsObj = Object.fromEntries([...searchParams]);

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: { page: pageParam, limit: 10, ...searchParamsObj },
    });
    return res.data;
};

const PostList = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
        queryKey: ['posts', searchParams.toString()],
        queryFn: ({ pageParam = 1 }) => fetchPost(pageParam, searchParams),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) =>
            lastPage.hasMore ? pages.length + 1 : undefined,
    });

    if (status === 'error') return 'Something went wrong';

    const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

    return (
        <InfiniteScroll
            dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>All posts loaded</b>
                </p>
            }
        >
            {allPosts.map((post) => (
                <PostItem key={post._id} post={post} />
            ))}
        </InfiniteScroll>
    );
};

export default PostList;
