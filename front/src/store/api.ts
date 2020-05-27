

export class Api {
    static baseUrl = 'http://locahost:8080/'

    static async fetchData(path:string,method:'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',body?:object){
        try{
            const result = await fetch(this.baseUrl + path,{
                method,
                credentials:'include',
                headers:{
                    'Content-Type':'aplication/josn'
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

