export const items = [
  {
    type: 'shape',
    ID: 0,
    dim: {
      w: 100,
      h: 100,
    },
    pos: {
      x: 100,
      y: 100,
    },
  },
  {
    type: 'shape',
    ID: 1,
    dim: {
      w: 100,
      h: 100,
    },
    pos: {
      x: 400,
      y: 200,
    },
  },
  {
    type: 'connection',
    ID: 2,
    path: {
      from: {
        pos: {
          x: 200,
          y: 150,
        },
      },
      to: {
        pos: {
          x: 400,
          y: 250,
        },
      },
    },
    style: {
      stroke: 'black',
      strokeWidth: '2',
    },
  },
];
