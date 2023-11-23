import { SearchBoxContainer, InputContainer } from './search-box.styles';

const SearchBox = ({className, placeholder, onChangeHandler, type}) => {
	console.log(placeholder);
	return (
		<SearchBoxContainer>
			<InputContainer
				className={`search-box ${className}`}
				type={type}
				placeholder={placeholder}
				onChange={onChangeHandler}
			/>
		</SearchBoxContainer>
	);
};

export default SearchBox;
