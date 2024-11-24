import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; 
import { Tabs } from 'antd';
import { ROUTE_CONSTANTS } from '../../../constants';
import './index.css';

const ResumeLayout = () => {
  const { TabPane } = Tabs; 
  const location = useLocation();
  const navigate = useNavigate();

  const getTabKey = (path) => {
    switch (path) {
      case ROUTE_CONSTANTS.PROFILE:
        return "1";
      case ROUTE_CONSTANTS.EDUCATION:
        return "2";
      case ROUTE_CONSTANTS.SKILLS:
        return "3";
      case ROUTE_CONSTANTS.PROJECTS:
        return "4";
      case ROUTE_CONSTANTS.SOCIAL:
        return "5";
      default:
        return "1"; 
    }
  };

  
  const activeKey = getTabKey(location.pathname);

  return (
    <div className="resume_layout_container">
      <Tabs activeKey={activeKey} onChange={(key) => {
        
        switch (key) {
          case "1":
            navigate(ROUTE_CONSTANTS.PROFILE);
            break;
          case "2":
            navigate(ROUTE_CONSTANTS.EDUCATION);
            break;
          case "3":
            navigate(ROUTE_CONSTANTS.SKILLS);
            break;
          case "4":
            navigate(ROUTE_CONSTANTS.PROJECTS);
            break;
          case "5":
            navigate(ROUTE_CONSTANTS.SOCIAL);
            break;
          default:
            navigate(ROUTE_CONSTANTS.PROFILE);
        }
      }}>
        <TabPane tab="Profile" key="1">
          <Outlet />
        </TabPane>
        <TabPane tab="Education" key="2">
          <Outlet />
        </TabPane>
        <TabPane tab="Skills" key="3">
          <Outlet />
        </TabPane>
        <TabPane tab="Projects" key="4">
          <Outlet />
        </TabPane>
        <TabPane tab="Social" key="5">
          <Outlet />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ResumeLayout;
