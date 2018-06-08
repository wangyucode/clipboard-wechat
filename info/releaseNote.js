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
          text: 'v2.0'
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
                  text: '根据反馈意见，从2.0开始，进入小程序，即可查看属于自己的剪切板，小程序端只提供保存功能，更加简洁易用。'
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
                  text: '老版数据将在2018年9月1日删除，请在Web端查询并备份。'
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
                  text: '新增系统剪切板检测功能，可以快速粘贴系统剪切板内容。'
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
                  text: '新增自动保存功能，5秒内没有输入将自动保存。'
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