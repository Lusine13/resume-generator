import React from 'react';
import { Outlet } from 'react-router-dom'; 
import { Tabs } from 'antd'; 


const ResumeLayout = () => {
  const { TabPane } = Tabs; 
  return (
    <div className="resume_layout_container">
      
      <Tabs defaultActiveKey="1" onChange={(key) => console.log(key)}>
        
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
