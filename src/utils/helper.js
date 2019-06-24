
const OSS = 'https://res.shiguangkey.com/';

const canUseWebp = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('chrome/') > -1 && ua.indexOf('edge/') === -1;
};
// 获取图片的全地址
export function getFullImgPath(path = '') {
  const prefix = path.includes('/udb/user/') ? STATIC : OSS;
  if (/^https?:\/\//.test(path)) return path;
  return prefix + path;
}
const IMAGE_COMPRESS = `?x-oss-process=image/quality,Q_50/format,${canUseWebp() ? 'webp' : 'jpg'}`;
const IMAGE_NOCOMPRESS = `?x-oss-process=image/format,${canUseWebp() ? 'webp' : 'jpg'}`;

/**
 * 增加图片地址前后缀
 * 使用阿里云oss技术压缩图片
 * @param {string} url 图片地址
 */
export function imgCompress(url, isCompress = true) {
  if (!url) return '';
  const path = getFullImgPath(url);
  const pattern = /^https?:\/\/res[^.]*\.shiguangkey\.com/; // new RegExp(`^${OSS}`);
  if (!pattern.test(path) || path.includes('?x-oss-process') || /\.gif$/i.test(path)) return path;
  return path + (isCompress ? IMAGE_COMPRESS : IMAGE_NOCOMPRESS);
}

/**
 * 节流：给定时间内只执行第一次
 * @param {function} func 实际执行函数
 * @param {number} time 执行频率
 */
export function throttle(func, time) {
  let last = 0;
  return function(...args) {
    const now = +new Date();
    if (now - last < time) return;
    last = now;
    return func.apply(this, args);
  };
}

/**
 * 防反跳：给定时间后执行函数，时间段内再次触发会顺延时间
 * @param {function} func 实际执行函数
 * @param {number} time 执行频率
 */
export function debounce(func, time) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, time);
  };
}

// 生成UUID
function S4() {
  const base = 0x10000;
  const system = 16;
  return parseInt((1 + Math.random()) * base)
    .toString(system)
    .substring(1);
}
export function createUid() {
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

// 转义图片
export function convertHTML(string = '') {
  let newText;
  newText = string.replace(/&lt;/g, '<');
  newText = newText.replace(/&gt;/g, '/>');
  return newText;
}

/**
 * 处理html字符串里面的img标签，增加最大宽度
 * @param {string} str 要处理的html字符串
 */
export function richTextParseImg(str = '', isCompress = true) {
  return str.replace(/<img[^>]*src="([^"?!]+)(!\w+)?(\?.*)?"[^>]*>/g, (whole, src) => {
    const newSrc = imgCompress(src, isCompress);
    return `<img src="${newSrc}" data-rich-url="${src}" style="max-width: 100%">`;
  });
}

// 字符串替换
export function escapeHtml(str = '') {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
    .replace(/\s/g, '&nbsp;');
}

// 用户密码摘要混淆
export function toMd5Base64(passwd) {
  const lastIndex = -2;
  const res = crypto
    .createHash('md5')
    .update(passwd)
    .digest('base64');
  return res.slice(0, lastIndex);
}

// 判断用户是否是在pc端打开页面
export function isOpenInPc() {
  return !/(Android|iPhone|iPad|iPod|iOS|BlackBerry|webOs)/i.test(navigator.userAgent);
}

// 百度统计
export function baiduStatistic(...args) {
  if (!isMp) {
    // eslint-disable-next-line
    const _hmt = window._hmt;
    _hmt.push([...args]);
  }
}
