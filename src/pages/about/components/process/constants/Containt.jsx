/* eslint-disable react/jsx-key */

// EXACTLY TWO ENTRIES. process/Other.jsx hardcodes two colours.
// `smallTitle` renders as 3D text on a sphere — one short word.
const containt = [
  {
    smallTitle: 'Process',
    bigTitle: 'How I Work',
    desc: [
      <div className="p-l">
        A structured, transparent engineering process from problem
      </div>,
      <div className="p-l">
        formulation to production deployment and monitoring.
      </div>,
    ],
    descMobile: [
      <div className="p-l">
        A structured engineering process from concept to deployment.
      </div>,
    ],
    options: [
      {
        title: 'Discovery & Requirement Analysis',
        desc: 'Deep dive into objectives, dataset feasibility, and system requirements',
      },
      {
        title: 'Architecture & System Modeling',
        desc: 'Designing scalable data/ML pipelines, API schemas, and full-stack structure',
      },
      {
        title: 'Iterative Prototyping',
        desc: 'Agile development with functional prototypes and continuous feedback loops',
      },
      {
        title: 'Validation & Benchmarking',
        desc: 'Rigorous testing, model accuracy tuning, and performance optimization',
      },
      {
        title: 'Deployment & Monitoring',
        desc: 'Production release with logging, analytics, and clean documentation',
      },
    ],
  },
  {
    smallTitle: 'Values',
    bigTitle: 'What I Value',
    desc: [
      <div className="p-l">
        Core engineering principles and working standards that guide
      </div>,
      <div className="p-l">
        every model I train and line of code I write.
      </div>,
    ],
    descMobile: [
      <div className="p-l">
        Core principles guiding every model and line of code I write.
      </div>,
    ],
    options: [
      {
        title: 'Curiosity-Driven Rigor',
        desc: 'Relentlessly exploring optimal solutions across data and architecture',
      },
      {
        title: 'Clean Architecture',
        desc: 'Writing maintainable, modular, and self-documenting code',
      },
      {
        title: 'User-Centric AI',
        desc: 'Building intuitive interfaces that turn complex AI insights into clear user experiences',
      },
      {
        title: 'Continuous Evolution',
        desc: 'Constantly learning emerging tech across AI, ML, and modern web development',
      },
    ],
  },
];
export default containt;
