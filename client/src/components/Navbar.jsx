import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

//ACTIONS
import { logOutFailure, logOutStart, logOutSuccess } from '../redux/userSlice';

//ICONS
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';

//COMPONENTS
import Upload from './Upload';

//STYLES
const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 56px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding: 0px 20px;
    position: relative;
`;

const Search = styled.div`
    width: 40%;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;
const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #999;
`;

const Navbar = () => {
    //Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Store Data
    const { currentUser } = useSelector((state) => state.user);
    //State
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState('');

    //Methods
    const handleLogout = async () => {
        dispatch(logOutStart());
        try {
            dispatch(logOutSuccess());
        } catch (error) {
            dispatch(logOutFailure());
        }
    };

    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input
                            placeholder="Search"
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
                    </Search>
                    {currentUser ? (
                        <>
                            <User>
                                <VideoCallOutlinedIcon
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                />
                                <Avatar src={currentUser.img} />
                                {currentUser.name}
                            </User>
                            <Button onClick={handleLogout} style={{ marginLeft: '16px' }}>
                                <AccountCircleOutlinedIcon />
                                SIGN OUT
                            </Button>
                        </>
                    ) : (
                        <Link to="signin" style={{ textDecoration: 'none' }}>
                            <Button>
                                <AccountCircleOutlinedIcon />
                                SIGN IN
                            </Button>
                        </Link>
                    )}
                </Wrapper>
            </Container>
            {open && <Upload setOpen={setOpen} />}
        </>
    );
};

export default Navbar;
