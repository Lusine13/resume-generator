import React, { useState } from "react";
import { Form, Input, Button, Flex, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { ROUTE_CONSTANTS} from "../../constants";
import GeneratePDF from "../../GeneratePDF";
import './index.css';

const Social = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();   
    const navigate = useNavigate();
    
    const handleUserSocialLinks = async (values) => {
        const { facebookLinkName, linkedinLinkName, otherLinkName } = values;        
        try {           
            const socialLinksData = { facebookLinkName, linkedinLinkName, otherLinkName };
            sessionStorage.setItem('socialLinks', JSON.stringify(socialLinksData)); 
            message.success('Social links saved successfully!');             
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            setLoading(false);
        }
    };
   

    return (
        <div className='form_page_container'>
            <Form 
                layout="vertical" 
                form={form} 
                onFinish={handleUserSocialLinks}               
            >
                 <Form.Item                 
                    label="Facebook Link"
                    name="facebookLinkName"                    
                >
                    <Input type="text" placeholder="Facebook Link" 
                    style={{ fontSize: "16px", marginBottom: "10px" }}
                    />
                </Form.Item>
                <Form.Item                 
                    label="LinkedIn Link"
                    name="linkedinLinkName"                    
                >
                    <Input type="text" placeholder="LinkedIn Link" 
                    style={{ fontSize: "16px", marginBottom: "10px" }}
                    />
                </Form.Item>
                <Form.Item                 
                    label="Any Other Link"
                    name="otherLinkName"                    
                >
                    <Input type="text" placeholder="GitHub, Behance, etc."
                    style={{ fontSize: "16px", marginBottom: "10px" }}
                    />
                </Form.Item> 
               
                
                <Flex align="flex-end" gap="10px" justify="flex-end">
                    <Link to={ROUTE_CONSTANTS.SKILLS}>BACK</Link>
                    <Button 
                    type="primary"
                    loading={loading}
                    onClick={() => form.submit()}
                    disabled={loading || !form.isFieldsTouched || form.getFieldsError().some(({ errors }) => errors.length > 0)}
                    >
                     SAVE
                </Button>             
               
                <GeneratePDF /> 
                </Flex>
            </Form>
        </div>
    );
};
 
export default Social;
