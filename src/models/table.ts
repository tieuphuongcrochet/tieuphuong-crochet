import { TableProps } from "antd";
import { SearchProps } from "antd/es/input";
import { ColumnsType } from "antd/es/table";

export interface DataType {
  key: string;
  name?: string;
  price?: number;
  author?: string;
  files?: any[];
  imgUrl?: string;
  description?: string;
  email?: string;
  categoryName?: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: DataType;
  index: number;
  children: React.ReactNode;
}

export interface DataTableProps extends TableProps<DataType> {
  onEditRecord: (key: React.Key) => void;
  onDeleteRecord: (key: React.Key) => void;
  customColumns?: ColumnsType<DataType>;
  isShowImage?: boolean;
  visiblePagination?: boolean;
  totalPageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?:(current: number, size: number) => void;
}

export interface SearchTableProps {
  onAddNew: () => void;
  onSearch: SearchProps['onSearch'];
  textAddNew?: string;
}