import {
  fabric
} from 'fabric';
import jrQrcode from 'jr-qrcode';

const GD = require('./gradient.js');

const loadImageUrl = async (imgUrl) => {
  return new Promise(resolve => {
    fabric.Image.fromURL(imgUrl, function (oImg) {
      resolve(oImg);
    });
  });
}

/**
 * 添加文字对象
 * @param {*} css 
 */
export const addTextObject = async css => {
  let {
    width,
    text,
    color,
    fontSize,
    left,
    top,
    fontWeight,
    fontFamily,
    padding,
    textDecoration,
    borderRadius,
    borderWidth,
    borderColor,
    rotate,
    //align,
    shadow,
    lineHeight,
    textAlign,
    maxLines,
    textStyle,
    background
  } = css;
  width = width / 1;
  left = left / 1;
  top = top / 1;
  borderRadius = borderRadius / 1;
  borderWidth = borderWidth / 1;
  rotate = rotate / 1;
  fontSize = fontSize / 1;
  maxLines = maxLines / 1;
  padding = 0 /*  padding / 1 */;
  lineHeight = lineHeight / 1; //和painter调试得出的值
  shadow = shadow
    .trim()
    .split(/\s+/)
    .join(' ');
  let Shape;
  let config = {
    width, //文字的高度随行高
    fill: color,
    fontWeight,
    left: 0, //距离画布左侧的距离，单位是像素
    top: 0,
    fontSize, //文字大小
    fontFamily,
    padding,
    [textDecoration]: true,
    textAlign,
    textStyle,
    shadow,
    myshadow: shadow,
    splitByGrapheme: true, //文字换行
    lineHeight,
    editable: true,
    maxLines: maxLines,
    textDecoration: textDecoration,
    lockScalingY: true,
    originX: 'center',
    originY: 'center'
  };
  if (textStyle === 'stroke') {
    config = {
      ...config,
      stroke: color,
      fill: 'rgba(0,0,0)'
    };
  }
  let textBox = new fabric.Textbox(text, config);
  textBox.toObject = (function (toObject) {
    return function () {
      return fabric.util.object.extend(toObject.call(this), {
        maxLines,
        textDecoration,
        textStyle
      });
    };
  })(textBox.toObject);
  //通过最大行高计算高度,并删除多余文字,多出文字..表示,三个会换行
  if (textBox.textLines.length > maxLines) {
    let text = '';
    for (let index = 0; index < maxLines; index++) {
      const element = textBox.textLines[index];
      if (index === maxLines - 1) {
        text = text + element + '...';
      } else {
        text += element;
      }
    }
    textBox.set({
      text
    });
    if (textBox.textLines.length > maxLines) {
      let text = '';
      for (let index = 0; index < maxLines; index++) {
        const element = textBox.textLines[index];
        if (index === maxLines - 1) {
          text = text + element.substring(0, element.length - 3) + '...';
        } else {
          text += element;
        }
      }
      textBox.set({
        text
      });
    }
  }
  let height = textBox.height / 1 + (textBox.lineHeight / 1 - 1) * textBox.fontSize + padding * 2;
  left = css.left - padding + borderWidth;
  top = css.top - padding + borderWidth;
  textBox.set({
    top: -((textBox.lineHeight / 1 - 1) * textBox.fontSize) / 2
  });

  let Rect = new fabric.Rect({
    width: width + borderWidth,
    height: height + borderWidth,
    left: 0, //距离画布左侧的距离，单位是像素
    top: 0,
    originX: 'center',
    originY: 'center',
    //padding,
    rx: borderRadius,
    strokeWidth: borderWidth / 1,
    stroke: borderColor,
    fill: background,
    shadow,
    selectable: false
  });
  //this.canvas_sprite.add(Rect);
  let gradientOption = '';
  if (GD.api.isGradient(background)) {
    gradientOption = GD.api.doGradient(background, width, height);
  }
  if (gradientOption) Rect.setGradient('fill', gradientOption);
  Shape = new fabric.Group([], {
    width: width + borderWidth,
    height: height + borderWidth,
    left: left + width / 2, //距离画布左侧的距离，单位是像素
    top: top + height / 2,
    angle: rotate,
    mytype: 'textGroup',
    oldText: text,
    originX: 'center',
    originY: 'center',
    rx: borderRadius,
    strokeWidth: borderWidth / 1,
    stroke: borderColor,
    fill: background,
    shadow,
    myshadow: shadow,
    lockScalingY: true
  });
  Shape.add(Rect);
  Shape.add(textBox);

  Shape.toObject = (function (toObject) {
    return function () {
      return fabric.util.object.extend(toObject.call(this), {
        mytype: 'textGroup',
        oldText: text,
        rx: borderRadius,
        myshadow: shadow
      });
    };
  })(Shape.toObject);
  return Shape;
}

/**
 * 添加矩形对象
 * @param {*} css 
 */
export const addRectObject = async css => {
  let {
    width,
    height,
    left,
    top,
    borderRadius,
    borderWidth,
    borderColor,
    background,
    rotate,
    //align,
    shadow
  } = css;
  width = width / 1;
  height = height / 1;
  left = left / 1;
  top = top / 1;
  borderRadius = borderRadius / 1;
  borderWidth = borderWidth / 1;
  rotate = rotate / 1;
  shadow = shadow
    .trim()
    .split(/\s+/)
    .join(' ');
  let group = new fabric.Group([], {
    left: left + width / 2 + borderWidth,
    top: top + height / 2 + borderWidth,
    width: width + borderWidth,
    height: height + borderWidth,
    rx: borderRadius / 1,
    strokeWidth: borderWidth / 1,
    stroke: borderColor,
    fill: background,
    originX: 'center',
    originY: 'center',
    angle: rotate,
    myshadow: shadow,
    mytype: 'rect',
    lockUniScaling: true //只能等比缩放
  });
  let gradientOption = '';
  if (GD.api.isGradient(background)) {
    gradientOption = GD.api.doGradient(background, width, height);
  }
  let rect = new fabric.Rect({
    width,
    height,
    left: 0,
    top: 0,
    rx: borderRadius,
    fill: background,
    originX: 'center',
    originY: 'center'
  });
  if (gradientOption) rect.setGradient('fill', gradientOption);
  group.add(rect);
  //添加边框
  group.add(
    new fabric.Rect({
      width: width + borderWidth,
      height: height + borderWidth,
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
      //padding,
      rx: borderRadius + borderWidth / 2,
      strokeWidth: borderWidth / 1,
      stroke: borderColor,
      fill: 'rgba(0,0,0,0)',
      shadow,
      selectable: false
    })
  );
  group.toObject = (function (toObject) {
    return function () {
      return fabric.util.object.extend(toObject.call(this), {
        mytype: 'rect',
        rx: borderRadius + borderWidth / 2,
        myshadow: shadow
      });
    };
  })(group.toObject);
  return group;
}

/**
 * 添加图片对象
 * @param {*} css 
 */
export const addImageObject = async css => {
  let {
    width,
    height,
    left,
    top,
    borderRadius,
    borderWidth,
    borderColor,
    background,
    rotate,
    //align,
    shadow,
    mode,
    url
  } = css;
  width = width / 1;
  height = height / 1;
  left = left / 1;
  top = top / 1;
  borderRadius = borderRadius / 1;
  borderWidth = borderWidth / 1;
  rotate = rotate / 1;
  shadow = shadow
    .trim()
    .split(/\s+/)
    .join(' ');
  let Shape = await loadImageUrl(url);
  let imgWidth = Shape.width;
  let imgHeight = Shape.height;
  Shape.set({
    url,
    //align,
    mode,
    shadow,
    originX: 'center',
    originY: 'center'
  });
  if (mode === 'scaleToFill') {
    Shape.set({
      width: imgWidth,
      height: imgHeight,
      scaleX: width / imgWidth,
      scaleY: height / imgHeight,
      oldScaleX: width / imgWidth,
      oldScaleY: height / imgHeight
    });
    Shape.clipPath = new fabric.Rect({
      width,
      height,
      originX: 'center',
      originY: 'center',
      rx: borderRadius,
      scaleX: imgWidth / width,
      scaleY: imgHeight / height
    });
  } else if (mode === 'auto') {
    //忽略高度会自适应宽度,等比缩放图片
    Shape.set({
      width: imgWidth,
      height: imgHeight,
      scaleX: width / imgWidth,
      scaleY: width / imgWidth,
      oldScaleX: width / imgWidth,
      oldScaleY: height / imgHeight
    });
    Shape.clipPath = new fabric.Rect({
      width,
      height,
      originX: 'center',
      originY: 'center',
      rx: borderRadius,
      scaleX: imgWidth / width,
      scaleY: imgHeight / height
    });
  } else if (mode === 'aspectFill') {
    Shape.clipPath = new fabric.Rect({
      width: width / 1,
      height: height / 1,
      originX: 'center',
      originY: 'center',
      rx: borderRadius / 1
    });
    Shape.set({
      width,
      height
    });
  }
  let group = new fabric.Group([Shape], {
    left: left + width / 2 + borderWidth,
    top: top + height / 2 + borderWidth,
    width: width + borderWidth,
    height: height + borderWidth,
    rx: borderRadius / 1,
    strokeWidth: borderWidth / 1,
    stroke: borderColor,
    fill: background,
    angle: rotate,
    shadow,
    myshadow: shadow,
    originX: 'center',
    originY: 'center',
    mytype: 'image',
    mode,
    url,
    lockUniScaling: true //只能等比缩放
  });
  //添加边框
  group.add(
    new fabric.Rect({
      width: width + borderWidth,
      height: height + borderWidth,
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
      //padding,
      rx: borderRadius + borderWidth / 2,
      strokeWidth: borderWidth / 1,
      stroke: borderColor,
      fill: 'rgba(0,0,0,0)',
      shadow,
      selectable: false
    })
  );
  group.toObject = (function (toObject) {
    return function () {
      return fabric.util.object.extend(toObject.call(this), {
        mytype: 'image',
        mode,
        url,
        rx: borderRadius + borderWidth / 2,
        oldScaleX: width / imgWidth,
        oldScaleY: height / imgHeight,
        myshadow: shadow
      });
    };
  })(group.toObject);
  //console.log('group', group);
  return group;
}

let QRErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};

/**
 * 添加二维码对象
 * @param {*} css 
 */
export const addQrcodeObject = async css => {
  let {
    width,
    left,
    top,
    color,
    borderRadius,
    //borderWidth,
    //borderColor,
    background,
    rotate,
    url
    //align,
  } = css;
  width = width / 1;
  left = left / 1 + width / 2;
  top = top / 1 + width / 2;
  rotate = rotate / 1;
  let imgBase64 = jrQrcode.getQrBase64(url, {
    padding: 0, // 二维码四边空白（默认为10px）
    width: width / 1, // 二维码图片宽度（默认为256px）
    height: width / 1, // 二维码图片高度（默认为256px）
    correctLevel: QRErrorCorrectLevel.H, // 二维码容错level（默认为高）
    reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
    background: background, // 二维码背景颜色（默认白色）
    foreground: color // 二维码颜色（默认黑色）
  });
  let Shape = await loadImageUrl(imgBase64);
  Shape.set({
    url,
    width: width / 1,
    height: width / 1,
    left,
    top,
    color,
    background,
    rx: borderRadius / 1,
    //strokeWidth: borderWidth / 1,
    //stroke: borderColor,
    //align,
    angle: rotate / 1,
    lockUniScaling: true, //只能等比缩放
    originX: 'center',
    originY: 'center',
    mytype: 'qrcode'
  });
  Shape.clipPath = new fabric.Rect({
    width,
    height: width / 1,
    originX: 'center',
    originY: 'center',
    rx: borderRadius,
    angle: rotate / 1
  });
  Shape.toObject = (function (toObject) {
    return function () {
      return fabric.util.object.extend(toObject.call(this), {
        mytype: 'qrcode',
        url,
        color,
        background,
        rx: borderRadius / 1
      });
    };
  })(Shape.toObject);
  return Shape;
}

/**
 * 修改图形对象到值
 * @param {*} item2 
 */
export const changeObjectValue = (item2, type) => {
  let width = `${(item2.width - item2.strokeWidth) * item2.scaleX}`;
  let height = `${(item2.height - item2.strokeWidth) * item2.scaleY}`;
  /* let left = `${(item2.left / item2.scaleY - (item2.width - item2.strokeWidth) / 2 - item2.strokeWidth).toFixed(2)}`;
  let top = `${(item2.top / item2.scaleY - (item2.height - item2.strokeWidth) / 2 - item2.strokeWidth).toFixed(2)}`; */
  let left = `${(item2.left - width / 2).toFixed(2)}`;
  let top = `${(item2.top - height / 2).toFixed(2)}`;
  //console.log('item2.strokeWidth', `${item2.shadow}`, item2.scaleY);
  let css = {
    width,
    height,
    left,
    top,
    color: `${item2.color}`,
    background: `${item2.fill}`,
    rotate: `${item2.angle}`,
    borderRadius: `${item2.rx * item2.scaleY}`,
    borderWidth: `${item2.strokeWidth * item2.scaleY}`,
    borderColor: `${item2.stroke}`,
    shadow: `${item2.myshadow}`
  };
  let index = '';
  switch (type) {
    case 'textGroup':
      index = 1;
      item2._objects.forEach(ele => {
        let css2 = {
          text: '',
          width,
          maxLines: ``,
          lineHeight: '',
          left,
          top,
          color: `${item2.color}`,
          background: `${item2.fill}`,
          fontSize: '',
          fontWeight: '',
          textDecoration: '',
          rotate: `${item2.angle}`,
          //padding: 0,
          borderRadius: `${item2.rx * item2.scaleY}`,
          borderWidth: `${item2.strokeWidth * item2.scaleY}`,
          borderColor: `${item2.stroke}`,
          shadow: `${item2.shadow}`,
          textStyle: '',
          textAlign: '',
          fontFamily: ''
        };
        if (ele.type === 'rect') { } else {
          css = {
            ...css2,
            text: `${item2.oldText}`,
            maxLines: `${ele.maxLines}`,
            lineHeight: `${ele.lineHeight}`,
            color: ele.fill,
            //padding: `${ele.padding}`,
            fontSize: `${ele.fontSize}`,
            fontWeight: `${ele.fontWeight}`,
            textStyle: `${ele.textStyle}`,
            textDecoration: `${ele.textDecoration === 'linethrough' ? 'line-through' : ele.textDecoration}`,
            fontFamily: `${ele.fontFamily}`,
            textAlign: `${ele.textAlign}`,
            shadow: `${item2.myshadow}`
          };
        }
      });
      break;
    case 'rect':
      index = 2;
      delete css.color;
      css = {
        ...css,
        shadow: `${item2.myshadow}`
      };
      break;
    case 'image':
      index = 3;
      delete css.color;
      delete css.background;
      css = {
        url: item2.url,
        ...css,
        mode: `${item2.mode}`,
        shadow: `${item2.myshadow}`
      };
      break;
    case 'qrcode':
      index = 4;
      delete css.height;
      delete css.borderWidth;
      delete css.borderColor;
      delete css.shadow;
      css = {
        url: item2.url,
        ...css,
        color: item2.color,
        background: item2.background
      };
      break;
    default:
      break;
  }
  return {
    index,
    css
  }
}