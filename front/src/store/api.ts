

export class Api {
    static baseUrl = 'http://localhost:5000/'

    static async fetchData(path:string,method:'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',body?:object){
        try{
            const result = await fetch(this.baseUrl + path,{
                method,
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(body)
            })
            const data = await result.json()
            if(!result.ok){
                throw new Error(data.error)
            }
            return data
     
     }catch(error){
        alert(error)
        return null
    }

}
}

