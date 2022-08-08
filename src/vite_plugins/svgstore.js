/* eslint-disable */
import path from "path";
import fs from "fs";
import store from "svgstore"; // 用于制作 SVG Sprites
import { optimize } from "svgo"; // 用于优化 SVG 文件

export const svgstore = (options = {}) => {
  const inputFolder = options.inputFolder || "src/assets/icons"; // 获取icons文件夹的位置
  return {
    name: "svgstore",
    resolveId(id) { // 使得编译器跳过检查 
      if (id === "@svgstore") {
        return "svg_bundle.js";
      }
    },
    load(id) {
      if (id === "svg_bundle.js") {
        const sprites = store(options);
        const iconsDir = path.resolve(inputFolder);
        for (const file of fs.readdirSync(iconsDir)) { // 遍历读取的icons的文件夹下的路径
          const filepath = path.join(iconsDir, file); // 将svg文件的路径拼接成绝对路径
          const svgid = path.parse(file).name; // 将路径地址转换为对象取得文件名
          let code = fs.readFileSync(filepath, { encoding: "utf-8" }); // 读取文件夹的路径并转为编码utf-8
          sprites.add(svgid, code);
        }
        // 优化svg的属性内容，去除无用属性
        const { data: code } = optimize(
          sprites.toString({ inline: options.inline }),
          {
            plugins: [
              "cleanupAttrs",
              "removeDoctype",
              "removeComments",
              "removeTitle",
              "removeDesc",
              "removeEmptyAttrs",
              {
                name: "removeAttrs",
                params: { attrs: "(data-name|data-xxx)" },
              },
            ],
          }
        );
        // 将svg大标签放到页面元素中去
        return `const div = document.createElement('div')
        div.innerHTML = \`${code}\`
        const svg = div.getElementsByTagName('svg')[0]
        if (svg) {
          svg.style.position = 'absolute'
          svg.style.width = 0
          svg.style.height = 0
          svg.style.overflow = 'hidden'
          svg.setAttribute("aria-hidden", "true")
        }
        // listen dom ready event
        document.addEventListener('DOMContentLoaded', () => {
          if (document.body.firstChild) {
            document.body.insertBefore(div, document.body.firstChild)
          } else {
            document.body.appendChild(div)
          }
        })`;
      }
    },
  };
};
