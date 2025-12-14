import { useState, useEffect } from "react";
import { Form, Input, Button, Flex, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants";

const Projects = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    let storedProjects = localStorage.getItem("projects");
    let projectData = storedProjects ? JSON.parse(storedProjects) : {};
    
    useEffect(() => {
        form.setFieldsValue({
            projectName: projectData.projectName || "",
            techStack: projectData.techStack || "",
            description: projectData.description || "",
        });
    }, []);

    const handleUserProjects = async (values) => {
        const { projectName, techStack, description } = values;

        setLoading(true);
        try {
            const projectData = { projectName, techStack, description };
            
            localStorage.setItem("projects", JSON.stringify(projectData));

            message.success("Project details saved successfully!");
            navigate(ROUTE_CONSTANTS.SOCIAL);
        } catch (error) {
            console.error("Error saving data:", error);
            message.error("Failed to save project details.");
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
        <div className="form_page_container">
            <Form layout="vertical" form={form} onFinish={handleUserProjects}>
                <Form.Item
                    label="Project Name"
                    name="projectName"
                    rules={[{ required: true, message: "Please input your Project Name!" }]}
                >
                    <Input placeholder="Project Name" />
                </Form.Item>

                <Form.Item
                    label="Tech Stack"
                    name="techStack"
                    rules={[{ required: true, message: "Please input Tech Stack!" }]}
                >
                    <Input placeholder="Tech Stack" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Please input Description!" }]}
                >
                    <Input placeholder="Description" />
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
