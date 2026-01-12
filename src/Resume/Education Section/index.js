import { useState, useEffect } from "react";
import { Form, Input, Button, Flex, message, Select } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { ROUTE_CONSTANTS, yearValidation } from "../../constants";

const { Option } = Select;

const Education = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const storedEducation = localStorage.getItem("education");
  const educationData = storedEducation ? JSON.parse(storedEducation) : {};

  useEffect(() => {
    form.setFieldsValue({
      degree: educationData.degree || "",
      institution: educationData.institution || "",
      department: educationData.department || "",
      year: educationData.year || "",
    });    
  }, []);

  const handleUserEducation = async (values) => {
    const { degree, institution, department, year } = values;

    setLoading(true);
    try {
      const payload = { degree, institution, department, year };
      localStorage.setItem("education", JSON.stringify(payload));

      message.success("Education details saved successfully!");
      navigate(ROUTE_CONSTANTS.SKILLS);
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Failed to save education details.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () =>
    form.isFieldsTouched(true) &&
    !form.getFieldsError().some(({ errors }) => errors.length > 0);

  return (
    <div className="form_page_container">
      <Form layout="vertical" form={form} onFinish={handleUserEducation}>
        <Form.Item
          label="Degree"
          name="degree"
          rules={[{ required: true, message: "Please choose your Degree!" }]}
        >
          <Select placeholder="Select degree">
            <Option value="Bachelor's">Bachelor's</Option>
            <Option value="Master's">Master's</Option>
            <Option value="PhD">PhD</Option>
            <Option value="Associate">Associate</Option>
            <Option value="Diploma">Diploma</Option>
            <Option value="Certificate">Certificate</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Institution"
          name="institution"
          rules={[{ required: true, message: "Please input your Institution!" }]}
        >
          <Input placeholder="University / Institute / College" />
        </Form.Item>

        <Form.Item
          label="Department / Major"
          name="department"
          rules={[{ required: true, message: "Please input your Department/Major!" }]}
        >
          <Input placeholder="e.g. Computer Science, Methodology, Software Engineering" />
        </Form.Item>

        <Form.Item
          label="Graduation Year"
          name="year"
          tooltip="Year should be 4 digits (e.g., 2022)"
          rules={[
            { required: true, message: "Please input Graduation Year!" },
            { pattern: yearValidation, message: "Please enter a valid year!" },
          ]}
        >
          <Input placeholder="e.g. 2022" />
        </Form.Item>

        <Flex align="flex-end" gap="10px" justify="flex-end">
          <Link to={ROUTE_CONSTANTS.PROFILE}>BACK</Link>
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

export default Education;
