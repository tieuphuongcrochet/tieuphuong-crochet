import { Form, Button, Space, Divider, List, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from "app/hooks";
import { showConfirmDelete } from "utils";
import { FileUpload } from "models";
import { Banner, IBannerType } from "models/setting";
import { filter, find } from "lodash";
import { EdittingBanner, initialEdittingBanner } from "./components/BannerForm";
import BannerType from "./components/BannerType";
import { selectBannerTypes, selectBanners, selectLoading, settingAction } from "./SettingSlice";
import BannerForm from "./components/BannerForm";
import BannerItem from "components/BannerItem";

const SettingPage = () => {
    const [bannersList, SetBannersList] = useState<Banner[]>([]);
    const [isUpdatedBList, setIsUpdatedBList] = useState(false);
    const [edittingBanner, setEdittingBanner] = useState<EdittingBanner>(initialEdittingBanner);

    const [form] = Form.useForm();
    const { Item } = Form;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const bannerTypes = useAppSelector(selectBannerTypes);
    const banners = useAppSelector(selectBanners);
    const loading = useAppSelector(selectLoading);

    useEffect(() => {
        dispatch(settingAction.fetchBanners());
    }, []);

    useEffect(() => {
        SetBannersList(banners);
    }, [banners]);

    const onSubmitForm = () => {
        dispatch(settingAction.cUBanners(bannersList));
        setIsUpdatedBList(false);
    }

    const onCancel = () => {
        form.resetFields();
        navigate(-1);
    }


    const onEditBanner = (banner: Banner, index: number) => {
        const bannerImage: FileUpload[] = [{
            fileContent: banner.fileContent,
            fileName: banner.fileName,
            url: banner.fileContent
        }];

        setEdittingBanner({
            isEditting: true,
            index,
            image: bannerImage,
            banner
        });
    }

    const onDeleteBanner = (index: number) => {
        const newBannerList = filter([...bannersList], (_, i) => i !== index);
        SetBannersList(newBannerList);
    }

    const validateBanners = () => {
        if (bannersList.length > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Must have at least 1 banner'));
    };

    const getBannerType = (id?: string, bannerType?: IBannerType) => {
        return id ? find(bannerTypes, bt => bt.key === id)?.name : bannerType?.name;
    };

    const getActiveKey = () => {
        return edittingBanner.isEditting ?
            { activeKey: ['bannerItem'] } :
            { defaultActiveKey: [] }
    }

    return (<>
        <div className="setting-page">
            <BannerType />
            <Divider style={{ margin: '30px 0' }} />
            <h2 className="align-center">Banners</h2>
            <Collapse
                expandIconPosition='end'
                {...getActiveKey()}
                items={[
                    {
                        key: 'bannerItem',
                        label: 'Banner Form',
                        children:
                            <BannerForm
                                bannersList={bannersList}
                                edittingBanner={edittingBanner}
                                setEdittingBanner={setEdittingBanner}
                                SetBannersList={SetBannersList}
                                setIsUpdatedBList={setIsUpdatedBList}
                            />
                    }]}
            />
            <Form layout="vertical"
                name='CUSettingForm'
                form={form}
                onFinish={onSubmitForm}
                className="form-wrap"
            >

                <Item name='bannersList'
                    label='Banners list'
                    rules={[
                        { validator: () => validateBanners() }
                    ]}
                >
                    <List
                        loading={loading.banner}
                        itemLayout="vertical"
                        size="large"
                        dataSource={bannersList}
                        renderItem={(item, index) => (
                            <List.Item
                                key={`banner-item__${index}`}
                                extra={
                                    <BannerItem banner={item} classNames="banner-item__preview" />
                                }
                                actions={[
                                    <Button
                                        onClick={() => onEditBanner(item, index)}
                                        shape="circle"
                                        key="list-vertical-edit"
                                        icon={<EditOutlined />}
                                        disabled={edittingBanner.isEditting}
                                    />,
                                    <Button
                                        shape="circle"
                                        key="list-vertical-delete"
                                        icon={<DeleteOutlined />}
                                        disabled={edittingBanner.isEditting}
                                        onClick={() => showConfirmDelete(index, onDeleteBanner)}
                                    />,
                                ]}
                            >
                                <List.Item.Meta
                                    title={item.title}
                                    description={getBannerType(item.bannerTypeId, item.bannerType)}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </Item>
                <div className="align-center">
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={edittingBanner.isEditting || !isUpdatedBList}
                            className="btn-form btn-border"
                        >
                            Submit
                        </Button>
                        {/* <Button className="btn-form" htmlType="reset">reset</Button> */}
                        <Button
                            disabled={edittingBanner.isEditting || !isUpdatedBList}
                            className="btn-form btn-border"
                            onClick={onCancel}>Cancel</Button>
                    </Space>
                </div>
            </Form>

        </div>

    </>)
}

export default SettingPage;
