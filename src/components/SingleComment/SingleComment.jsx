import './singleComment.scss';
import Image from '../Image';
import { format } from 'timeago.js';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

const SingleComment = ({ comment, postId }) => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const role = user?.publicMetadata?.role;

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.delete(
                `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
            toast.success('Comment deleted successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data);
        },
    });

    return (
        <div className="singleComment">
            <div className="userInfo">
                {comment.user.img && (
                    <Image src={comment.user.img} w={40} h={40} />
                )}
                <span className="titleName">{comment.user.username}</span>
                <span className="titleDays">{format(comment.createdAt)}</span>
                {user &&
                    (comment.user.username === user.username ||
                        role === 'admin') && (
                        <span
                            onClick={() => mutation.mutate()}
                            className="deleteBtn"
                        >
                            delete
                            {mutation.isPending && <span>(in progress)</span>}
                        </span>
                    )}
            </div>
            <div className="comment">
                <p className="commentParagraph">{comment.desc}</p>
            </div>
        </div>
    );
};

export default SingleComment;
