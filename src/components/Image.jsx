import PropTypes from 'prop-types';
import { IKImage } from 'imagekitio-react';

const Image = ({ src, w, h, alt, style = {} }) => {
    const defaultStyle = {
        borderRadius: '24px',
        objectFit: 'cover',
    };

    return (
        <IKImage
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
            path={src}
            loading="lazy"
            lqip={{ active: true, quality: 20 }}
            alt={alt}
            width={w}
            height={h}
            style={{ ...defaultStyle, ...style }}
            transformation={[{ width: w, height: h }]}
        />
    );
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
    w: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    h: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    alt: PropTypes.string,
    style: PropTypes.object,
};

Image.defaultProps = {
    alt: 'Image',
    w: undefined,
    h: undefined,
    style: {},
};

export default Image;
