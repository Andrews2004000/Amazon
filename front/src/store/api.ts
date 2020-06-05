class Api {
    static url = process.env === 'production' ? '/api/' : `http://${document.domain}:5000/api/v1/`;

    static async fetchCsrfToken() {
        const result = await this.fetchData('csrftoken');
        if (!result.ok || !result.data) {
            return;
        }
        const csrfToken = result.data;
        this.csrfToken = csrfToken;
    }

    static csrfToken = '';

    static async fetchData(path:any, alertErrors = false, method = 'GET', inputBody = null, isJsonBody = true) {
        try {
            let body;
            const headers:any = {
                Accept: 'application/json',
                'CSRF-Token': this.csrfToken,
            };
          if(isJsonBody){
              body = inputBody ? JSON.stringify(inputBody) :null;
              headers['Content-Type'] = 'application/json';
          }else{
            body = inputBody ? inputBody :null;
          }
               
        
            
            console.log(body);
            // Fetch Call
            const rawResponse = await fetch(this.url + path, {
                method: method,
                body,
                headers,
                credentials: 'include',
            });

            // Handle No Content
            if (rawResponse.status === 204) {
                return { data: null, ok: rawResponse.ok };
            }

            // Parse response to javascript object
            const parsedResponse = await rawResponse.json();

            // Check if there was an error
            if (!rawResponse.ok) {
                const errorMessage = parsedResponse.message;
                throw new Error(errorMessage);
            }

            // Get data
            const data = parsedResponse.data;

            // Return data
            return { ok: true, data };
        } catch (error) {
            if (alertErrors) {
                alert(error);
            }
            return { ok: false, error };
        }
    }
}

export default Api;

