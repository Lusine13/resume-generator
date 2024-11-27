import React, { useState } from "react";
import { Form, Input, Button, Flex, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants";

const Projects = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleUserProjects = async (values) => {
        const { projectName, techStack, description } = values;
    try { 
        const projectData = { projectName, techStack, description };  
        sessionStorage.setItem('projects', JSON.stringify(projectData));

        message.success('Project details saved successfully!');
        navigate(ROUTE_CONSTANTS.SOCIAL);
    } catch (error) {
        console.error('Error saving data:', error);
    } finally {
        setLoading(false);
    }
    };

    const isFormValid = () => {
        return form.isFieldsTouched(true) && !form.getFieldsError().some(({ errors }) => errors.length > 0);
    };

    return (
        <div className='form_page_container'>
            <Form layout="vertical" form={form} onFinish={handleUserProjects}>
                <Form.Item
                    label="Project Name"
                    name="projectName"
                    rules={[{ required: true, message: 'Please input your Project Name!' }]}
                >
                    <Input type="text" placeholder="Project Name" />
                </Form.Item>

                <Form.Item
                    label="Tech Stack"
                    name="techStack"
                    rules={[{ required: true, message: 'Please input Tech Stack!' }]}
                >
                    <Input type="text" placeholder="Tech Stack" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input Description!' }]}
                >
                    <Input type="text" placeholder="Description" />
                </Form.Item>

                <Flex align="flex-end" gap="10px" justify="flex-end">
                    <Link to={ROUTE_CONSTANTS.SKILLS}>BACK</Link>
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={() => form.submit()}
                        disabled={loading || !isFormValid()}
                    >
                        NEXT
                    </Button>
                </Flex>
            </Form>
        </div>
    );
};

export default Projects;
