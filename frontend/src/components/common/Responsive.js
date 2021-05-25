import styled from 'styled-components';

const Responsive = styled.div`
    margin: 0 auto;
    height: 100%;
    @media screen and (min-width:320px) and (max-width:767px) {
        width: 320px;
    }

    @media screen and (min-width: 728px) and (max-width: 1023px) {
        width: 728px;
    }

    @media screen and (min-width: 1024px) {
        width: 1024px;
    }
`

export default Responsive;