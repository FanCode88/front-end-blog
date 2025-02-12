import './write.scss';
import { useAuth, useUser } from '@clerk/clerk-react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Upload from '../../components/Upload/Upload';

const styleEl = {
    cursor: 'pointer',
};

const Write = () => {
    const { isLoaded, isSignedIn } = useUser();
    const [value, setValue] = useState('');
    const [cover, setCover] = useState('');
    const [img, setImg] = useState('');
    const [video, setVideo] = useState('');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        img &&
            setValue(
                () =>
                    value +
                    `<p>
                        <image src="${img.url}" />
                    </p>`
            );
    }, [img]);

    useEffect(() => {
        video &&
            setValue(
                () =>
                    value +
                    `<p>
                        <iframe class="ql-video" src="${video.url}" />
                    </p>`
            );
    }, [video]);

    const navigate = useNavigate();

    const { getToken } = useAuth();

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken();
            return axios.post(
                `${import.meta.env.VITE_API_URL}/posts`,
                newPost,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        },
        onSuccess: (res) => {
            toast.success('Post created successfully!');
            navigate(`/posts/${res.data.slug}`);
        },
    });

    if (!isLoaded) {
        return <div className="loadingPage">Loading...</div>;
    }
    if (isLoaded && !isSignedIn) {
        return <div className="loadingPage">You Should login!</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const cleanedContent = value.replace(/<[^>]*>/g, '');

        const data = {
            img: cover.filePath || '',
            title: formData.get('title'),
            category: formData.get('category'),
            desc: formData.get('desc'),
            content: cleanedContent,
        };

        mutation.mutate(data);
    };

    return (
        <div className="writePage">
            <h1 className="titlePost">Write a new post</h1>
            <form onSubmit={handleSubmit}>
                <Upload
                    type="image"
                    setProgress={setProgress}
                    setData={setCover}
                >
                    <button className="btnSubmit" type="submit">
                        Add a cover image
                    </button>
                </Upload>

                <input
                    className="inputText"
                    type="text"
                    placeholder="My Title For Story"
                    name="title"
                />
                <div className="labelContent">
                    <label htmlFor="">Choose a category:</label>
                    <select name="category">
                        <option value="General">General</option>
                        <option value="Web-Design">Web Design</option>
                        <option value="Development">Development</option>
                        <option value="Databases">Databases</option>
                        <option value="Seo">Search Engines</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
                <textarea
                    className="descPlace"
                    name="desc"
                    placeholder="A Short Description"
                />
                <div className="contentBtnIcon">
                    <div className="contentBtn">
                        <Upload
                            style={styleEl}
                            type="image"
                            setProgress={setProgress}
                            setData={setImg}
                        >
                            🌇
                        </Upload>
                        <Upload
                            style={styleEl}
                            type="video"
                            setProgress={setProgress}
                            setData={setVideo}
                        >
                            🎥
                        </Upload>
                    </div>
                    <ReactQuill
                        theme="snow"
                        className="themeWrite"
                        value={value}
                        onChange={setValue}
                        readOnly={0 < progress && progress < 100}
                    />
                </div>
                <button
                    disabled={
                        mutation.isLoaded || (0 < progress && progress < 100)
                    }
                    className="btnSend"
                    type="submit"
                >
                    {mutation.isLoaded ? 'Loading...' : 'Send'}
                </button>
                {'Progress: ' + progress}
                {/* {mutation.isError && <span>{mutation.error.message}</span>} */}
            </form>
        </div>
    );
};

export default Write;
