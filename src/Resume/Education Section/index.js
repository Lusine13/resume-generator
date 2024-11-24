import React, { useState } from "react";
import { Form, Input, Flex, Button } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUserProfileInfo } from '../../state-managment/slices/userProfile'; 
import { ROUTE_CONSTANTS, percValidation, yearValidation } from "../../constants";
import './index.css';

const Education = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();   
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserEducation = async (values) => {
        setLoading(true);
        const { courseName, college, percentage, year } = values;
        
        dispatch(fetchUserProfileInfo({ courseName, college, percentage, year }));
        
        navigate(ROUTE_CONSTANTS.EDUCATION);

        setLoading(false);
    };

    
    return (
        <div className='form_page_container'>
            <Form layout="vertical" form={form} onFinish={handleUserEducation}>
                <Form.Item
                    label="Course Name"
                    name="courseName"
                    rules={[
                        { required: true, message: 'Please input your Course Name!' }
                    ]}
                >
                    <Input type="text" placeholder="Course Name" />
                </Form.Item>
                <Form.Item
                    label="College"
                    name="college"
                    rules={[
                        { required: true, message: 'Please input your College Name!' }
                    ]}
                >
                    <Input type="text" placeholder="College" />
                </Form.Item>

                <Form.Item
                    label="Percentage"
                    name="percentage"
                    tooltip="Enter your percentage as a numeric value (e.g., 85, 85.5)"
                rules={[
                        {
                          required: true,
                          message: 'Please input Percentage!'
                        },
                        {
                          pattern: percValidation,
                          message: 'Please enter a valid percentage!'
                        }
                      ]}
                 >
                    <Input type="text" placeholder="Percentage" />
                </Form.Item>

                <Form.Item
                    label="Year"
                    name="year"
                    tooltip="Year should be a four-digit number"
                    rules={[
                        {
                          required: true,
                          message: 'Please input Year!'
                        },
                        {
                          pattern: yearValidation,
                          message: 'Please enter a valid year!'
                        }
                      ]}
                 >
                    <Input type="text" placeholder="Year" />
                </Form.Item>
             

                <Flex align="flex-end" gap="10px" justify="flex-end">
                <Link to={ROUTE_CONSTANTS.PROFILE}>
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

export default Education;
