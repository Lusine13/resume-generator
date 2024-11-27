import React, { useState } from "react";
import { Input, Tag, Button, Space, message, Flex } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants";

const Skills = () => {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const handleAddSkill = () => {
        if (inputValue && !skills.includes(inputValue)) {
            setSkills([...skills, inputValue]);
            setInputValue("");
        }
    };

    const handleDeleteSkill = (removedSkill) => {
        setSkills(skills.filter(skill => skill !== removedSkill));
    };

    const handleSaveSkills = () => {      
        setLoading(true);        
        sessionStorage.setItem('skills', JSON.stringify(skills));
      
        setTimeout(() => {
            message.success('Skills saved successfully!');
            setLoading(false); 
            navigate(ROUTE_CONSTANTS.PROJECTS);
        }, 1000); 
    };

    return (
        <div className='container'>
            <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                    {skills.map((skill, index) => (
                        <Tag key={index} closable onClose={() => handleDeleteSkill(skill)}>{skill}</Tag>
                    ))}
                </div>

                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleAddSkill}
                    placeholder="Enter a skill"
                    style={{ width: 200, marginBottom: 10 }}
                />

                <Button type="primary" onClick={handleAddSkill}>Add Skill</Button>
            </Space>

            <Flex align="flex-end" gap="10px" justify="flex-end">
                <Link to={ROUTE_CONSTANTS.PROFILE}>BACK</Link>
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
