import { useToast } from '@/Components/ui/use-toast';
import axios from 'axios'
import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2'

const { HttpStatusCode } = axios;

const handleGet = async (endpoint: string) : Promise<object> =>
{
    try 
    {
        const response: AxiosResponse = await axios.get(endpoint);
        const { status, data: responseData } = response;

        if (Object.is(status, HttpStatusCode.Ok)) 
        {
            return {"success": true, "status": status, "data": responseData};
        }
        return {"success": false, "status": status};    
    } 
    catch (error) 
    {
        return {"success": false, "status": null};    
    }
}

const handlePost = async (data: object, endpoint: string) : Promise<object> =>
{
    try 
    {
        const response: AxiosResponse = await axios.post(route(`${endpoint}.store`), data);
        const { status, data: responseData } = response;

        if (Object.is(status, HttpStatusCode.Ok)) 
        {
            return {"success": true, "status": status, "data": responseData};
        }
        return {"success": false, "status": status};    
    } 
    catch (error) 
    {
        return {"success": false, "status": null};    
    }
}

const handlePut = async (id: number, data: object, endpoint: string) : Promise<object> =>
{
    try 
    {
        const response: AxiosResponse = await axios.put(route(`${endpoint}.update`, { id: id }), data);
        const { status, data: responseData } = response;

        if (Object.is(status, HttpStatusCode.Ok)) 
        {
            return {"success": true, "status": status, "data": responseData};
        }
        return {"success": false, "status": status};    
    } 
    catch (error) 
    {
        return {"success": false, "status": null};    
    }
}

const handleDelete = async (id: number, endpoint: string) : Promise<object> =>
{
    try 
    {
        const response: AxiosResponse = await axios.delete(route(`${endpoint}.destroy`, { id: id }));
        const { status, data: responseData } = response;

        if (Object.is(status, HttpStatusCode.Ok)) 
        {
            return {"success": true, "status": status, "data": responseData};
        }
        return {"success": false, "status": status};    
    } 
    catch (error) 
    {
        return {"success": false, "status": null};    
    }
}

export { handlePost, handleDelete, handlePut, handleGet };