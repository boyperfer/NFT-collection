import {styled} from "styled-components"
import CustomButton from "../custom-buttons/custom-button.component"

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	  align-items: center;
	background-color: #95dada;
	border: 1px solid grey;
	border-radius: 5px;
	padding: 25px;
	cursor: pointer;
	-moz-osx-font-smoothing: grayscale;
	backface-visibility: hidden;
	transform: translateZ(0);
	transition: transform 0.25s ease-out;

	&:hover {
		transform: scale(1.05);
		button {
			opacity: 0.85;
			display: flex;
		}
	}
`

export const TextContainer = styled.div`
	font-size: 20px;
	font-weight: bold;
`

export const PriceContainer = styled.div`
	width: 90%;
	display: flex;
	justify-content: space-between;
`

export const AddButton = styled(CustomButton)`
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
	text-align: center;
    display: none;
`
