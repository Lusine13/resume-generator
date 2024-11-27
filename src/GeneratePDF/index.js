import React from "react";
import { Button } from 'antd';
import { jsPDF } from "jspdf";
import './index.css';

const GeneratePDF = () => {
    const generatePDF = () => {
        
        const profile = JSON.parse(sessionStorage.getItem('profile'));
        const skills = JSON.parse(sessionStorage.getItem('skills'));
        const education = JSON.parse(sessionStorage.getItem('education'));
        const projects = JSON.parse(sessionStorage.getItem('projects'));
        const socialLinks = JSON.parse(sessionStorage.getItem('socialLinks'));

        if (!profile) {
            alert("Profile data not available");
            return;
        }

        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");

        // Profile Section 
        doc.setFillColor(242, 242, 242); 
        doc.rect(0, 0, 210, 30, 'F'); 
        doc.setFontSize(22);
        doc.setTextColor(50, 50, 50); 
        doc.text("Profile", 10, 20);

        
        if (profile.imageUrl) {            
            doc.addImage(profile.imageUrl, 'JPEG', 150, 30, 40, 40);  
        } else {
            console.log('No image URL available');
        }

        // Profile Details
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80); 
        doc.text(`Name: ${profile.firstName} ${profile.lastName}`, 10, 40);
        doc.text(`Phone: ${profile.phoneNumber}`, 10, 50);
        doc.text(`Address: ${profile.address}`, 10, 60);

        // Skills Section
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80); 
        doc.text("Skills", 10, 80);

        doc.setFontSize(12);
        doc.setTextColor(85, 85, 85); 
        skills.forEach((skill, index) => {
            doc.text(`${index + 1}. ${skill}`, 10, 90 + index * 10);
        });

        // Education Section
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        doc.text("Education", 10, 130);

        if (education) {
            doc.setFontSize(12);
            doc.setTextColor(85, 85, 85);
            const { courseName, college, percentage, year } = education;
            doc.text(`Course Name: ${courseName}`, 10, 140);
            doc.text(`College: ${college}`, 10, 150);
            doc.text(`Percentage: ${percentage}`, 10, 160);
            doc.text(`Graduation Year: ${year}`, 10, 170);
        }

        // Projects Section
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        doc.text("Projects", 10, 190);

        if (projects) {
            doc.setFontSize(12);
            doc.setTextColor(85, 85, 85);
            doc.text(`Project Name: ${projects.projectName}`, 10, 200);
            doc.text(`Tech Stack: ${projects.techStack}`, 10, 210);
            doc.text(`Description: ${projects.description}`, 10, 220);
        }

        // Social Links Section
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        doc.text("Social Links", 10, 240);

        if (socialLinks) {
            doc.setFontSize(12);
            doc.setTextColor(85, 85, 85);
            socialLinks.forEach((link, index) => {
                doc.text(`${index + 1}. ${link}`, 10, 250 + index * 10);
            });
        }

        
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        
        const pdfWindow = window.open(pdfUrl, '_blank');
        pdfWindow.focus();
    };

    return (
        <Button type="primary" onClick={generatePDF}>
            View PDF
        </Button>
    );
};

export default GeneratePDF;