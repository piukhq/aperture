const getEnvironmentFromApiUrl = (url:string) => url?.split('.')[1] // Returns the environment as a string given a url from the API

export {getEnvironmentFromApiUrl}
