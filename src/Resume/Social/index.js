import { useState, useEffect } from "react";
import { Form, Input, Button, Flex, message } from "antd";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants";
import GeneratePDF from "../../GeneratePDF/GenaratePDF";
import TemplateSelector from "../../GeneratePDF/TemplateSelector";
import "./index.css";

const Social = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  
  useEffect(() => {
    const storedSocialLinks = localStorage.getItem("socialLinks");
    const socialLinksData = storedSocialLinks ? JSON.parse(storedSocialLinks) : {};

    form.setFieldsValue({
      facebookLinkName: socialLinksData.facebookLinkName || "",
      linkedinLinkName: socialLinksData.linkedinLinkName || "",
      otherLinkName: socialLinksData.otherLinkName || "",
    });
  }, [form]);

  const handleUserSocialLinks = async (values) => {
    const { facebookLinkName, linkedinLinkName, otherLinkName } = values;
    setLoading(true);

    try {
      localStorage.setItem(
        "socialLinks",
        JSON.stringify({
          facebookLinkName,
          linkedinLinkName,
          otherLinkName,
        })
      );

      message.success("Social links saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Failed to save social links.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () =>
    form.isFieldsTouched(true) &&
    !form.getFieldsError().some(({ errors }) => errors.length > 0);

  return (
    <div className="form_page_container">
      <Form layout="vertical" form={form} onFinish={handleUserSocialLinks}>
        <Form.Item label="Facebook Link" name="facebookLinkName">
          <Input placeholder="Facebook Link" />
        </Form.Item>

        <Form.Item label="LinkedIn Link" name="linkedinLinkName">
          <Input placeholder="LinkedIn Link" />
        </Form.Item>

        <Form.Item label="Any Other Link" name="otherLinkName">
          <Input placeholder="GitHub, Behance, portfolio, etc." />
        </Form.Item>

        {/* FOOTER ACTIONS */}
        <Flex align="center" gap="12px" justify="flex-end">
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

          {/* Template selector */}
          <Flex align="center" gap="6px">
            <span style={{ fontSize: 13, color: "#666", lineHeight: "32px" }}>
              Template:
            </span>
            <TemplateSelector />
          </Flex>
        </Flex>
      </Form>
    </div>
  );
};

export default Social;
