/* eslint-disable react/jsx-key */

// EXACTLY TWO ENTRIES. process/Other.jsx hardcodes two colours.
// `smallTitle` renders as 3D text on a sphere — one short word.
const containt = [
  {
    smallTitle: 'Process',
    bigTitle: 'How You Work',
    desc: [
      <div className="p-l">
        Walk through your process. This section suits an ordered sequence: the
      </div>,
      <div className="p-l">
        steps someone would go through if they hired you.
      </div>,
    ],
    descMobile: [
      <div className="p-l">Walk through your process, step by step.</div>,
    ],
    options: [
      {
        title: 'Step One',
        desc: 'What happens first, and what you need from them',
      },
      { title: 'Step Two', desc: 'The next step, in the same voice' },
      { title: 'Step Three', desc: 'Keep each description to a single line' },
      { title: 'Step Four', desc: 'Six to twelve steps works well' },
      {
        title: 'Step Five',
        desc: 'Fewer feels thin, more feels like a manual',
      },
      { title: 'Step Six', desc: 'End with what they walk away with' },
    ],
  },
  {
    smallTitle: 'Values',
    bigTitle: 'What You Believe',
    desc: [
      <div className="p-l">
        The second block. Principles, working style, or the rules you hold to.
      </div>,
      <div className="p-l">
        Anything that helps someone decide whether they want to work with you.
      </div>,
    ],
    descMobile: [
      <div className="p-l">
        Principles, working style, or the rules you hold to.
      </div>,
    ],
    options: [
      {
        title: 'Principle One',
        desc: 'State it plainly, then say why it matters',
      },
      { title: 'Principle Two', desc: 'These are opinions, so have some' },
      { title: 'Principle Three', desc: 'Vague principles read as filler' },
      { title: 'Principle Four', desc: 'Specific ones are memorable' },
      {
        title: 'Principle Five',
        desc: 'Close with the one you would not compromise on',
      },
    ],
  },
];
export default containt;
