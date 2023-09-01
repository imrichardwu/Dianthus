import styled from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 5.6rem;
    width: auto;
`;

function Logo() {
    return (
        <StyledLogo>
            <Img src="/dianthus-logo.png" alt="Logo" />
        </StyledLogo>
    );
}

export default Logo;
