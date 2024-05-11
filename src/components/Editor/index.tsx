import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { EventInfo } from '@ckeditor/ckeditor5-utils';
import type { Editor } from '@ckeditor/ckeditor5-core';

import { MyCustomUploadAdapterPlugin } from './MyUploadAdapter';
import { DEFAULT_CHART_EDITOR } from 'utils';

interface EditorProps {
	onBlur?: (event: EventInfo, editor: Editor) => void;
	placeholder?: string;
	initialData?: string;
}

const EditorComponent = ({ onBlur, placeholder, initialData = '' }: EditorProps) => {

	return (
		<CKEditor
			editor={ClassicEditor}
			data={initialData || DEFAULT_CHART_EDITOR}
			config={{
				extraPlugins: [MyCustomUploadAdapterPlugin],
				placeholder: placeholder || 'Enter the text'
			}}
			onBlur={onBlur}
		/>
	);
}

export default EditorComponent;