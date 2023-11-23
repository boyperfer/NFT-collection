import {useState} from 'react';
import SearchBox from '../../components/search-box/search-box.component';
import Header from '../../components/header/header.component';
import {VolumeContainer, TransferContainer, TextContainer, HeaderContainer, CustomButtonContainer} from './volume.styles';

const VolumePage = () => {
	const [searchFieldDaily, setSearchFieldDaily] = useState('');

	const onSearchChangeDaily = event => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchFieldDaily(searchFieldString);
	};

	const [searchFieldWeekly, setSearchFieldWeekly] = useState('');

	const onSearchChangeWeekly = event => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchFieldWeekly(searchFieldString);
	};

	const [searchFieldMonthly, setSearchFieldMonthly] = useState('');

	const onSearchChangeMonthly = event => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchFieldMonthly(searchFieldString);
	};

	const [weeklyVolumes, setWeeklyVolumes] = useState();
	const [dailyVolumes, setDailyVolumes] = useState();
	const [monthlyVolume, setMonthlyVolume] = useState();


	const handleClickWeekly = ()=> {
		// Send login request to the server
		fetch(`http://localhost:3002/weeklyVolume`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({searchFieldWeekly}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					setWeeklyVolumes(data.results[0].WeeklyVolume)
				} else {
					alert("there is no data")
					setWeeklyVolumes(null)
				}

				// Handle the login response accordingly
				// For simplicity, just logging the response to the console
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const handleClickDaily = ()=> {
		// Send login request to the server
		fetch(`http://localhost:3002/dailyVolume`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({searchFieldDaily}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					console.log(data.results[0].DailyVolume)
					setDailyVolumes(data.results[0].DailyVolume);
				} else {
					alert("there is no data");
					setDailyVolumes(null);
				}

				// Handle the login response accordingly
				// For simplicity, just logging the response to the console
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const handleClickMonthly = ()=> {
		// Send login request to the server
		fetch(`http://localhost:3002/monthlyVolume`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({searchFieldMonthly}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					console.log(data.results[0].MonthlyVolume)
					setMonthlyVolume(data.results[0].MonthlyVolume);
				} else {
					alert("there is no data");
					setMonthlyVolume(null);
				}

				// Handle the login response accordingly
				// For simplicity, just logging the response to the console
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};


	return (
		<VolumeContainer>
			<Header/>
			<HeaderContainer>Volume</HeaderContainer>
			<TransferContainer>
				<TextContainer bold>Date for daily </TextContainer>
				<TextContainer bold>Date for weekly </TextContainer>
				<TextContainer bold>Date for monthly</TextContainer>
			</TransferContainer>
			<TransferContainer>
				<SearchBox onChangeHandler={onSearchChangeDaily} placeholder={'yyyy-mm-dd'}/>
				<SearchBox onChangeHandler={onSearchChangeWeekly} placeholder={'yyyy-mm-dd'}/>
				<SearchBox onChangeHandler={onSearchChangeMonthly} placeholder={'yyyy-mm-dd'}/>
			</TransferContainer>
			<TransferContainer>
				<CustomButtonContainer onClick={() => handleClickDaily()}>Submit</CustomButtonContainer>
				<CustomButtonContainer onClick={() => handleClickWeekly()}>Submit</CustomButtonContainer>
				<CustomButtonContainer onClick={() => handleClickMonthly()} >Submit</CustomButtonContainer>
			</TransferContainer>
			<TransferContainer>
				<TextContainer bold>Daily volume</TextContainer>
				<TextContainer bold>Weekly volume</TextContainer>
				<TextContainer bold>Monthly volume</TextContainer>
			</TransferContainer>
			<TransferContainer>
				<TextContainer bold>{searchFieldDaily}</TextContainer>
				<TextContainer bold>{searchFieldWeekly}</TextContainer>
				<TextContainer bold>{searchFieldMonthly}</TextContainer>
			</TransferContainer>
			<TransferContainer>
				<TextContainer>{dailyVolumes} ETH</TextContainer>
				<TextContainer>{weeklyVolumes} ETH</TextContainer>
				<TextContainer>{monthlyVolume} ETH</TextContainer>
			</TransferContainer>
		</VolumeContainer>

	);
};

export default VolumePage;
