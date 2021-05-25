import styled from 'styled-components';

const Responsive = styled.div`
    margin: 0 auto;
    @media screen and (min-width: 360px) and (max-width: 767px) {
        width: 360px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
        width: 768px;
    }
    @media screen and (min-width: 1024px) {
        width: 1024px;
    }
`

export default Responsive;