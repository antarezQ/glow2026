import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./CourseDetail.css";

// Shared professor records
const P = {
  ashraf: { name: "Assoc. Prof. Dr. Muhammad Ashraf Bin Fauri", uni: "Universiti Malaysia Pahang Al-Sultan Abdullah", img: "/img/speakers/ashraf.png" },
  naveen: { name: "Prof. Dr. Naveen Kumar", uni: "Chitkara University, India", img: "/img/speakers/naveen.png" },
  raquel: { name: "Prof. Raquel Simões de Almeida", uni: "Polytechnic Institute of Porto, Portugal", img: "/img/speakers/raquel.png" },
  rasidi: { name: "Prof. Madya Ts. Dr. Mohd Rasidi Bin Ibrahim", uni: "Universiti Tun Hussein Onn Malaysia", img: "/img/speakers/rasidi.png" },
  robert: { name: "Prof. Robert De Souza", uni: "National University of Singapore", img: "/img/speakers/robert.png" },
  nurbaity: { name: "Dr. Nurbaity Binti Sabri", uni: "Universiti Teknologi MARA, Malaysia", img: "/img/speakers/nurbaity.png" },
  ruslan: { name: "Prof. Ruslan Abdul Rahim", uni: "Multimedia University, Malaysia", img: "/img/speakers/ruslan.png" },
  khairul: { name: "Ts. Dr. Khairul Shafee bin Kalid", uni: "Universiti Teknologi PETRONAS, Malaysia", img: "/img/speakers/khairul.png" },
  jianmin: { name: "Jianmin Ma", uni: "ZTE", img: "/img/speakers/jianmin.png" },
};

// Room locations (Tokong Nanas Building)
const TN_AUD2 = "Auditorium, 2nd Fl., Tokong Nanas Building";
const TN_AUD3 = "Auditorium, 3rd Fl., Tokong Nanas Building";
const TN_AUD8 = "Auditorium, 8th Fl., Tokong Nanas Building";
const TN_0404 = "KU3.03.04, 3rd Fl., Tokong Nanas Building";
const TN_0405 = "KU3.03.05, 3rd Fl., Tokong Nanas Building";
const TN_0407 = "KU3.03.07, 3rd Fl., Tokong Nanas Building";
const TN_0408 = "KU3.03.08, 3rd Fl., Tokong Nanas Building";
const TN_0409 = "KU3.03.09, 3rd Fl., Tokong Nanas Building";
const TN_0316 = "KU3.03.16, 3rd Fl., Tokong Nanas Building";
const TN_0318 = "KU3.03.18, 3rd Fl., Tokong Nanas Building";
const TN_0319 = "KU3.03.19, 3rd Fl., Tokong Nanas Building";
const TN_0902 = "KU3.09.02, 9th Fl., Tokong Nanas Building";
const TN_0904 = "KU3.09.04, 9th Fl., Tokong Nanas Building";

// Full schedule (SharePoint embed) — shown via the "View Full Schedule" button next to Week 1
const FULL_SCHEDULE_EMBED_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTz27VkDYVYgyoi3zbGuAjSlmpJWnSJkEE0bmsIR5vsTs5WIVOvBW-eWl3l5_ui9btKOfWv7btpq3pN/pubhtml?widget=true&amp;headers=false";


// Helper to build a standard Week-2 block (Mon–Fri, two sessions/day, same lecturer & room)
function week2Standard(name, isProf, location, times = ["09.00 – 11.30", "13.30 – 16.30"]) {
  const dates = ["Mon, 13 Jul 2026", "Tue, 14 Jul 2026", "Wed, 15 Jul 2026", "Thu, 16 Jul 2026", "Fri, 17 Jul 2026"];
  return dates.flatMap((date) => times.map((time) => ({ date, time, name, isProf, location })));
}

const COURSES = [
  {
    slug: "strategic-management", title: "Strategic Management", credit: "4 Credit",
    department: "ICT Business", icon: "/img/business.png",
    description: "This course discusses the concepts and applications of strategic management in organizations, particularly in business, to address complex and dynamic environments. The material covers the foundations and frameworks of strategy, environmental analysis, as well as strategic issues such as economics, social factors, technology, and innovation. Students are expected to be able to identify company strategies and conduct strategic management audits, as well as understand their relationship to sustainable and innovative industrial development (SDGs).",
    prodi: [
      {
        name: "ICT Business & Accounting", code: "DAK2JAB4",
        professors: [P.ashraf],
        coLecturers: ["Sunu Puguh Hayu Triono, S.T., M.M., Dr.", "Assoc. Prof. Siska Noviaristanti, M.T., Ph.D.", "Dr. Hilda Salman Said, S.E., M.Si., Ak., CA., CPA."],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.ashraf.name, isProf: true, location: TN_AUD3 },
            { date: "Tue, 7 Jul 2026", time: "07.30 – 12.30", name: P.ashraf.name, isProf: true, location: TN_AUD3 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 17.30", name: "Sunu Puguh Hayu Triono, S.T., M.M., Dr.", isProf: false, location: TN_AUD3 },
            { date: "Thu, 9 Jul 2026", time: "07.30 – 12.30", name: P.ashraf.name, isProf: true, location: TN_AUD3 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Assoc. Prof. Siska Noviaristanti, M.T., Ph.D.", isProf: false, location: TN_AUD3 },
            { date: "Fri, 10 Jul 2026", time: "07.30 – 12.30", name: "Assoc. Prof. Siska Noviaristanti, M.T., Ph.D.", isProf: false, location: TN_AUD3 },
            { date: "Fri, 10 Jul 2026", time: "13.30 – 17.30", name: P.ashraf.name, isProf: true, location: TN_AUD3 },
          ],
          week2: [
            { date: "Mon, 13 Jul 2026", time: "07.30 – 12.30", name: "Sunu Puguh Hayu Triono, S.T., M.M., Dr.", isProf: false, location: TN_AUD3 },
            { date: "Mon, 13 Jul 2026", time: "13.30 – 17.30", name: "Assoc. Prof. Siska Noviaristanti, M.T., Ph.D.", isProf: false, location: TN_AUD3 },
            { date: "Tue, 14 Jul 2026", time: "07.30 – 12.30", name: "Dr. Hilda Salman Said, S.E., M.Si., Ak., CA., CPA.", isProf: false, location: TN_AUD3 },
            { date: "Tue, 14 Jul 2026", time: "13.30 – 17.30", name: "Dr. Hilda Salman Said, S.E., M.Si., Ak., CA., CPA.", isProf: false, location: TN_AUD3 },
            { date: "Wed, 15 Jul 2026", time: "07.30 – 12.30", name: "Sunu Puguh Hayu Triono, S.T., M.M., Dr.", isProf: false, location: TN_AUD3 },
            { date: "Wed, 15 Jul 2026", time: "13.30 – 17.30", name: "Assoc. Prof. Siska Noviaristanti, M.T., Ph.D.", isProf: false, location: TN_AUD3 },
            { date: "Thu, 16 Jul 2026", time: "07.30 – 12.30", name: "Sunu Puguh Hayu Triono, S.T., M.M., Dr.", isProf: false, location: TN_AUD3 },
            { date: "Thu, 16 Jul 2026", time: "13.30 – 17.30", name: "Dr. Hilda Salman Said, S.E., M.Si., Ak., CA., CPA.", isProf: false, location: TN_AUD3 },
            { date: "Fri, 17 Jul 2026", time: "07.30 – 12.30", name: "Sunu Puguh Hayu Triono, S.T., M.M., Dr.", isProf: false, location: TN_AUD3 },
            { date: "Fri, 17 Jul 2026", time: "13.30 – 17.30", name: "Dr. Hilda Salman Said, S.E., M.Si., Ak., CA., CPA.", isProf: false, location: TN_AUD3 },
          ],
        },
      },
    ],
  },
  {
    slug: "data-security-blockchain", title: "Data Security & Blockchain", credit: "3 Credit",
    department: "Telecommunication Engineering", icon: "/img/cloud-server.png",
    description: "This course is a compulsory course with a weight of 3 credits. This course provides knowledge of the practical application of telecommunication network security in general which can be learned through basic concepts and theories of cryptography (symmetric and asymmetric), examples of industry-standard, analysis of key exchange algorithms, authentication modeling, one-way and hash functions, concepts and attack systems at each protocol layer. This course also provides knowledge of security protocols at each TCP/IP layer and also the basic concepts about blockchain",
    prodi: [
      {
        name: "Telecommunication Engineering", code: "AAK3FAB3",
        professors: [P.naveen],
        coLecturers: ["Dr.Eng. Favian Dewanta, S.T., M.Eng.", "Dr.Eng. Danu Dwi Sanjoyo, S.T., M.T."],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.naveen.name, isProf: true, location: TN_0405 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.naveen.name, isProf: true, location: TN_0405 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 16.30", name: "Dr.Eng. Favian Dewanta, S.T., M.Eng. · Dr.Eng. Danu Dwi Sanjoyo, S.T., M.T.", isProf: false, location: TN_0405 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: P.naveen.name, isProf: true, location: TN_0405 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Dr.Eng. Favian Dewanta, S.T., M.Eng. · Dr.Eng. Danu Dwi Sanjoyo, S.T., M.T.", isProf: false, location: TN_0405 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 11.30", name: P.naveen.name, isProf: true, location: TN_0405 },
          ],
          week2: week2Standard("Dr.Eng. Favian Dewanta, S.T., M.Eng. · Dr.Eng. Danu Dwi Sanjoyo, S.T., M.T.", false, TN_0902),
        },
      },
    ],
  },
  {
    slug: "business-model-canvas", title: "Business Model Canvas and Communication for Social & SDGs", credit: "3 Credit",
    department: "Business Administration · Communication Science", icon: "/img/package.png",
    description: "This joint course pairs Business Model Canvas — exploring how to design a business model for a new idea or adapt an existing business to accelerate growth by understanding the market and winning the competition — with Communication for Social & SDGs, which examines international communication practices and their role in advancing sustainable development goals.",
    prodi: [
      {
        name: "Business Administration", code: "DEK3BAB3",
        professors: [P.raquel],
        coLecturers: ["Ihsan Hadiansah, S.E., M.S.M."],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.raquel.name, isProf: true, location: TN_AUD8 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.raquel.name, isProf: true, location: TN_AUD8 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 16.30", name: P.raquel.name, isProf: true, location: TN_AUD2 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: "Ihsan Hadiansah, S.E., M.S.M.", isProf: false, location: TN_0404 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Ihsan Hadiansah, S.E., M.S.M.", isProf: false, location: TN_0404 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 11.30", name: P.raquel.name, isProf: true, location: TN_AUD8 },
          ],
          week2: week2Standard("Ihsan Hadiansah, S.E., M.S.M.", false, TN_0404),
        },
      },
      {
        name: "Communication Science", code: "EAK2CAB3",
        professors: [P.raquel],
        coLecturers: ["Astaria Eka Santi, M.A."],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.raquel.name, isProf: true, location: TN_AUD8 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.raquel.name, isProf: true, location: TN_AUD8 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 16.30", name: "Astaria Eka Santi, M.A.", isProf: false, location: TN_0407 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: P.raquel.name, isProf: true, location: TN_AUD8 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Astaria Eka Santi, M.A.", isProf: false, location: TN_0407 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 11.30", name: P.raquel.name, isProf: true, location: TN_AUD8 },
          ],
          week2: week2Standard("Astaria Eka Santi, M.A.", false, TN_0407),
        },
      },
    ],
  },
  {
    slug: "material-manufacturing", title: "Material & Manufacturing Process", credit: "3 Credit",
    department: "Industrial Engineering", icon: "/img/hierarchy.png",
    description: "Materials and Manufacturing Processes focuses on understanding the relationship between material properties, manufacturing processes, and product design. The course covers engineering materials, machining, casting, forming, powder-based technologies, and additive manufacturing. Through theoretical and practical approaches, students develop the ability to select materials and manufacturing processes efficiently while considering advancements in modern manufacturing technology.",
    prodi: [
      {
        name: "Industrial Engineering", code: "BAK2DAB3",
        professors: [P.rasidi],
        coLecturers: ["Teddy Sjafrizal, B.Eng (Hons), M.Sc., Ph.D."],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.rasidi.name, isProf: true, location: TN_0409 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.rasidi.name, isProf: true, location: TN_0409 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 16.30", name: "Teddy Sjafrizal, B.Eng (Hons), M.Sc., Ph.D.", isProf: false, location: TN_0409 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: P.rasidi.name, isProf: true, location: TN_0409 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Teddy Sjafrizal, B.Eng (Hons), M.Sc., Ph.D.", isProf: false, location: TN_0409 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 11.30", name: P.rasidi.name, isProf: true, location: TN_0409 },
          ],
          week2: week2Standard("Teddy Sjafrizal, B.Eng (Hons), M.Sc., Ph.D.", false, TN_0409),
        },
      },
    ],
  },
  {
    slug: "data-analytics", title: "Data Analytics", credit: "3 Credit",
    department: "Industrial Engineering", icon: "/img/artificial-intelligence.png",
    description: "The Data Analytics course discusses the processes, methods, algorithms, and technologies for processing raw data into useful information for business and industry. This course aims to equip students with the ability to leverage data to solve real-world problems and support the field of information engineering.",
    prodi: [
      {
        name: "Industrial Engineering", code: "BAK3AAB2",
        professors: [P.robert, P.nurbaity],
        coLecturers: ["Dr. Mohammad Deni Akbar, S.T., M.Math"],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: "Dr. Mohammad Deni Akbar, S.T., M.Math", isProf: false, location: TN_0408 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.robert.name, isProf: true, location: TN_0408 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 16.30", name: "Dr. Mohammad Deni Akbar, S.T., M.Math", isProf: false, location: TN_0408 },
            { date: "Wed, 8 Jul 2026", time: "07.30 – 10.30", name: P.robert.name, isProf: true, location: TN_0408 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: P.nurbaity.name, isProf: true, location: TN_0408 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Dr. Mohammad Deni Akbar, S.T., M.Math", isProf: false, location: TN_0408 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 11.30", name: P.nurbaity.name, isProf: true, location: TN_0408 },
          ],
          week2: week2Standard("Dr. Mohammad Deni Akbar, S.T., M.Math", false, TN_0408),
        },
      },
    ],
  },
  {
    slug: "introduction-to-branding", title: "Introduction to Branding", credit: "2 Credit",
    department: "Visual Communication Design", icon: "/img/package.png",
    description: "Introduction to Branding is a mandatory course in the Visual Communication Design program that introduces key branding concepts, including brand elements, positioning, architecture, communication, and activation. The course equips students to analyze brand strategies, formulate positioning statements, and apply branding solutions in design contexts relevant to industry needs.",
    prodi: [
      {
        name: "Visual Communication Design", code: "FAK2AAB2",
        professors: [P.ruslan],
        coLecturers: ["Dr. Maria Josef Retno Budi Wahyuni, M.Ds"],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.ruslan.name, isProf: true, location: TN_0316 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.ruslan.name, isProf: true, location: TN_0316 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 15.30", name: "Dr. Maria Josef Retno Budi Wahyuni, M.Ds", isProf: false, location: TN_0316 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: P.ruslan.name, isProf: true, location: TN_0316 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 15.30", name: "Dr. Maria Josef Retno Budi Wahyuni, M.Ds", isProf: false, location: TN_0316 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 10.30", name: P.ruslan.name, isProf: true, location: TN_0316 },
          ],
          week2: week2Standard("Dr. Maria Josef Retno Budi Wahyuni, M.Ds", false, TN_0316, ["09.00 – 10.30", "13.30 – 15.30"]),
        },
      },
    ],
  },
  {
    slug: "artificial-intelligence", title: "Artificial Intelligence", credit: "3 Credit",
    department: "Information Technology · Informatics · Information System · Electrical Engineering", icon: "/img/artificial-intelligence.png",
    description: "The Artificial Intelligence course equips students with insights into modern AI — its history, trends, theories, and algorithms — and its application across enterprise and information-systems contexts, including Machine Learning, Deep Learning, Reinforcement Learning, and Generative AI such as Large Language Models (LLM) and AI Agents.",
    prodi: [
      {
        name: "Information Technology", code: "CBK2KAB3",
        professors: [P.jianmin],
        coLecturers: ["Achmad Lukman, S.T., M.Cs., Ph.D."],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 16.30", name: "Achmad Lukman, S.T., M.Cs., Ph.D.", isProf: false, location: TN_0318 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Achmad Lukman, S.T., M.Cs., Ph.D.", isProf: false, location: TN_0318 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 11.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
          ],
          week2: week2Standard("Achmad Lukman, S.T., M.Cs., Ph.D.", false, TN_0318),
        },
      },
      {
        name: "Informatics", code: "CAK3DAB3",
        professors: [P.jianmin],
        coLecturers: ["Dr. Aditya Firman Ihsan, S.Si., M.Si."],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 16.30", name: "Dr. Aditya Firman Ihsan, S.Si., M.Si.", isProf: false, location: TN_AUD8 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Dr. Aditya Firman Ihsan, S.Si., M.Si.", isProf: false, location: TN_AUD8 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 11.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
          ],
          week2: week2Standard("Dr. Aditya Firman Ihsan, S.Si., M.Si.", false, TN_AUD8),
        },
      },
      {
        name: "Information System", code: "BBK3HAB3",
        professors: [P.khairul],
        coLecturers: ["Taufik Nur Adi, S.Kom., M.T., Ph.D.", "Nur Ichsan Utama, S.T., M.T., Ph.D.", "Iqbal Yulizar Mukti, S.Si., M.T., Ph.D.", "Safara Cathasa R.R., S.T., M.T."],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.khairul.name, isProf: true, location: TN_0319 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.khairul.name, isProf: true, location: TN_0319 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 16.30", name: "Taufik Nur Adi, S.Kom., M.T., Ph.D.", isProf: false, location: TN_0319 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: P.khairul.name, isProf: true, location: TN_0319 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Taufik Nur Adi, S.Kom., M.T., Ph.D.", isProf: false, location: TN_0319 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 11.30", name: P.khairul.name, isProf: true, location: TN_0319 },
          ],
          week2: week2Standard("Taufik Nur Adi, S.Kom., M.T., Ph.D.", false, TN_0319),
        },
      },
      {
        name: "Electrical Engineering", code: "ABK3FAB3",
        professors: [P.jianmin],
        coLecturers: ["Dr. Marza Ihsan Marzuki, S.T., M.T."],
        schedule: {
          week1: [
            { date: "Mon, 6 Jul 2026", time: "13.30 – 16.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
            { date: "Tue, 7 Jul 2026", time: "09.00 – 11.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
            { date: "Tue, 7 Jul 2026", time: "13.30 – 16.30", name: "Dr. Marza Ihsan Marzuki, S.T., M.T.", isProf: false, location: TN_0904 },
            { date: "Thu, 9 Jul 2026", time: "09.00 – 11.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
            { date: "Thu, 9 Jul 2026", time: "13.30 – 16.30", name: "Dr. Marza Ihsan Marzuki, S.T., M.T.", isProf: false, location: TN_0904 },
            { date: "Fri, 10 Jul 2026", time: "09.00 – 11.30", name: P.jianmin.name, isProf: true, location: TN_AUD2 },
          ],
          week2: week2Standard("Dr. Marza Ihsan Marzuki, S.T., M.T.", false, TN_0904),
        },
      },
    ],
  },
];

function initials(name) {
  const clean = name.replace(/\([^)]*\)/g, "")
    .replace(/\b(Dr|Prof|Madya|Ts|Assoc|S\.?T|M\.?T|M\.?M|Ph\.?D|S\.?E|M\.?Si|S\.?Kom|S\.?Si|B\.?A|M\.?Ds|B\.?Eng|Hons|M\.?Eng|M\.?Cs|M\.?S\.?M|Ak|CA|CPA|M\.?Math|Eng|B\.?B\.?A|M\.?A\.?B)\b\.?/gi, "")
    .replace(/[.,()]/g, " ").trim().split(/\s+/).filter(Boolean);
  return ((clean[0]?.[0] || "") + (clean[1]?.[0] || "")).toUpperCase();
}

function CourseDetail() {
  const { slug } = useParams();
  const course = COURSES.find((c) => c.slug === slug);
  const [activeProdi, setActiveProdi] = useState(0);
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  useEffect(() => { setActiveProdi(0); }, [slug]);
  useEffect(() => {
    if (!showFullSchedule) return;
    const onKey = (e) => { if (e.key === "Escape") setShowFullSchedule(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showFullSchedule]);

  if (!course) return (
    <div className="cd-not-found">
      <p>Course not found.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );

  // Union of all professors across prodi (so every face shows)
  const allProfs = [];
  const seen = new Set();
  course.prodi.forEach((pr) => pr.professors.forEach((p) => { if (!seen.has(p.name)) { seen.add(p.name); allProfs.push(p); } }));

  const multiProdi = course.prodi.length > 1;
  const pr = course.prodi[activeProdi] || course.prodi[0];
  const weeklyRows = pr.schedule;

  return (
    <div className="cd-page">
      <div className="cd-hero">
        <div className="container">
          <Link to="/#courses" className="cd-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
            Back to Courses
          </Link>
          <div className="cd-hero-inner">
            <div className="cd-icon-wrap"><img src={course.icon} alt={course.title} /></div>
            <div>
              <p className="cd-dept">{course.department}</p>
              <h1 className="cd-title">{course.title}</h1>
              <div className="cd-meta">
                <span className="cd-credit">{course.credit}</span>
              </div>
              <p className="cd-desc">{course.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container cd-body">
        {allProfs.length > 0 && (
          <div className="cd-block">
            <h2 className="cd-block-title">Visiting Professor{allProfs.length > 1 ? "s" : ""}</h2>
            <div className="cd-prof-grid">
              {allProfs.map((p) => (
                <div className="cd-prof-card" key={p.name}>
                  <div className="cd-prof-img">
                    {p.img ? <img src={p.img} alt={p.name} loading="lazy" /> : <span className="cd-prof-init">{initials(p.name)}</span>}
                  </div>
                  <div>
                    <p className="cd-prof-name">{p.name}</p>
                    <p className="cd-prof-uni">{p.uni}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Class schedule — tabbed by prodi */}
        <div className="cd-block">
          <h2 className="cd-block-title">Class Schedule</h2>

          {multiProdi && (
            <>
              <div className="cd-tabs" role="tablist">
                {course.prodi.map((p, i) => (
                  <button key={p.name} role="tab" aria-selected={activeProdi === i}
                    className={`cd-tab ${activeProdi === i ? "active" : ""}`} onClick={() => setActiveProdi(i)}>
                    {p.name}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="cd-prodi-head">
            <span className="cd-prodi-tag">Prodi</span>
            <span className="cd-prodi-name">{pr.name}</span>
            <span className="cd-prodi-code">{pr.code}</span>
          </div>

          <div className="cd-co-cards">
            {pr.coLecturers.map((c) => (
              <div className="cd-co-item" key={c}>
                <span className="cd-co-av">{initials(c)}</span>
                <span className="cd-co-name">{c}</span>
              </div>
            ))}
          </div>

          <div className="cd-week-block">
            <h3 className="cd-week-title">
              Week 1 <span className="cd-week-range">6 – 10 Jul 2026</span>
              <button type="button" className="cd-full-sched-btn" onClick={() => setShowFullSchedule(true)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
                View Full Schedule
              </button>
            </h3>
            <div className="cd-table-wrap">
              <table className="cd-table">
                <thead>
                  <tr><th>Date</th><th>Time (WIB)</th><th>Location</th><th>Lecturer</th></tr>
                </thead>
                <tbody>
                  {weeklyRows.week1.map((r, i) => (
                    <tr key={i}>
                      <td>{r.date}</td>
                      <td className="cd-td-time">{r.time}</td>
                      <td className="cd-td-loc">{r.location}</td>
                      <td className={r.isProf ? "cd-td-prof" : "cd-td-co"}>{r.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cd-week-block">
            <h3 className="cd-week-title">Week 2 <span className="cd-week-range">13 – 17 Jul 2026</span></h3>
            <div className="cd-table-wrap">
              <table className="cd-table">
                <thead>
                  <tr><th>Date</th><th>Time (WIB)</th><th>Location</th><th>Lecturer</th></tr>
                </thead>
                <tbody>
                  {weeklyRows.week2.map((r, i) => (
                    <tr key={i}>
                      <td>{r.date}</td>
                      <td className="cd-td-time">{r.time}</td>
                      <td className="cd-td-loc">{r.location}</td>
                      <td className={r.isProf ? "cd-td-prof" : "cd-td-co"}>{r.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Link to="/#courses" className="btn-outline cd-bottom-back">← Back to all courses</Link>
      </div>

      {showFullSchedule && (
        <div className="cd-modal-overlay" onClick={() => setShowFullSchedule(false)}>
          <div className="cd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cd-modal-head">
              <p className="cd-modal-title">Full Schedule</p>
              <div className="cd-modal-actions">
                <a href={FULL_SCHEDULE_EMBED_URL} target="_blank" rel="noopener noreferrer" className="cd-modal-open-link">
                  Open in new tab ↗
                </a>
                <button type="button" className="cd-modal-close" onClick={() => setShowFullSchedule(false)} aria-label="Close">✕</button>
              </div>
            </div>
            <div className="cd-modal-body">
              <iframe
                src={FULL_SCHEDULE_EMBED_URL}
                title="Full GLOW 2026 Schedule"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                className="cd-modal-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
