import React from 'react'
import { Link } from 'gatsby'
import styled from "styled-components"
import nameImg from "assets/logo/JHA_name.png"
import { InstagramLogo, TwitterLogo, TiktokLogo } from "phosphor-react";

const Header = styled.header`
    background-color: var(--vt-c-white-pure);
    display: flex;
    align-items: center;
    position: relative;

    &:after {
        content: '';
        display: block;
        position: absolute;

        left: 0;
        bottom: 0px;
        width: 25%;
        height: 0.1px; 
        background-color: var(--vt-c-black-mute); 
    }
`

const NameImage = styled.img`
    width: 20%;
    margin: 0 10px;
`

const StyledLink = styled(Link)`
    font-size: 2rem;
    font-weight: bold;
    margin: 0 10px;
`
const InstagramIcon = styled(InstagramLogo)`
    margin: 0 10px;
`
const TwitterIcon = styled(TwitterLogo)`
    margin: 0 10px;
`
const TiktokIcon = styled(TiktokLogo)`
    margin: 0 10px;
`

const Menu = styled.div`
    display: flex;
    margin: 0 0 0 auto;
`

const contents = () => {
    return (
        <Header>
            <NameImage src={nameImg} />
            <Menu>
                <InstagramIcon size={32} />
                <TwitterIcon size={32} />
                <TiktokIcon size={32} />
                {/* <StyledLink to="/">top</StyledLink>
                <StyledLink to="/">member</StyledLink> */}
            </Menu>
        </Header>
    )
}

export default contents