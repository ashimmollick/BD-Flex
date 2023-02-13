import React from 'react';

import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
} from 'react-share';
const Share = ({ data }) => {

    const shareUrl = `https://bd-flix-e2343.web.app/allmovie/${data.id}`;

    return (
        <div
            style={{
                background: '#0000',

            }}
        >
            <h1>Share Your Post</h1>

            <FacebookShareButton
                url={shareUrl}
                quote={'Title or jo bhi aapko likhna ho'}
                hashtag={`${data.title}`}
            >
                <FacebookIcon size={40} round={true} />
            </FacebookShareButton>

            <WhatsappShareButton
                url={shareUrl}
                quote={'Title or jo bhi aapko likhna ho'}
                hashtag={`${data.title}`}
            >
                <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
        </div>
    );
};

export default Share;