import React from "react";
import { Button } from 'antd';
import { jsPDF } from "jspdf";
import './index.css';

const GeneratePDF = () => {
    const generatePDF = () => {     

        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");
      

        // Profile Section 
        doc.setFillColor(137, 155, 180); 
        doc.rect(0, 0, 210, 60, 'F'); 
        doc.setFontSize(24);
        doc.setTextColor(50, 50, 50); 
       
   
        let profileData = sessionStorage.getItem("profile");
        profileData = JSON.parse(profileData); 
        
        doc.text(`${profileData?.firstName} ${profileData?.lastName}`, 10, 20); 
        doc.setFontSize(20);               
        doc.text(`Address: ${profileData?.address || ""}`, 10, 30);
        doc.text(`Phone: ${profileData?.phoneNumber || 'None'}`, 10, 40); 
        if (profileData?.imageUrl) {
            console.log("Image URL:", profileData?.imageUrl); 
            doc.addImage(profileData?.imageUrl, 'JPEG', 150, 30, 40, 40);
        } else {
            console.log("No image URL found.");
        }
          
        
        // Education Section
        doc.setFillColor(240, 240, 240); 
        doc.rect(0, 60, 210, 250, 'F');        
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        let educationData = sessionStorage.getItem("education");
        educationData = JSON.parse(educationData); 
        doc.text("Education", 10, 80);

        doc.setFontSize(12);
        doc.setTextColor(85, 85, 85);            
        doc.text(`Course Name: ${educationData?.courseName}`, 10, 90);
        doc.text(`College: ${educationData?.college}`, 10, 100);
        doc.text(`Percentage: ${educationData?.percentage}`, 10, 110);
        doc.text(`Graduation Year: ${educationData?.year}`, 10, 120);       

        // Projects Section
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        let projectsData = sessionStorage.getItem("projects");
        projectsData = JSON.parse(projectsData); 
        doc.text("Projects", 10, 140);
     
        doc.setFontSize(12);
        doc.setTextColor(85, 85, 85);
        doc.text(`Project Name: ${projectsData?.projectName}`, 10, 150);
        doc.text(`Tech Stack: ${projectsData?.techStack}`, 10, 160);
        doc.text(`Description: ${projectsData?.description}`, 10, 170);
  
        // Skills Section
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80); 
        let skillsData = sessionStorage.getItem("skills");
        skillsData = JSON.parse(skillsData); 
        doc.text("Skills", 10, 190);

        doc.setFontSize(12);
        doc.setTextColor(85, 85, 85); 
        skillsData?.forEach((skill, index) => {
            doc.text(`${index + 1}. ${skill}`, 10, 200 + index * 10);
        });

        // Social Links Section
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        let socialLinksData = sessionStorage.getItem("socialLinks");
        socialLinksData = JSON.parse(socialLinksData); 
        doc.text("Social Links", 10, 230);

        doc.setFontSize(12);
        doc.setTextColor(85, 85, 85);
        doc.text(`Facebook: ${socialLinksData?.facebookLinkName}`, 10, 240);
        doc.text(`LinkedIn: ${socialLinksData?.linkedinLinkName}`, 10, 250);
        doc.text(`Other: ${socialLinksData?.otherLinkName}`, 10, 260);
        
          

        // Create a Blob from the PDF content
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab
        const pdfWindow = window.open(pdfUrl, '_blank');
        pdfWindow.focus(); 
    };

    return (
        <Button type="primary" onClick={generatePDF}>
            Generate PDF
        </Button>
    );
};

export default GeneratePDF;
