const releaseNote = {
  nodes: [{
    name: 'div',
    children: [{
      name: 'h4',
      attrs: {
        style: 'text-align: center;'
      },
      children: [{
        type: 'text',
        text: '更新日志'
      }]
    },
    {
      name: 'div',
      children: [{
        type: 'text',
        text: 'v1.2'
      },
      {
        name: 'ul',
        children: [
          {
            name: 'li',
            attrs: {
              style: 'font-size: 12px;'
            },
            children: [
              {
                type: 'text',
                text: '界面优化'
              }
            ]
          },
          {
            name: 'li',
            attrs: {
              style: 'font-size: 12px;'
            },
            children: [
              {
                type: 'text',
                text: '修复一些bug'
              }
            ]
          }
        ]
      }]
    },
    {
      name: 'div',
      children: [{
        type: 'text',
        text: 'v1.1'
      },
      {
        name: 'ul',
        children: [
          {
            name: 'li',
            attrs: {
              style: 'font-size: 12px;'
            },
            children: [
              {
                type: 'text',
                text: '增加更新日志'
              }
            ]
          },
          {
            name: 'li',
            attrs: {
              style: 'font-size: 12px;'
            },
            children: [
              {
                type: 'text',
                text: '增加使用帮助'
              }
            ]
          },
          {
            name: 'li',
            attrs: {
              style: 'font-size: 12px;'
            },
            children: [
              {
                type: 'text',
                text: '增加意见反馈'
              }
            ]
          },
          {
            name: 'li',
            attrs: {
              style: 'font-size: 12px;'
            },
            children: [
              {
                type: 'text',
                text: '增加复制到系统剪切板功能'
              }
            ]
          },
        ]
      }]
    },
    {
      name: 'div',
      children: [{
        type: 'text',
        text: 'v1.0'
      },
      {
        name: 'ul',
        children: [
          {
            name: 'li',
            attrs: {
              style: 'font-size: 12px;'
            },
            children: [
              {
                type: 'text',
                text: '支持创建剪切板及查询功能。'
              }
            ]
          }
        ]
      }]
    }
    ]
  }]
}

module.exports = releaseNote;