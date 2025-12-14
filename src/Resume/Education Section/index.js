import { useState, useEffect } from "react";
import { Form, Input, Button, Flex, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { ROUTE_CONSTANTS, percValidation, yearValidation } from "../../constants";

const Education = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();   
    const navigate = useNavigate();
    
    let storedEducation = localStorage.getItem("education");
    let educationData = storedEducation ? JSON.parse(storedEducation) : {};
    
    useEffect(() => {
        form.setFieldsValue({
            courseName: educationData.courseName || "",
            college: educationData.college || "",
            percentage: educationData.percentage || "",
            year: educationData.year || "",
        });
    }, []);

    const handleUserEducation = async (values) => {
        const { courseName, college, percentage, year } = values;

        setLoading(true);
        try {
            const educationData = { courseName, college, percentage, year };
            
            localStorage.setItem("education", JSON.stringify(educationData));

            message.success('Education details saved successfully!');
            navigate(ROUTE_CONSTANTS.SKILLS);
        } catch (error) {
            console.error('Error saving data:', error);
            message.error("Failed to save education details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='form_page_container'>
            <Form 
                layout="vertical" 
                form={form} 
                onFinish={handleUserEducation}
            >
                <Form.Item
                    label="Course Name"
                    name="courseName"
                    rules={[{ required: true, message: 'Please input your Course Name!' }]}
                >
                    <Input placeholder="Course Name" />
                </Form.Item>

                <Form.Item
                    label="College"
                    name="college"
                    rules={[{ required: true, message: 'Please input your College Name!' }]}
                >
                    <Input placeholder="College" />
                </Form.Item>

                <Form.Item
                    label="Percentage"
                    name="percentage"
                    tooltip="Enter your percentage (e.g., 85 or 85.5)"
                    rules={[
                        { required: true, message: 'Please input Percentage!' },
                        { pattern: percValidation, message: 'Please enter a valid percentage!' }
                    ]}
                >
                    <Input placeholder="Percentage" />
                </Form.Item>

                <Form.Item
                    label="Year"
                    name="year"
                    tooltip="Year should be 4 digits (e.g., 2022)"
                    rules={[
                        { required: true, message: 'Please input Year!' },
                        { pattern: yearValidation, message: 'Please enter a valid year!' }
                    ]}
                >
                    <Input placeholder="Year" />
                </Form.Item>

                <Flex align="flex-end" gap="10px" justify="flex-end">
                    <Link to={ROUTE_CONSTANTS.PROFILE}>BACK</Link>
                    <Button 
                        type="primary"
                        loading={loading}
                        onClick={() => form.submit()}
                        disabled={
                            loading ||
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().some(({ errors }) => errors.length > 0)
                        }
                    >
                        NEXT
                    </Button>
                </Flex>
            </Form>
        </div>
    );
};

export default Education;
