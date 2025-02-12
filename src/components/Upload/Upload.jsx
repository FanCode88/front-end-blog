import { toast } from 'react-toastify';
import './upload.scss';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';

const authenticator = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/upload-auth`
        );

        if (!response === '') {
            const errorText = await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`
            );
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const style = {
    display: 'none',
};

const Upload = ({ children, type, setProgress, setData }) => {
    const ref = useRef(null);

    const onError = (err) => {
        console.log(err);
        toast.error('Error occurred while uploading image');
    };
    const onSuccess = (res) => {
        console.log(res);
        setData(res);
    };
    const onUploadProgress = (progress) => {
        console.log(progress);
        setProgress(Math.round(progress.loaded / progress.total) * 100);
    };
    return (
        <IKContext
            className="inputImage"
            publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
            authenticator={authenticator}
        >
            <IKUpload
                useUniqueFileName
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                style={style}
                ref={ref}
                accept={`${type}/*`}
            />
            <div
                onClick={() => {
                    ref.current.click();
                }}
                className="childrenEl"
            >
                {children}
            </div>
        </IKContext>
    );
};

export default Upload;
