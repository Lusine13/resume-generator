import { jsPDF } from "jspdf";
import { Button } from 'antd';
import { useSelector } from 'react-redux'; 

const GeneratePDF = () => {
  
  const { authUserInfo: { userData }, educationData, skillsData, projectsData, socialLinksData } = useSelector((store) => store.userProfile);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Profile", 10, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${userData.firstName} ${userData.lastName}`, 10, 30);
    doc.text(`Email: ${userData.email}`, 10, 40);

    
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 45, 200, 45);

    if (Array.isArray(educationData) && educationData.length > 0) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Education", 10, 60);
      doc.setFont("helvetica", "normal");
      educationData.forEach((edu, index) => {
        const yPosition = 70 + index * 20;
        doc.text(`${edu.degree} in ${edu.field}`, 10, yPosition);
        doc.text(`${edu.institution}, ${edu.year}`, 10, yPosition + 10);
      });
    } else {
      doc.text("No Education Information Provided", 10, 60);
    }

  
    doc.line(10, 100, 200, 100);

   
    if (Array.isArray(skillsData) && skillsData.length > 0) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Skills", 10, 110);
      doc.setFont("helvetica", "normal");
      doc.text(skillsData.join(", "), 10, 120);
    } else {
      doc.text("No Skills Provided", 10, 110);
    }

    doc.line(10, 130, 200, 130);

  
    if (Array.isArray(projectsData) && projectsData.length > 0) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Projects", 10, 140);
      doc.setFont("helvetica", "normal");
      projectsData.forEach((project, index) => {
        const yPosition = 150 + index * 20;
        doc.text(`${project.name}:`, 10, yPosition);
        doc.text(project.description, 30, yPosition);
      });
    } else {
      doc.text("No Projects Information Provided", 10, 140);
    }

 
    doc.line(10, 180, 200, 180);


    if (Array.isArray(socialLinksData) && socialLinksData.length > 0) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Social Links", 10, 190);
      doc.setFont("helvetica", "normal");
      socialLinksData.forEach((link, index) => {
        const yPosition = 200 + index * 10;
        doc.text(link, 10, yPosition);
      });
    } else {
      doc.text("No Social Links Provided", 10, 190);
    }

    doc.output('dataurlnewwindow');
  };

  return (
    <Button type="primary" onClick={generatePDF}>
      Generate PDF
    </Button>
  );
};

export default GeneratePDF;
