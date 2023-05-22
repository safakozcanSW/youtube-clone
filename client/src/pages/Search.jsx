import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card.jsx';

//STYLES
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const Search = () => {
    const query = useLocation().search;
    //States
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideo = async () => {
            const res = await axios.get(`/videos/search${query}`);
            setVideos(res.data);
        };
        fetchVideo();
    }, [query]);

    return (
        <Container>
            {videos.map((video, index) => (
                <Card key={video._id} video={video} />
            ))}
        </Container>
    );
};

export default Search;
