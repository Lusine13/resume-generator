import React, { useState, useEffect } from "react";
import { ROUTE_CONSTANTS } from "../../constants";
import { Link } from "react-router-dom";
import { Input, Button, message, Space, Tag, Flex } from "antd";
import GeneratePDF from "../../GeneratePDF";
import './index.css';

const Social = () => {
    const [fb, setFb] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [other, setOther] = useState("");
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

     useEffect(() => {
        const savedLinks = JSON.parse(sessionStorage.getItem('socialLinks')) || [];
        setLinks(savedLinks);
    }, []);

     useEffect(() => {
        sessionStorage.setItem('socialLinks', JSON.stringify(links));
    }, [links]);

     const handleAddLink = (link) => {
        if (link && !links.includes(link)) {
            setLinks([...links, link]);
        } else if (!link) {
            message.error("Please enter a valid link.");
        } else {
            message.warning("This link is already added.");
        }
    };

     const handleDeleteLink = (removedLink) => {
        setLinks(links.filter(link => link !== removedLink));
    };

    // Handle saving the links
    const handleUserSocialLinks = async () => {
        setLoading(true);
        // Add your saving logic here (e.g., API call or further processing)
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

                {/* Facebook Link Input */}
                <label>Facebook Link</label>
                <Input
                    value={fb}
                    onChange={(e) => setFb(e.target.value)}
                    type="text"
                    placeholder="Facebook Link"
                    style={{ fontSize: "16px", marginBottom: "10px" }}
                />
                <Button type="primary" onClick={() => handleAddLink(fb)}>
                    Add Facebook Link
                </Button>

                {/* LinkedIn Link Input */}
                <label>LinkedIn Link</label>
                <Input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    type="text"
                    placeholder="LinkedIn Link"
                    style={{ fontSize: "16px", marginBottom: "10px" }}
                />
                <Button type="primary" onClick={() => handleAddLink(linkedin)}>
                    Add LinkedIn Link
                </Button>

                {/* Other Link Input */}
                <label>Any Other Link</label>
                <Input
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    type="text"
                    placeholder="GitHub, Behance, etc."
                    style={{ fontSize: "16px", marginBottom: "10px" }}
                />
                <Button type="primary" onClick={() => handleAddLink(other)}>
                    Add Other Link
                </Button>
            </Space>
           

            <Flex align="flex-end" gap="10px" justify="flex-end">            
            <Link to={ROUTE_CONSTANTS.PROJECTS}>BACK</Link>               
                <Button 
                    type="primary" 
                    loading={loading}
                    onClick={handleUserSocialLinks} 
                    disabled={loading || links.length === 0}
                >
                    SAVE
                </Button>             
               
                <GeneratePDF />          
            </Flex>
        </div>
    );
};

export default Social;
