export {};

declare global {
	type Events = Record<string, Function>;

	type UserData = {
		first_name: string;
		second_name: string;
		login: string;
		email: string;
		password: string;
		phone: string;
	};
}
