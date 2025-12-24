import { Radio } from "antd";
import { useEffect, useState } from "react";

const TemplateSelector = () => {
  const [template, setTemplate] = useState(
    localStorage.getItem("resumeTemplate") || "modern"
  );

  useEffect(() => {
    localStorage.setItem("resumeTemplate", template);
  }, [template]);

  return (
    <Radio.Group
      value={template}
      onChange={(e) => setTemplate(e.target.value)}
      size="middle"
    >
      <Radio.Button value="modern">Modern</Radio.Button>
      <Radio.Button value="minimal">Minimal</Radio.Button>
      <Radio.Button value="corporate">Corporate</Radio.Button>
    </Radio.Group>
  );
};

export default TemplateSelector;
