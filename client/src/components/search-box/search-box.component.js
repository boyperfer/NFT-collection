import { SearchBoxContainer, InputContainer } from './search-box.styles';

const SearchBox = ({className, placeholder, onChangeHandler}) => {
	console.log(placeholder);
	return (
		<SearchBoxContainer>
			<InputContainer
				className={`search-box ${className}`}
				type='search'
				placeholder={placeholder}
				onChange={onChangeHandler}
			/>
		</SearchBoxContainer>
	);
};

export default SearchBox;
