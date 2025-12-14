import { useState, useEffect } from "react";
import { Form, Input, Flex, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfileImgUrl } from "../../state-managment/slices/userProfile";
import { ROUTE_CONSTANTS } from "../../constants";
import "./index.css";

const Profile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [form] = Form.useForm();
    
    const storedProfile = localStorage.getItem("profile");
    const profileData = storedProfile ? JSON.parse(storedProfile) : {};

    const [imageUrl, setImageUrl] = useState(profileData.imageUrl || "");
    const navigate = useNavigate();
    
    useEffect(() => {
        form.setFieldsValue({
            firstName: profileData.firstName || "",
            lastName: profileData.lastName || "",
            email: profileData.email || "",
            phoneNumber: profileData.phoneNumber || "",
            address: profileData.address || "",
        });
    }, []);

    const handleUserProfile = async (values) => {
        setLoading(true);

        const { firstName, lastName, email, phoneNumber, address } = values;
        
        localStorage.setItem(
            "profile",
            JSON.stringify({
                firstName,
                lastName,
                email,
                phoneNumber,
                address,
                imageUrl,
            })
        );

        message.success("Profile details saved successfully!");
        navigate(ROUTE_CONSTANTS.EDUCATION);
        setLoading(false);
    };
    
    const handleUpload = ({ file }) => {
        if (!file) return;

        setUploading(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            const imgUrl = e.target.result;

            setImageUrl(imgUrl);
            dispatch(setProfileImgUrl(imgUrl));
            
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    ...profileData,
                    imageUrl: imgUrl,
                })
            );

            setUploading(false);
            message.success("Image uploaded successfully");
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="form_page_container">
            <Form layout="vertical" form={form} onFinish={handleUserProfile}>
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        { required: true, message: "Please input your First Name!" },
                    ]}
                >
                    <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        { required: true, message: "Please input your Last Name!" },
                    ]}
                >
                    <Input placeholder="Last Name" />
                </Form.Item>
                
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your Email!" },
                        {
                            type: "email",
                            message: "Please enter a valid email address!",
                        },
                    ]}
                >
                    <Input placeholder="Email Address" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                        { required: true, message: "Please input your Phone Number!" },
                    ]}
                >
                    <Input placeholder="Phone Number" />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        { required: true, message: "Please input your Address!" },
                    ]}
                >
                    <Input placeholder="Address" />
                </Form.Item>
<div className="profile-image-section">

  {imageUrl ? (
    <img
      src={imageUrl}
      alt="Profile"
      className="profile-preview"
    />
  ) : (
    <div className="profile-placeholder">
      No profile image selected
    </div>
  )}

  <label className="custom-upload">
    Choose Image
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleUpload({ file: e.target.files[0] })}
    />
  </label>

</div>


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
