export const items = [
  {
    type: 'shape',
    id: 'A',
    dim: {
      w: 150,
      h: 50,
    },
    pos: {
      x: 325,
      y: 175,
    },
    text: {
      data: 'Internet',
      bold: true,
    },
    className: 'main',
  },
  {
    type: 'shape',
    id: 'B',
    dim: {
      w: 175,
      h: 50,
    },
    pos: {
      x: 75,
      y: 100,
    },
    text: {
      data: 'How does the Internet work?',
      bold: false,
    },
    className: 'sub',
  },
  {
    type: 'shape',
    id: 'C',
    dim: {
      w: 175,
      h: 50,
    },
    pos: {
      x: 75,
      y: 175,
    },
    text: {
      data: 'What is HTTP?',
      bold: false,
    },
    className: 'sub',
  },
  {
    type: 'shape',
    id: 'D',
    dim: {
      w: 175,
      h: 50,
    },
    pos: {
      x: 75,
      y: 250,
    },
    text: {
      data: 'Browsers and how they work?',
      bold: false,
    },
    className: 'sub',
  },
  {
    type: 'smart-bezier',
    ID: 'E',
    from: {
      id: 'A',
    },
    to: {
      id: 'B',
    },
  },
  {
    type: 'smart-bezier',
    ID: 'F',
    from: {
      id: 'A',
    },
    to: {
      id: 'C',
    },
  },
  {
    type: 'smart-bezier',
    ID: 'G',
    from: {
      id: 'A',
    },
    to: {
      id: 'D',
    },
  },
  {
    type: 'shape',
    id: 'H',
    dim: {
      w: 175,
      h: 50,
    },
    pos: {
      x: 550,
      y: 100,
    },
    text: {
      data: 'DNS and how it works?',
      bold: false,
    },
    className: 'sub',
  },
  {
    type: 'shape',
    id: 'I',
    dim: {
      w: 175,
      h: 50,
    },
    pos: {
      x: 550,
      y: 175,
    },
    text: {
      data: 'What is Domain Name?',
      bold: false,
    },
    className: 'sub',
  },
  {
    type: 'shape',
    id: 'J',
    dim: {
      w: 175,
      h: 50,
    },
    pos: {
      x: 550,
      y: 250,
    },
    text: {
      data: 'What is hosting?',
      bold: false,
    },
    className: 'sub',
  },
  {
    type: 'smart-bezier',
    ID: 'G',
    from: {
      id: 'A',
    },
    to: {
      id: 'H',
    },
  },
  {
    type: 'smart-bezier',
    ID: 'G',
    from: {
      id: 'A',
    },
    to: {
      id: 'I',
    },
  },
  {
    type: 'smart-bezier',
    ID: 'G',
    from: {
      id: 'A',
    },
    to: {
      id: 'J',
    },
  },
];
