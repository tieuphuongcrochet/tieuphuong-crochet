import { Segmented, Tag } from "antd"
import { map } from 'lodash';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    SyncOutlined,
  } from '@ant-design/icons';
import { SegmentedValue } from "antd/es/segmented";

type Status = 'processing' | 'success' | 'default';

interface PatternStatusProps {
    options: { label: string, value: string, tagColor: Status }[],
    defaultValue: string,
    size?: 'large' | 'middle' | 'small',
    onChange?: (value: SegmentedValue) => void
}

const PatternStatus = ({ size = 'large', defaultValue, options, onChange }: PatternStatusProps) => {

    const getIconTag = (tagColor: Status) => {
        if(tagColor === 'success'){
            return <CheckCircleOutlined/>
        }
        return tagColor === 'processing' ? <SyncOutlined /> : <ClockCircleOutlined />
    }

    return (
        <Segmented
            size={size}
            defaultValue={defaultValue}
            onChange={onChange}
            options={map(options, item => (
                {
                    label: (<Tag icon={getIconTag(item.tagColor)} color={item.tagColor}>{item.label}</Tag>),
                    value: item.value
                }
            ))} />
    )
}

export default PatternStatus;
