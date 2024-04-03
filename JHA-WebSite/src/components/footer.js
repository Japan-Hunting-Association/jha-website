import React from 'react'
import { Link } from 'gatsby'
import styled from "styled-components"
import "assets/style/base.css"

const Footer = styled.footer`
    background-color: var(--vt-c-white-pure);
`

const StyledLink = styled(Link)`
    font-size: 1rem;
    margin: 0 10px;
    font-weight: bold;
`

const Menu = styled.div`
    width: fit-content;
    margin: 0 auto;
`

const CopyRight = styled.div`
    font-size: 0.8rem;
    margin: 0 auto;
    text-align: center;
    color: var(--color-footer-text);
    font-weight: thin;
`

const contents = () => {
    return (
        <Footer>
            <Menu>
                <StyledLink to="/">Community</StyledLink>
                <StyledLink to="/">Blog</StyledLink>
                <StyledLink to="/">House</StyledLink>
                <StyledLink to="/">About Us</StyledLink>
                <StyledLink to="/">Contact</StyledLink>
            </Menu>
            <CopyRight>© 2024 Japan Hunting Association.</CopyRight>
        </Footer>
    )
}

export default contents