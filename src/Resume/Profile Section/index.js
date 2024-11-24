import React, { useState } from "react";
import { Form, Input, Flex, message, Button } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUserProfileInfo } from '../../state-managment/slices/userProfile'; 
import { ROUTE_CONSTANTS } from "../../constants";
import ImgUpload from "../../components/sheared/ImgUpload";
import './index.css';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserProfile = async (values) => {
        setLoading(true);
        const { firstName, lastName, phoneNumber, address } = values;
        
        dispatch(fetchUserProfileInfo({ firstName, lastName, phoneNumber, address }));
        
        navigate(ROUTE_CONSTANTS.PROFILE);

        setLoading(false);
    };

    const handleUpload = ({ file }) => {
        setUploading(true);
        
        setTimeout(() => {
            setUploading(false);
            setProgress(0);
            message.success('Upload successful');
        }, 2000);
    };

    return (
        <div className='form_page_container'>
            <Form layout="vertical" form={form} onFinish={handleUserProfile}>
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        { required: true, message: 'Please input your First Name!' }
                    ]}
                >
                    <Input type="text" placeholder="First Name" />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        { required: true, message: 'Please input your Last Name!' }
                    ]}
                >
                    <Input type="text" placeholder="Last Name" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                        { required: true, message: 'Please input your Phone Number!' }
                    ]}
                >
                    <Input type="text" placeholder="Phone Number" />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        { required: true, message: 'Please input your Address!' }
                    ]}
                >
                    <Input type="text" placeholder="Address" />
                </Form.Item>
               

                <Form.Item label="Profile Image">
                    <ImgUpload
                        handleUpload={handleUpload}
                        progress={progress}
                        uploading={uploading}
                    />
                </Form.Item>

                <Flex align="flex-end" gap="10px" justify="flex-end">
                <Link to={ROUTE_CONSTANTS.EDUCATION}>
                  NEXT
                </Link>
                <Button type="primary" htmlType="submit" loading={loading}>
                 SAVE AND CONTINUE
                </Button>
                </Flex>
            </Form>
        </div>
    );
};

export default Profile;
