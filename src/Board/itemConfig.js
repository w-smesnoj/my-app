export const items = [
  {
    type: 'shape',
    id: 'A',
    dim: {
      w: 150,
      h: 50,
    },
    pos: {
      x: 475,
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
    id: 'Z',
    dim: {
      w: 150,
      h: 50,
    },
    pos: {
      x: 475,
      y: 375,
    },
    text: {
      data: 'HTML',
      bold: true,
    },
    className: 'main',
  },
  {
    type: 'smart-bezier',
    id: '0',
    from: {
      id: 'A',
    },
    to: {
      id: 'Z',
    },
  },
  {
    type: 'shape',
    id: 'B',
    dim: {
      w: 250,
      h: 50,
    },
    pos: {
      x: 100,
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
      w: 250,
      h: 50,
    },
    pos: {
      x: 100,
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
      w: 250,
      h: 50,
    },
    pos: {
      x: 100,
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
    id: 'E',
    from: {
      id: 'A',
    },
    to: {
      id: 'B',
    },
    className: 'sub',
  },
  {
    type: 'smart-bezier',
    id: 'F',
    from: {
      id: 'A',
    },
    to: {
      id: 'C',
    },
    className: 'sub',
  },
  {
    type: 'smart-bezier',
    id: 'G',
    from: {
      id: 'A',
    },
    to: {
      id: 'D',
    },
    className: 'sub',
  },
  {
    type: 'shape',
    id: 'H',
    dim: {
      w: 250,
      h: 50,
    },
    pos: {
      x: 750,
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
      w: 250,
      h: 50,
    },
    pos: {
      x: 750,
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
      w: 250,
      h: 50,
    },
    pos: {
      x: 750,
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
    id: '1',
    from: {
      id: 'A',
    },
    to: {
      id: 'H',
    },
    className: 'sub',
  },
  {
    type: 'smart-bezier',
    id: '2',
    from: {
      id: 'A',
    },
    to: {
      id: 'I',
    },
    className: 'sub',
  },
  {
    type: 'smart-bezier',
    id: '3',
    from: {
      id: 'A',
    },
    to: {
      id: 'J',
    },
    className: 'sub',
  },
];
