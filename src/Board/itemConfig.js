export const items = [
  {
    type: 'shape',
    id: 'A',
    dim: {
      w: 50,
      h: 50,
    },
    pos: {
      x: 100,
      y: 300,
    },
    text: {
      data: 'A',
      bold: false,
    },
  },
  {
    type: 'shape',
    id: 'B',
    dim: {
      w: 50,
      h: 50,
    },
    pos: {
      x: 300,
      y: 200,
    },
    text: {
      data: 'B',
      bold: true,
    },
  },
  {
    type: 'shape',
    id: 'C',
    dim: {
      w: 50,
      h: 50,
    },
    pos: {
      x: 500,
      y: 100,
    },
    text: {
      data: 'C',
      bold: false,
    },
  },
  {
    type: 'shape',
    id: 'D',
    dim: {
      w: 50,
      h: 50,
    },
    pos: {
      x: 500,
      y: 300,
    },
    text: {
      data: 'D',
      bold: false,
    },
  },
  {
    type: 'shape',
    id: 'E',
    dim: {
      w: 50,
      h: 50,
    },
    pos: {
      x: 200,
      y: 50,
    },
    text: {
      data: 'E',
      bold: false,
    },
  },
  {
    type: 'smart-bezier',
    ID: 'F',
    from: {
      id: 'A',
    },
    to: {
      id: 'B',
    },
  },
  {
    type: 'smart-bezier',
    ID: 'G',
    from: {
      id: 'B',
    },
    to: {
      id: 'C',
    },
  },
  {
    type: 'smart-bezier',
    ID: 'H',
    from: {
      id: 'B',
    },
    to: {
      id: 'D',
    },
  },
  {
    type: 'smart-bezier',
    ID: 'I',
    from: {
      id: 'D',
    },
    to: {
      id: 'C',
    },
  },
  {
    type: 'smart-bezier',
    ID: 'J',
    from: {
      id: 'B',
    },
    to: {
      id: 'E',
    },
  },
];
