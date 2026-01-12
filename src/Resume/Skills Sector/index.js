import { useState, useEffect } from "react";
import { Input, Tag, Button, Space, message, Flex } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants";

const Skills = () => {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
      try {
       const storedSkills = localStorage.getItem("skills");
       if (storedSkills) setSkills(JSON.parse(storedSkills));
      } catch {
        localStorage.removeItem("skills");
        setSkills([]);
      }
    }, []);

    const handleAddSkill = () => {
        if (inputValue.trim() && !skills.includes(inputValue.trim())) {
            setSkills([...skills, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleDeleteSkill = (removedSkill) => {
        const updatedSkills = skills.filter(skill => skill !== removedSkill);
        setSkills(updatedSkills);
        
        localStorage.setItem("skills", JSON.stringify(updatedSkills));
    };

    const handleSaveSkills = () => {      
        setLoading(true);
        
        localStorage.setItem("skills", JSON.stringify(skills));
      
        setTimeout(() => {
            message.success('Skills saved successfully!');
            setLoading(false);
            navigate(ROUTE_CONSTANTS.PROJECTS);
        }, 700);
    };

    return (
        <div className='container'>
            <Space direction="vertical" style={{ width: '100%' }}>                
                <div>
                    {skills.map((skill, index) => (
                        <Tag 
                            key={index} 
                            closable 
                            onClose={() => handleDeleteSkill(skill)}
                        >
                            {skill}
                        </Tag>
                    ))}
                </div>
            
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleAddSkill}
                    placeholder="Enter a skill"
                    style={{ width: 200, marginBottom: 10 }}
                />

                <Button type="primary" onClick={handleAddSkill}>
                    Add Skill
                </Button>
            </Space>
            
            <Flex align="flex-end" gap="10px" justify="flex-end">
                <Link to={ROUTE_CONSTANTS.EDUCATION}>BACK</Link>
                <Button 
                    type="primary" 
                    loading={loading} 
                    onClick={handleSaveSkills} 
                    disabled={loading || skills.length === 0}
                >
                    NEXT
                </Button>
            </Flex>
        </div>
    );
};

export default Skills;
