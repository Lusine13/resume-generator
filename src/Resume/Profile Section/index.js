import React, { useState } from "react";
import { Form, Input,Flex, Button, message, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import ImgUpload from "../../components/sheared/ImgUpload"; // Ensure correct path
import { ROUTE_CONSTANTS,  FIRESTORE_PATH_NAMES, STORAGE_PATH_NAMES } from "../../constants";
import { db, storage } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImgUrl } from '../../state-managment/slices/userProfile';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './index.css';

const Profile = () => {
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);
    const { authUserInfo: { userData } } = useSelector((store) => store.userProfile); 
    const { uid } = userData;
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(""); 
    const navigate = useNavigate();

    const handleUserProfile = async (values) => {
        setLoading(true);
        const { firstName, lastName, phoneNumber, address } = values;
        
        sessionStorage.setItem('profile', JSON.stringify({ firstName, lastName, phoneNumber, address, imageUrl }));
                
        message.success('Profile details saved successfully!');       
        
        navigate(ROUTE_CONSTANTS.EDUCATION);
        setLoading(false);
    };

    const handleUpload = ({file}) => {
        setUploading(true);
        const storageRef = ref(storage, `${STORAGE_PATH_NAMES.PROFILE_IMAGES}/${uid}`);
           
        const uploadTask = uploadBytesResumable(storageRef, file);
      
        uploadTask.on('state_changed', (snapshot) => {                
            const progressValue = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100);
            setProgress(progressValue);
        },
            (error) => {
            setUploading(false);
            setProgress(0);
            message.error('Error aploading file: ${error.message');
        },
            () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((imgUrl) => {
                setUploading(false);
                setProgress(0);                
                dispatch(setProfileImgUrl(imgUrl));
                setImageUrl(imgUrl);
                updateUserProfileImg(imgUrl);
                message.success('Upload successful');
            })                
        }
      );
    }  
    //http://localhost:3000/logo192.png
    const updateUserProfileImg = async (imgUrl) => {
        try {
            const userDocRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
            await updateDoc(userDocRef, { imgUrl });
        } catch {
            notification.error({
                message: 'Error :('
            });
        }
    }
    
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
                <Button 
                    type="primary"
                    loading={loading}
                    onClick={() => form.submit()}
                    disabled={loading}
                >
                    NEXT
                </Button>
                </Flex>
            </Form>
        </div>
    );
};

export default Profile;
