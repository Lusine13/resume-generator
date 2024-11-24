import React, { useState } from "react";
import { Form, Input, Flex, Button } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUserProfileInfo } from '../../state-managment/slices/userProfile'; 
import { ROUTE_CONSTANTS } from "../../constants";
//import './index.css';

const Projects = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserProjects = async (values) => {
        setLoading(true);
        const { projectName, techStack, description } = values;
        
        dispatch(fetchUserProfileInfo({ projectName, techStack, description }));
        
        navigate(ROUTE_CONSTANTS.PROJECTS);

        setLoading(false);
    };

    

    return (
        <div className='form_page_container'>
            <Form layout="vertical" form={form} onFinish={handleUserProjects}>
                <Form.Item
                    label="Project Name"
                    name="projectName"
                    rules={[
                        { required: true, message: 'Please input your Project Name!' }
                    ]}
                >
                    <Input type="text" placeholder="Project Name" />
                </Form.Item>
                <Form.Item
                    label="Teck Stack"
                    name="teckStack"
                    rules={[
                        { required: true, message: 'Please input Teck Stack' }
                    ]}
                >
                    <Input type="text" placeholder="Teck Stack" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        { required: true, message: 'Please input Description!' }
                    ]}
                >
                    <Input type="text" placeholder="Description" />
                </Form.Item>

               
                <Flex align="flex-end" gap="10px" justify="flex-end">
                <Link to={ROUTE_CONSTANTS.EDUCATION}>
                  BACK
                </Link>
                <Link to={ROUTE_CONSTANTS.SKILLS}>
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

export default Projects;
