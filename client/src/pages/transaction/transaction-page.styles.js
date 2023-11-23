import {styled, css } from "styled-components";
import SearchBox from "../../components/search-box/search-box.component";

const getFont = ({ bold }) => {
    return bold 
        ? css`
              font-weight: bold;
          `
        : css`
              font-weight: 60px;
          `;
};

export const TransactionContainer = styled.div`
	border-radius: 20px;
	display: block;
	overflow: visible;
	padding: 24px;
	position: relative;
	background-color: rgb(255, 255, 255);
	border: 1px solid rgb(230, 230, 230);
	width: 90%;	
	margin: 80px auto;
`

export const SearchBoxContainer = styled(SearchBox)`
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`

export const HeaderContainer = styled.div`
	font-weight: bold;
	margin-bottom: 30px;
`

export const TransferContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

export const TextContainer = styled.div`
	font-size: 23px;
	width: 12.5vw;
	margin: 10px 0px;
	${getFont}
`
