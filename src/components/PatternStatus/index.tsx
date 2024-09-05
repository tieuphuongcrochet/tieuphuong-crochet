import { Segmented, Tag } from "antd"
import { map } from 'lodash';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { SegmentedValue } from "antd/es/segmented";
import { FormattedMessage } from "react-intl";
import { TTranslationStatus, TranslationStatus } from "models";
import { TRANSLATION_STATUS_COLOR } from "utils";


interface PatternStatusProps {
    options: TranslationStatus[];
    defaultValue: string;
    size?: 'large' | 'middle' | 'small';
    onChange?: (value: SegmentedValue) => void;
    className?: string;

}

const PatternStatus = ({ size = 'large', defaultValue, options, onChange, className }: PatternStatusProps) => {

    const getIconTag = (status: TTranslationStatus) => {
        if (status === 'SUCCESS') {
            return <CheckCircleOutlined />
        }
        return status === 'PENDING' ? <SyncOutlined /> : <ClockCircleOutlined />
    }

    return (
        <Segmented
            size={size}
            defaultValue={defaultValue}
            onChange={onChange}
            className={className}
            options={map(options, item => (
                {
                    icon: getIconTag(item.value),
                    label: (<FormattedMessage id={item.label}/>),
                    value: item.value,
                    className: TRANSLATION_STATUS_COLOR[item.value]
                }
            ))} />
    )
}

export default PatternStatus;
