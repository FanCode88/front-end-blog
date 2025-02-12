import './comments.scss';
import SingleComment from '../../components/SingleComment/SingleComment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const fetchComments = async (postId) => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`
    );
    return res.data;
};

const Comments = ({ postId }) => {
    const { user } = useUser();
    const { getToken } = useAuth();

    const { isPending, error, data } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const token = await getToken();
            return axios.post(
                `${import.meta.env.VITE_API_URL}/comments/${postId}`,
                newComment,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        },
        onError: (error) => {
            toast.error(error.response.data);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);    
        const desc = formData.get('desc');

        if (!desc.trim()) {
            toast.error('Comment cannot be empty!');
            return;
        }

        mutation.mutate({ desc });

        e.target.reset();
    };

    return (
        <div className="comments">
            <h1 className="title">Comments</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="desc"
                    className="textMessage"
                    placeholder="Write a comment"
                    required
                />
                <button
                    className="btnSendMessage"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? 'Sending...' : 'Send'}
                </button>
            </form>
            {isPending ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading comments. Please try again later.</p>
            ) : (
                <>
                    {mutation.isPending && (
                        <SingleComment
                            comment={{
                                desc: `${mutation.variables.desc} (Sending...)`,
                                createdAt: new Date(),
                                user: {
                                    img: user.imageUrl,
                                    username: user.username,
                                },
                            }}
                        />
                    )}

                    {data.map((comment) => (
                        <SingleComment
                            key={comment._id}
                            comment={comment}
                            postId={postId}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default Comments;
