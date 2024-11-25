import React, { useState } from "react";
import { ROUTE_CONSTANTS } from "../../constants";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUserProfileInfo } from '../../state-managment/slices/userProfile'; 
import { Divider, Flex, Tag, Input, Button } from 'antd';
import './index.css';

const Skills = () => {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([]); 
    const [inputValue, setInputValue] = useState(""); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserSkills = async () => {
        setLoading(true);
        dispatch(fetchUserProfileInfo({ skills }));
        navigate(ROUTE_CONSTANTS.PROJECTS);
        setLoading(false);
    };

    const handleAddSkill = () => {
        if (inputValue && !skills.includes(inputValue)) {
            setSkills([...skills, inputValue]);
            setInputValue(""); 
        }
    };

    const handleDeleteSkill = (removedSkill) => {
        setSkills(skills.filter(skill => skill !== removedSkill)); 
    };

    return (
        <div className='container'>
            <Flex gap="4px 0" wrap>
                {skills.map((skill, index) => (
                    <Tag 
                        key={index} 
                        bordered={false} 
                        closable
                        onClose={() => handleDeleteSkill(skill)}
                    >
                        {skill}
                    </Tag>
                ))}
            </Flex>

            <Divider />

            <div>
                <Input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                    onPressEnter={handleAddSkill} 
                    placeholder="Enter a skill"
                    style={{ width: 200, marginRight: 10 }}
                />
                <Button 
                    type="primary" 
                    onClick={handleAddSkill} 
                >
                    Add Skill
                </Button>
            </div>

            <Divider />

            
            <Flex align="flex-end" gap="10px" justify="flex-end">
                <Link to={ROUTE_CONSTANTS.EDUCATION}>
                  BACK
                </Link>
                <Link to={ROUTE_CONSTANTS.PROJECTS}
                onClick={handleUserSkills}
                disabled={loading || skills.length === 0}
                >
                  NEXT
                </Link>
                
                </Flex>
            </div>
    );
};

export default Skills;
