import React from "react";
import { Button } from "antd";
import { jsPDF } from "jspdf";

const GeneratePDF = () => {
  const generatePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");

    const PAGE_W = doc.internal.pageSize.getWidth();
    const PAGE_H = doc.internal.pageSize.getHeight();
    const TOP = 20;
    const BOTTOM = 20;
    const LEFT = 18;

    let y = TOP;

    const template = localStorage.getItem("resumeTemplate") || "modern";

    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    const education = JSON.parse(localStorage.getItem("education") || "{}");
    const skills = JSON.parse(localStorage.getItem("skills") || "[]");
    const project = JSON.parse(localStorage.getItem("projects") || "{}");
    const social = JSON.parse(localStorage.getItem("socialLinks") || "{}");

    /* ---------- PAGE FLOW ---------- */
    const next = (h = 6) => {
      if (y + h > PAGE_H - BOTTOM) {
        doc.addPage();
        y = TOP;
      }
      y += h;
    };

    /* ---------- IMAGE ---------- */
    const normalizeImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          c.getContext("2d").drawImage(img, 0, 0);
          resolve(c.toDataURL("image/jpeg"));
        };
        img.src = src;
      });

    const drawSquarePhoto = async (x, yImg, size) => {
      if (!profile.imageUrl) return;
      const img = await normalizeImage(profile.imageUrl);
      doc.addImage(img, "JPEG", x, yImg, size, size);
    };

    /* ---------- SECTION TITLE ---------- */
    const sectionTitle = (text) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text(text.toUpperCase(), LEFT, y);
      next(2);
      doc.setDrawColor(180);
      doc.line(LEFT, y, PAGE_W - LEFT, y);
      next(6);
    };

    /* ---------- CONTENT ---------- */
    const renderEducation = () => {
      sectionTitle("Education");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`${education.courseName || ""} – ${education.college || ""}`, LEFT, y);
      next();
      doc.text(
        `Year: ${education.year || ""} | Percentage: ${education.percentage || ""}`,
        LEFT,
        y
      );
      next(12); 
    };

    const renderSkills = () => {
      sectionTitle("Skills");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      skills.forEach((s) => {
        doc.text(`• ${s}`, LEFT, y);
        next(5);
      });
      next(10); 
    };

    const renderProjects = () => {
      sectionTitle("Projects");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(project.projectName || "", LEFT, y);
      next();

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Tech Stack: ${project.techStack || ""}`, LEFT, y);
      next(6);

      doc
        .splitTextToSize(project.description || "", PAGE_W - LEFT * 2)
        .forEach((l) => {
          doc.text(l, LEFT, y);
          next(5);
        });

      next(12); 
    };

    const renderSocial = () => {
      sectionTitle("Social");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      if (social.facebookLinkName) {
        doc.text(`Facebook: ${social.facebookLinkName}`, LEFT, y);
        next(5);
      }
      if (social.linkedinLinkName) {
        doc.text(`LinkedIn: ${social.linkedinLinkName}`, LEFT, y);
        next(5);
      }
      if (social.otherLinkName) {
        doc.text(`Website: ${social.otherLinkName}`, LEFT, y);
        next(5);
      }

      next(10); 
    };

    /* ---------- MODERN  ---------- */
    const modern = async () => {
      
      doc.setFillColor(50, 111, 105); 
      doc.rect(0, 0, PAGE_W, 55, "F");

      await drawSquarePhoto(PAGE_W - 52, 14, 30);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(255, 255, 255);
      doc.text(`${profile.firstName || ""} ${profile.lastName || ""}`, LEFT, 26);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(
        [profile.email, profile.phoneNumber, profile.address].filter(Boolean).join(" • "),
        LEFT,
        38
      );

      y = 70;
      doc.setTextColor(40, 40, 40);

      renderEducation();
      renderSkills();
      renderProjects();
      renderSocial();
    };

    /* ---------- MINIMAL ---------- */
    const minimal = async () => {
    
      doc.setFillColor(247, 247, 247);
      doc.rect(0, 0, PAGE_W, PAGE_H, "F");

      doc.setDrawColor(0);
      doc.rect(LEFT, TOP, PAGE_W - LEFT * 2, 45);

      await drawSquarePhoto(PAGE_W - LEFT - 32, TOP + 6, 28);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(`${profile.firstName} ${profile.lastName}`, LEFT + 6, TOP + 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(
        [profile.email, profile.phoneNumber, profile.address].filter(Boolean).join(" | "),
        LEFT + 6,
        TOP + 30
      );

      y = TOP + 60;

      renderEducation();
      renderSkills();
      renderProjects();
      renderSocial();
    };

    /* ---------- CORPORATE ---------- */
    const corporate = async () => {
      const sideW = 62;
      const gap = 10;
      const xMain = sideW + gap;
      const mainW = PAGE_W - xMain - LEFT;

      let yMain = 22;

      const paintCorporatePage = () => {
        
        doc.setFillColor(246, 247, 251);
        doc.rect(0, 0, PAGE_W, PAGE_H, "F");
        
        doc.setFillColor(33, 45, 64);
        doc.rect(0, 0, sideW, PAGE_H, "F");
      };

      const nextMain = (h = 6) => {
        if (yMain + h > PAGE_H - BOTTOM) {
          doc.addPage();
          paintCorporatePage();
          yMain = 22;
        }
        yMain += h;
      };

      const sectionTitleMain = (text) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(33, 45, 64);
        doc.text(text.toUpperCase(), xMain, yMain);
        nextMain(2);
        doc.setDrawColor(180);
        doc.line(xMain, yMain, xMain + mainW, yMain);
        nextMain(7);
      };

      const drawSidebarBlock = (label, value, yPos) => {
        if (!value) return yPos;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(235, 238, 245);
        doc.text(label, 10, yPos);
        yPos += 4;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        const lines = doc.splitTextToSize(String(value), sideW - 16);
        lines.forEach((l) => {
          doc.text(l, 10, yPos);
          yPos += 4;
        });
        return yPos + 4;
      };

      paintCorporatePage();

      // photo 
      await drawSquarePhoto(18, 18, 26);

      let ySide = 52;
      ySide = drawSidebarBlock("EMAIL", profile.email, ySide);
      ySide = drawSidebarBlock("PHONE", profile.phoneNumber, ySide);
      ySide = drawSidebarBlock("ADDRESS", profile.address, ySide);

      // socials in sidebar
      if (social.facebookLinkName || social.linkedinLinkName || social.otherLinkName) {
        doc.setDrawColor(255);
        doc.setLineWidth(0.3);
        doc.line(10, ySide, sideW - 10, ySide);
        ySide += 8;

        ySide = drawSidebarBlock("FACEBOOK", social.facebookLinkName, ySide);
        ySide = drawSidebarBlock("LINKEDIN", social.linkedinLinkName, ySide);
        ySide = drawSidebarBlock("WEBSITE", social.otherLinkName, ySide);
      }

      // name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(25, 25, 25);
      doc.text(`${profile.firstName || ""} ${profile.lastName || ""}`, xMain, yMain);
      nextMain(10);

      doc.setDrawColor(210);
      doc.line(xMain, yMain, xMain + mainW, yMain);
      nextMain(14);

      // education
      sectionTitleMain("Education");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      doc.text(`${education.courseName || ""} – ${education.college || ""}`, xMain, yMain);
      nextMain(6);
      doc.setFontSize(10);
      doc.setTextColor(90, 90, 90);
      doc.text(
        `Year: ${education.year || ""} | Percentage: ${education.percentage || ""}`,
        xMain,
        yMain
      );
      nextMain(14);

      // skills
      sectionTitleMain("Skills");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      skills.forEach((s) => {
        doc.text(`• ${s}`, xMain, yMain);
        nextMain(5);
      });
      nextMain(12);

      // projects
      sectionTitleMain("Projects");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);
      doc.text(project.projectName || "", xMain, yMain);
      nextMain(6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(90, 90, 90);
      doc.text(`Tech Stack: ${project.techStack || ""}`, xMain, yMain);
      nextMain(7);

      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.splitTextToSize(project.description || "", mainW).forEach((l) => {
        doc.text(l, xMain, yMain);
        nextMain(5);
      });
      nextMain(12);      
    };

    /* ---------- SWITCH ---------- */
    if (template === "minimal") await minimal();
    else if (template === "corporate") await corporate();
    else await modern();

    doc.output("dataurlnewwindow");
  };

  return (
    <Button type="primary" onClick={generatePDF}>
      Generate PDF
    </Button>
  );
};

export default GeneratePDF;
