import { useState, useEffect } from "react";
import { Form, Input, Button, Flex, message } from 'antd';
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants";
import GeneratePDF from "../../GeneratePDF";
import './index.css';

const Social = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    
    const storedSocialLinks = localStorage.getItem("socialLinks");
    const socialLinksData = storedSocialLinks ? JSON.parse(storedSocialLinks) : {};
    
    useEffect(() => {
        form.setFieldsValue({
            facebookLinkName: socialLinksData.facebookLinkName || "",
            linkedinLinkName: socialLinksData.linkedinLinkName || "",
            otherLinkName: socialLinksData.otherLinkName || "",
        });
    }, []);

    const handleUserSocialLinks = async (values) => {
        const { facebookLinkName, linkedinLinkName, otherLinkName } = values;

        setLoading(true);

        try {
            const socialLinksData = {
                facebookLinkName,
                linkedinLinkName,
                otherLinkName
            };
            
            localStorage.setItem("socialLinks", JSON.stringify(socialLinksData));

            message.success("Social links saved successfully!");
        } catch (error) {
            console.error("Error saving data:", error);
            message.error("Failed to save social links.");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return (
            form.isFieldsTouched(true) &&
            !form.getFieldsError().some(({ errors }) => errors.length > 0)
        );
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
                    <Input 
                        placeholder="Facebook Link" 
                        style={{ fontSize: "16px", marginBottom: "10px" }}
                    />
                </Form.Item>

                <Form.Item                 
                    label="LinkedIn Link"
                    name="linkedinLinkName"
                >
                    <Input 
                        placeholder="LinkedIn Link"
                        style={{ fontSize: "16px", marginBottom: "10px" }}
                    />
                </Form.Item>

                <Form.Item                 
                    label="Any Other Link"
                    name="otherLinkName"
                >
                    <Input 
                        placeholder="GitHub, Behance, etc."
                        style={{ fontSize: "16px", marginBottom: "10px" }}
                    />
                </Form.Item>

                <Flex align="flex-end" gap="10px" justify="flex-end">
                    <Link to={ROUTE_CONSTANTS.PROJECTS}>BACK</Link>

                    <Button
                        type="primary"
                        loading={loading}
                        onClick={() => form.submit()}
                        disabled={loading || !isFormValid()}
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
