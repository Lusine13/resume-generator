import React, { useState } from "react";
import { ROUTE_CONSTANTS } from "../../constants";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUserProfileInfo } from '../../state-managment/slices/userProfile'; 
import { Input, Flex, Button, Space, Tag} from 'antd';
import './index.css';

const Social = () => {
    const [loading, setLoading] = useState(false);    
    const [links, setLinks] = useState([]);  
    const [inputValue, setInputValue] = useState(""); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserSocialLinks = async () => {
        setLoading(true);
        dispatch(fetchUserProfileInfo({ links }));
        navigate(ROUTE_CONSTANTS.SOCIAL);
        setLoading(false);
    };

    const handleAddLink = () => {
        if (inputValue && !links.includes(inputValue)) {
            setLinks([...links, inputValue]);
            setInputValue(""); 
        }
    };

    const handleDeleteLink = (removedLink) => {
        setLinks(links.filter(link => link !== removedLink)); 
    };

    return (
        <div className='container'>
             <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                    {links.map((link, index) => (
                        <Tag 
                            key={index} 
                            closable 
                            onClose={() => handleDeleteLink(link)} // Remove the link when clicked
                        >
                            {link}
                        </Tag>
                    ))}
                </div>

                {/* Input field to add new links */}
                <Input 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} // Update input value
                    onPressEnter={handleAddLink} // Add link when "Enter" is pressed
                    placeholder="Enter social media link" 
                    style={{ width: 300, marginBottom: 10 }} 
                />

                {/* Button to add the link */}
                <Button type="primary" onClick={handleAddLink}>
                    Add Link
                </Button>
            </Space>

        




        <Flex align="flex-end" gap="10px" justify="flex-end">
                <Link to={ROUTE_CONSTANTS.SKILLS}>
                  BACK
                </Link>
                <Link to={ROUTE_CONSTANTS.PROJECTS}>
                  NEXT
                </Link>
                <Button type="primary" htmlType="submit" loading={loading} onClick={handleUserSocialLinks}>
                 SAVE AND CONTINUE
                </Button>
                </Flex>
            </div>
    );
};

export default Social;
