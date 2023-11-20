export const hashObjectUser = ( users ) => {
	console.log(users);
	const obj = {}
	users.forEach((user) => {
		obj[user.trader_id] = user;
	})
	return obj;
}
