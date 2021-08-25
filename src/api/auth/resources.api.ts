import BaseAPI from '../index';

export default class Resources extends BaseAPI {
	async request(path: string) {
		const response: any = await this.resourcesAPIInstance.get(path, {
			// headers: {
			// 	'content-type': 'application/json',
			// },
		});
		return response;
	}
}
