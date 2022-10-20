<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  /* render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(h('i',{
          'class':[icon,'sub-el-icon']
        }))
      } else {
        vnodes.push(h('svg-icon',{
          props:{
            iconClass:icon
          }
        }))
      }
    }

    if (title) {
      vnodes.push(h('span',{
        slot:'title'
      },[title]))
    }
    return vnodes

  }, */
  render(h, context) {
    const vnodes = []
    const { icon, title } = context.props
    if (icon) {
      let elHtml
      if (icon.includes('el-icon')) {
         elHtml = h('i', {
          'class': [icon,'sub-el-icon']//有动态类名,不可以写在attrs里面的class里面
        })
      }else {
        elHtml = h('svg-icon',{
          props:{
            iconClass:icon
          }
        })
      }
      vnodes.push(elHtml)
    }
 
    if (title) {
      const elHtml = h('span', {
          slot: 'title'
      }, title)
      vnodes.push(elHtml)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
