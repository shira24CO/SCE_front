import { create } from "apisauce";
 const ClientApi = create({
   baseURL: 'http://192.168.56.1:3000',
   headers: { Accept: 'application/vnd.github.v3+json' },
 })
 export default ClientApi