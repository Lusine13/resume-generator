import React, { useState, useEffect } from "react";
import { ROUTE_CONSTANTS } from "../../constants";
import { Link } from "react-router-dom";
import { Input, Flex, Button, Space, Tag, message } from 'antd';
import GeneratePDF from '../../GeneratePDF';
import './index.css';

const Social = () => {
    const [loading, setLoading] = useState(false);    
    const [links, setLinks] = useState([]);  
    const [inputValue, setInputValue] = useState(""); 

    useEffect(() => {
        const savedLinks = JSON.parse(sessionStorage.getItem('socialLinks')) || [];
        setLinks(savedLinks);
    }, []);

    
    useEffect(() => {
        sessionStorage.setItem('socialLinks', JSON.stringify(links));
    }, [links]);

    const handleAddLink = () => {
        if (inputValue && !links.includes(inputValue)) {
            setLinks([...links, inputValue]);
            setInputValue(""); 
        }
    };

    const handleDeleteLink = (removedLink) => {
        setLinks(links.filter(link => link !== removedLink)); 
    };

    const handleUserSocialLinks = async () => {
        setLoading(true);
       
        setLoading(false);
        message.success('Social links saved successfully!');
    };

    return (
        <div className='container'>
             <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                    {links.map((link, index) => (
                        <Tag 
                            key={index} 
                            closable 
                            onClose={() => handleDeleteLink(link)} 
                        >
                            {link}
                        </Tag>
                    ))}
                </div>

                <Input 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onPressEnter={handleAddLink} 
                    placeholder="Enter social media link" 
                    style={{ width: 300, marginBottom: 10 }} 
                />

                <Button type="primary" onClick={handleAddLink}>
                    Add Link
                </Button>
            </Space>

            <Flex align="flex-end" gap="10px" justify="flex-end">
                <Link to={ROUTE_CONSTANTS.PROJECTS}>
                  BACK
                </Link>
                
                <Button
                    type="primary" 
                    loading={loading}
                    onClick={handleUserSocialLinks}                
                    disabled={loading || links.length === 0}>
                 SAVE
                </Button>

                <GeneratePDF />
            </Flex>
        </div>
    );
};

export default Social;
