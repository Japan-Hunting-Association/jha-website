import React from 'react'
import { Link } from 'gatsby'
import styled from "styled-components"

const Title = styled.h1`
    color: blue;
`

const Header = () => {
    return (
        <header>
            <Title>日本狩猟協会</Title>
            <nav>
                <Link to="/">top</Link>
            </nav>
        </header>
    )
}

export default Header