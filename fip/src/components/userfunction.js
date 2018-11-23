import axios from 'axios'

export const register=newUser=>{
	return axios
	.post('users/register',{
		first_name:newUser.first_name,
		last_name:newUser.last_name,
		email:newUser.email,
		password:newUser.password,

	})
	.then(res=>{
		alert('Ref')

		console.log('Registered successfully')
	})
	.catch(err=>{console.log(err)})
}



export const login=newUser=>{
	return axios
	.post('users/login',{
		email:newUser.email,
		password:newUser.password

	})
	.then(res=>{
		
		localStorage.setItem('usertoken',res.data)
		alert(res.data)
	})
	.catch(err=>{
		alert('Ref')
		console.log(err)})
}