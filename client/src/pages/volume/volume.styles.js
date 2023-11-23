import {styled} from "styled-components"
import CustomButton from "../../components/custom-buttons/custom-button.component"

export const VolumeContainer = styled.div`
	border-radius: 20px;
	display: block;
	overflow: visible;
	padding: 24px;
	position: relative;
	background-color: rgb(255, 255, 255);
	border: 1px solid rgb(230, 230, 230);
	width: 50%;	
	margin: 80px auto;
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
	width: 180px;
	margin: 10px 0px;
`

export const CustomButtonContainer = styled(CustomButton)`
	width: 180px
`

