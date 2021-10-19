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
      style: {
        bold: false,
        fontSize: '16px',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
      },
    },
    style: {
      backgroundColor: '#fef72f',
      borderColor: '#27262b',
    },
  },
  {
    type: 'shape',
    id: 'Z',
    dim: {
      w: 150,
      h: 50,
    },
    pos: {
      x: 575,
      y: 475,
    },
    text: {
      data: 'HTML',
      style: {
        bold: false,
        fontSize: '16px',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
      },
    },
    style: {
      backgroundColor: '#fef72f',
      borderColor: '#27262b',
    },
  },
  {
    type: 'smart-connection',
    form: 'linear',
    id: '0',
    from: {
      id: 'A',
    },
    to: {
      id: 'Z',
    },
    className: 'main',
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
      style: {
        bold: false,
        fontSize: '16px',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
    },
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
      style: {
        bold: false,
        fontSize: '16px',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
    },
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
      style: {
        bold: false,
        fontSize: '16px',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
    },
  },
  {
    type: 'smart-connection',
    form: 'linear',
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
    type: 'smart-connection',
    form: 'linear',
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
    type: 'smart-connection',
    form: 'linear',
    id: 'G',
    from: {
      id: 'A',
    },
    to: {
      id: 'D',
    },
    className: 'main',
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
      style: {
        bold: false,
        fontSize: '16px',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
    },
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
      style: {
        bold: false,
        fontSize: '16px',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
    },
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
      style: {
        bold: false,
        fontSize: '16px',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
    },
  },
  {
    type: 'smart-connection',
    form: 'bezier',
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
    type: 'smart-connection',
    form: 'bezier',
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
    type: 'smart-connection',
    form: 'bezier',
    id: '3',
    from: {
      id: 'A',
    },
    to: {
      id: 'J',
    },
    className: 'main',
  },
];
