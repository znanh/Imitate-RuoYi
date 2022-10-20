/**
 * 检查一个元素是否有这个类
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }
  
  /**
   * 添加类到元素上
   * @param {HTMLElement} elm
   * @param {string} cls
   */
  export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
  }
  
  /**
   * 从元素上删除类
   * @param {HTMLElement} elm
   * @param {string} cls
   */
  export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      ele.className = ele.className.replace(reg, ' ')
    }
  }