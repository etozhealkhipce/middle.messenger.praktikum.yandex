export {};

declare global {
	type Events = Record<string, Function>;

	type RegisterUserData = {
		first_name: string;
		second_name: string;
		login: string;
		email: string;
		password: string;
		phone: string;
	};

	type UpdateUserData = {
		avatar?: string;
		first_name?: string;
		second_name?: string;
		login?: string;
		email?: string;
		password?: string;
		phone?: string;
		display_name?: string;
	};

	type UpdateUserPassword = {
		oldPassword: string;
		newPassword: string;
	};

	type ChatUsers = object[];

	type LoginUserData = {
		login: string;
		password: string;
	};

	type InputT = {
		props: {
			inputType: string;
			inputId: number | string;
			inputName: string;
			inputPlaceholder: string;
			inputClass: string;
		};
		rootQuery: string;
		selector: string;
	};

	type ButtonT = {
		props: {
			buttonType: string;
			buttonId: number | string;
			buttonName: string;
			buttonClass?: string;
			buttonText?: string;
			buttonDisabled?: any;
		};
		rootQuery: string;
		selector: string;
	};

	type UserPreviewT = {
		props: {
			buttonType: string;
			buttonId: number | string;
			buttonName: string;
			buttonClass?: string;
			buttonText?: string;
			buttonDisabled?: any;
		};
		rootQuery: string;
		selector: string;
	};
}
