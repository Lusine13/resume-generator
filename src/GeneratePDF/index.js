import React from "react";
import { Button } from "antd";
import { jsPDF } from "jspdf";

const GeneratePDF = () => {
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;

    const HEADER_BG = [55, 71, 90];
    const HEADER_TEXT = [255, 255, 255];
    const SECTION_TITLE = [55, 71, 90];
    const BODY_TEXT = [60, 60, 60];

    // Load all localStorage data
    let profile = JSON.parse(localStorage.getItem("profile") || "{}");
    let education = JSON.parse(localStorage.getItem("education") || "{}");
    let skills = JSON.parse(localStorage.getItem("skills") || "[]");
    let project = JSON.parse(localStorage.getItem("projects") || "{}");
    let social = JSON.parse(localStorage.getItem("socialLinks") || "{}");

    // Page break helper
    let y = 20;
    const ensureSpace = (h = 12) => {
      if (y + h > pageHeight - margin) {
        doc.addPage();
        y = margin + 10;
      }
    };

    // ---------------- HEADER ----------------
    doc.setFillColor(...HEADER_BG);
    doc.rect(0, 0, 210, 40, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(...HEADER_TEXT);
    doc.text(`${profile.firstName || ""} ${profile.lastName || ""}`, 10, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    let lineY = 27;

    if (profile.email) {
  doc.text(`Email: ${profile.email}`, 10, lineY);
  lineY += 5;
}

if (profile.phoneNumber) {
  doc.text(`Phone: ${profile.phoneNumber}`, 10, lineY);
  lineY += 5;
}

if (profile.address) {
  doc.text(`Address: ${profile.address}`, 10, lineY);
}


    // Profile Image
    if (profile.imageUrl) {
  try {
    const imgWidth = 30;  
    const imgHeight = 34; 
    const xPos = 140;      
    const yPos = 4;        

    doc.addImage(profile.imageUrl, "JPEG", xPos, yPos, imgWidth, imgHeight);
  } catch (err) {
    console.log("Error adding image:", err);
  }
}

    y = 50;

    // ---------------- SECTION TITLE HELPER ----------------
    const addSectionTitle = (title) => {
      ensureSpace(12);
      doc.setFillColor(240, 240, 240);
      doc.rect(0, y - 7, 210, 10, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(...SECTION_TITLE);
      doc.text(title, 10, y);

      y += 10;
    };

    // ---------------- EDUCATION ----------------
    addSectionTitle("Education");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(...BODY_TEXT);

    ensureSpace(30);

    doc.text(`Course: ${education.courseName || ""}`, 10, y);
    doc.text(`College: ${education.college || ""}`, 10, y + 6);
    doc.text(`Percentage: ${education.percentage || ""}`, 10, y + 12);
    doc.text(`Graduation Year: ${education.year || ""}`, 10, y + 18);

    y += 28;

    // ---------------- SKILLS ----------------
    if (skills.length > 0) {
      addSectionTitle("Skills");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11); 

      skills.forEach((skill) => {
        ensureSpace(8);
        doc.circle(11, y - 2, 1, "S"); 
        doc.text(skill, 16, y);
        y += 6;
      });

      y += 6;
    }

    // ---------------- PROJECTS ----------------
    if (project.projectName || project.techStack || project.description) {
      addSectionTitle("Projects");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(project.projectName || "", 10, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      if (project.techStack) {
        ensureSpace(8);
        doc.text(`Tech Stack: ${project.techStack}`, 10, y);
        y += 7;
      }

      if (project.description) {
        ensureSpace(10);
        doc.text("Description:", 10, y);
        y += 6;

        const lines = doc.splitTextToSize(project.description, 190);
        lines.forEach((line) => {
          ensureSpace(7);
          doc.text(line, 10, y);
          y += 5;
        });

        y += 4;
      }
    }

    // ---------------- SOCIAL LINKS (SMART DETECTION) ----------------
    const socialItems = [];

    // Facebook (from dedicated field)
    if (social.facebookLinkName) {
      socialItems.push({
        icon: "Fb:",
        label: "Facebook",
        value: social.facebookLinkName
      });
    }

    // LinkedIn (from dedicated field)
    if (social.linkedinLinkName) {
      socialItems.push({
        icon: "In:",
        label: "LinkedIn",
        value: social.linkedinLinkName
      });
    }

    // Smart detection for the third “other” link
    if (social.otherLinkName) {
      const url = social.otherLinkName.toLowerCase();
      let icon = "Web:";
      let label = "Website";

      if (url.includes("github.com")) {
        icon = "Gh:";
        label = "GitHub";
      } else if (url.includes("behance.net")) {
        icon = "Be:";
        label = "Behance";
      } else if (url.includes("dribbble.com")) {
        icon = "Dr:";
        label = "Dribbble";
      } else if (url.includes("linkedin.com")) {
        icon = "In:";
        label = "LinkedIn";
      }

      socialItems.push({
        icon,
        label,
        value: social.otherLinkName
      });
    }

    // Render Social section only if something exists
    if (socialItems.length > 0) {
      addSectionTitle("Social Links");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      socialItems.forEach((item) => {
        ensureSpace(8);
        doc.text(`${item.icon} ${item.value}`, 10, y);
        y += 6;
      });
    }

    // ---------------- EXPORT PDF ----------------
    const pdfBlob = doc.output("blob");
    const pdfURL = URL.createObjectURL(pdfBlob);
    window.open(pdfURL, "_blank");
  };

  return (
    <Button type="primary" onClick={generatePDF}>
      Generate PDF
    </Button>
  );
};

export default GeneratePDF;
