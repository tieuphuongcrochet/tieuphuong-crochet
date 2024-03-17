import { API_URL } from "utils";
import axiosJWT from "./axiosJWT";

const uploadFile = {
	
	upload(formData: FormData) :Promise<any> {
		const config = { headers: { 'Content-Type': 'multipart/form-data' } };
		const url = `${API_URL.UPLOAD_FILE}`
		return axiosJWT.post(url, formData,config);
	}
}

export default uploadFile;
