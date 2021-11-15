import HTTP from '../../core/HTTP';

export default class Resources {
	resourcesAPIInstance = new HTTP('/resources');

	async request(path: string) {
		const response: any = await this.resourcesAPIInstance.get(path);
		return response;
	}
}
