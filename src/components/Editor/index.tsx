import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MyCustomUploadAdapterPlugin } from './MyUploadAdapter';
import type { EventInfo } from '@ckeditor/ckeditor5-utils';
import type { Editor } from '@ckeditor/ckeditor5-core';

interface EditorProps {
	onBlur?: (event: EventInfo, editor: Editor) => void;
	placeholder?: string;
}

const EditorComponent = ({ onBlur, placeholder }: EditorProps) => {

	return (
		<CKEditor
			editor={ClassicEditor}
			config={{
				extraPlugins: [MyCustomUploadAdapterPlugin],
				placeholder: placeholder || 'Enter the text'
			}}
			onBlur={onBlur}
		/>
	);
}

export default EditorComponent;