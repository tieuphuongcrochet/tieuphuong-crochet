import { API_URL } from "utils";
import axiosJWT from "./axiosJWT";

const uploadFile = {
	
	upload(formData: FormData) :Promise<any> {
		const config = { headers: { 'Content-Type': 'multipart/form-data' } };
		const url = `${API_URL.UPLOAD_FILE}`
		return axiosJWT.post(url, formData,config);
	},
	delete(fileNames: string[]) :Promise<any> {
		const url = `${API_URL.DELETE_MULTIPLE_FILES}`
		return axiosJWT.delete(url, { data: fileNames });
	}
}

export default uploadFile;
