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
  },
  {
    type: 'smart-connection',
    ID: 'E',
    from: {
      id: 'A',
    },
    to: {
      id: 'B',
    },
  },
  {
    type: 'smart-connection',
    ID: 'F',
    from: {
      id: 'B',
    },
    to: {
      id: 'C',
    },
  },
  {
    type: 'smart-connection',
    ID: 'G',
    from: {
      id: 'B',
    },
    to: {
      id: 'D',
    },
  },
  {
    type: 'smart-connection',
    ID: 'H',
    from: {
      id: 'D',
    },
    to: {
      id: 'C',
    },
  },
];
