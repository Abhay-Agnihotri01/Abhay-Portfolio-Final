/* eslint-disable react/jsx-key */
// EXACTLY THREE ENTRIES. services/Other.jsx hardcodes three colours and an
// `index === 2` branch, so adding or removing one breaks the scroll animation.
// `smallTitle` is rendered as 3D text on a sphere — keep it to one short word.
const containt = [
  {
    smallTitle: 'Data',
    bigTitle: 'Data & AI',
    desc: [
      <div className="p-l">
        I turn raw data into meaningful insights by exploring
      </div>,
      <div className="p-l">
        patterns, relationships, and trends hidden within it,
      </div>,
      <div className="p-l">asking the questions that matter.</div>,
    ],
    descMobile: [
      <div className="p-l">I turn raw data into meaningful insights by</div>,
      <div className="p-l">exploring patterns, trends, and relationships.</div>,
    ],
    options: [
      {
        title: 'Exploratory Analysis',
        desc: 'Finding patterns, trends, and anomalies within data',
      },
      {
        title: 'Data Cleaning',
        desc: 'Transforming messy data into something reliable and useful',
      },
      {
        title: 'Statistical Analysis',
        desc: 'Using statistics to understand what the data is telling us',
      },
      {
        title: 'Feature Engineering',
        desc: 'Creating meaningful features that help reveal better patterns',
      },
      {
        title: 'Python & SQL',
        desc: 'Working with data through practical analytical tools',
      },
    ],
  },
  {
    smallTitle: 'Model',
    bigTitle: 'Machine Learning',
    desc: [
      <div className="p-l">
        I explore how machine learning can turn data into
      </div>,
      <div className="p-l">
        predictions and intelligent solutions, from building
      </div>,
      <div className="p-l">
        models to understanding how they actually perform.
      </div>,
    ],
    descMobile: [
      <div className="p-l">I explore how machine learning can turn data</div>,
      <div className="p-l">into predictions and intelligent solutions.</div>,
    ],
    options: [
      {
        title: 'Predictive Modeling',
        desc: 'Using historical data to make meaningful predictions',
      },
      {
        title: 'Machine Learning',
        desc: 'Building and evaluating models for real-world problems',
      },
      {
        title: 'Model Evaluation',
        desc: 'Understanding whether a model actually works',
      },
      {
        title: 'Deep Learning',
        desc: 'Exploring neural networks and complex data problems',
      },
    ],
  },
  {
    smallTitle: 'Explain',
    bigTitle: 'Data Storytelling',
    desc: [
      <div className="p-l">
        Good analysis is only valuable when people can understand it.
      </div>,
      <div className="p-l">
        I focus on turning complex findings into clear stories
      </div>,
      <div className="p-l">that make data easier to explore and act upon.</div>,
    ],
    descMobile: [
      <div className="p-l">Good analysis is only valuable when people</div>,
      <div className="p-l">can understand it and act on it.</div>,
    ],
    options: [
      {
        title: 'Data Visualization',
        desc: 'Making patterns and insights easier to see',
      },
      {
        title: 'Dashboards',
        desc: 'Creating interactive views of important information',
      },
      {
        title: 'Data Storytelling',
        desc: 'Turning analytical findings into a clear narrative',
      },
      {
        title: 'Communication',
        desc: 'Explaining technical results in a simple way',
      },
    ],
  },
];

export default containt;
