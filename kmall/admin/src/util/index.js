import axios from 'axios';


export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
			method:options.method || 'get',
			url:options.url || '',
			data:options.data || ''
		}
		axios(params)
		.then(result=>{
			console.log(result);
		})
		.catch(err=>{
			reject(err);
		})
	})
}