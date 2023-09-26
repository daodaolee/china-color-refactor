<script setup lang="ts">
import useClipboard from 'vue-clipboard3'
import ColorJson from '@/constant/color.json'
import { animationDelayTime, isLightColor } from '@/utils'

const { toClipboard } = useClipboard()
async function copy(text: string) {
  try {
    await toClipboard(text)
    alert('🎉🎉🎉🎉🎉')
  }
  catch (e) {
    console.error(e)
  }
}
interface Color {
  name: string
  r: number
  g: number
  b: number
  hex: string
  sentence: string
  sentenceFrom: string
  category: string
  fontColor?: string
  author?: string
}

const colorData = ref<Color[][]>([])
const isActive = ref(false)

let colorObj: Color = reactive({
  name: '',
  fontColor: '',
  r: 0,
  g: 0,
  b: 0,
  hex: '',
  category: '',
  sentenceFrom: '',
  sentence: '',
})

function generateBackgroundStyles(colorObj: Color): Record<string, string> {
  const { r, g, b, fontColor } = toRefs(colorObj)
  return {
    backgroundColor: `rgb(${r.value}, ${g.value}, ${b.value})`,
    transition: 'all 0.5s linear',
    color: fontColor!.value || '#ffffff',
  }
}

function setColor(color: Color) {
  if (color.name === colorObj.name)
    return

  isActive.value = false
  requestAnimationFrame(() => {
    colorObj = Object.assign(colorObj, color)
    const { r, g, b } = colorObj
    colorObj.fontColor = isLightColor({ r, g, b }) ? '#343333' : '#ffffff'
    isActive.value = true
  })
}

function toUrl(url: string) {
  window.open(url, '_blank')
}
onMounted(() => {
  colorData.value = ColorJson
  setColor(colorData.value[0][0])
})
</script>

<template>
  <div class="w100 h100 color" :style="generateBackgroundStyles(colorObj)">
    <div class="w100 h100 color-container">
      <div class="h100 color-container-color">
        <div v-for="(color, index) in colorData" :key="index" class="color-container-color-item">
          <div class="color-container-color-item-solarterm">
            {{ colorData[0][0].category }}
          </div>
          <div class="color-container-color-item-block">
            <div v-for="(item, i) in color" :key="`${index}_${i}`" @click="setColor(item)">
              <span>
                {{ item.name }}
              </span>
              <i :style="{ background: item.hex }" />
            </div>
          </div>
        </div>
      </div>
      <div class="color-container-name" :class="[isActive ? 'active' : '']">
        <div class="color-container-name-title">
          <span
            v-for="(item, index) in colorObj.name.split('')" :key="index"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            {{ item }}
          </span>
        </div>
      </div>

      <div class="color-container-sentence">
        <div class="sentence">
          <span
            v-for="(item, index) in colorObj.sentence.split('')" :key="index" :class="[isActive ? 'active' : '']"
            :style="{ animationDelay: `${animationDelayTime(index)}s` }"
          >
            {{ item }}
            <br
              v-if="item === '，'
                || item === '。'
                || item === '；'
                || item === '、'
                || item === '：'
              "
            >
          </span>
        </div>
        <div class="sentenceFrom">
          <span
            v-for="(item, index) in colorObj.sentenceFrom.split('')" :key="index" :class="[isActive ? 'active' : '']"
            :style="{ animationDelay: `${animationDelayTime(index)}s` }"
          >
            {{ item }}
            <br v-if="item === ' '">
          </span>
        </div>
      </div>
    </div>
    <p class="color-copyright">
      中國傳統色 故宮裡的色彩美學 二十字節氣 浙ICP備2022027583號-1
    </p>

    <div class="color-operate">
      <div class="tooltip">
        <div class="tooltip-item">
          <p @click="copy(colorObj.hex)">
            HEX
          </p>
          <p @click="copy(`rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`)">
            RGB
          </p>
        </div>
        <div class="copyBtn">
          copy
        </div>
      </div>

      &nbsp;
      <img
        src="https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white" alt=""
        @click="toUrl('https://github.com/daodaolee/china-color')"
      >
    </div>
  </div>
</template>

<style lang="less">
@import '@/styles/common.less';

.color {
  &-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("../assets/imgs/grain.png");
  }

  &-container {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;

    &-collapse-btn {
      display: none;
      position: fixed;
      z-index: 999;
      top: 1em;
      left: 0.9em;
      padding: 0.3em;
      border-radius: 50%;
      border: 0.17em solid;
    }

    &-color {
      position: absolute;
      top: 0;
      left: 0;
      overflow-y: scroll;
      width: 47%;
      .scrollbar-hide();

      &-item {
        width: calc(100% - 0.2em);
        position: relative;
        top: 3.125em;
        display: flex;
        letter-spacing: 0.1825em;

        &-block {
          width: 100%;
          left: 0;
          // width: 23.1em;
          padding-bottom: 2em;
          display: flex;
          flex-wrap: wrap;

          div {
            width: 3.2em;
            writing-mode: vertical-lr;
            padding: 0 0 1em;
            display: flex;
            align-items: center;
            cursor: pointer;
            letter-spacing: 0.25em;
            position: relative;

            span {
              position: relative;
              z-index: 2;
              font-size: 1em;
            }

            i {
              display: inline-block;
              position: absolute;
              right: 1.05em;
              top: -0.125em;
              width: 0.375em;
              height: 1.9em;
              z-index: 1;
              border-radius: 0.125em;
            }
          }
        }

        &-solarterm {
          writing-mode: vertical-lr;
          padding-right: 2.3em;
          font-size: 1.125em;
        }
      }
    }

    &-name {
      position: absolute;
      top: 12vh;
      right: 2em;
      display: block;

      &-title {
        font-size: 5em;
        writing-mode: vertical-lr;
      }

      &.active {
        span {
          opacity: 0;
          animation: show 1.5s ease-out forwards;
        }
      }

      &-rgb {
        position: absolute;
        transform: translate(0%, -10%);
        top: -1.5em;
        left: 125%;
        display: flex;
        flex-direction: column;
        font-family: cursive;

        p {
          padding-bottom: 2.2em;
          display: flex;
          align-items: center;
          span:first-child {
            transform: scale(0.65);
            display: inline-block;
            position: relative;
            top: -0.7em;
            left: 0.1em;
          }

          span:last-child {
            font-size: 1.1em;
          }
        }
      }
    }

    &-sentence {
      writing-mode: vertical-rl;
      position: absolute;
      bottom: 1em;
      right: 2em;

      span {
        &.active {
          opacity: 0;
          animation: show 1.5s linear forwards;
        }
      }

      .sentence {
        display: block;

        span {
          font-size: 1.375em;
        }
      }

      .sentenceFrom {
        padding-right: 1.25em;

        span {
          &:first-child {
            &:before {
              content: "「 ";
              position: relative;
              top: 0.3em;
            }
          }

          &:last-child {
            &:after {
              content: " 」";
              position: relative;
              bottom: 0.3em;
            }
          }
        }
      }
    }
  }

  &-copyright {
    writing-mode: vertical-lr;
    position: absolute;
    right: 0.3125em;
    top: 50%;
    font-size: 0.875em;
    opacity: 0.5;
    transform: translateY(-50%);
    letter-spacing: 0.625em;
    height: max-content;
  }

  &-operate {
    position: fixed;
    bottom: 0.5em;
    right: 0.5em;
    display: flex;
    cursor: pointer;

    .tooltip {
      position: relative;
      font-family: "sans-serif";
    }

    .tooltip .tooltip-item {
      visibility: hidden;
      color: #fff;
      text-align: center;
      padding-bottom: 10px;
      position: absolute;
      z-index: 1;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.625em;
      opacity: 0;
      transition: opacity 1s;
      display: flex;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0.5em;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }

      p {
        padding: 3px 8px;
        background-color: black;

        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        &:not(:last-child) {
          padding-right: 1em;
        }

        &:not(:first-child) {
          padding-left: 1em;
        }
      }
    }

    .tooltip:hover .tooltip-item {
      visibility: visible;
      opacity: 1;
    }

    .copyBtn {
      font-family: "sans-serif";
      background: #1a0c0c;
      color: white;
      padding: 3px 5px;
      font-size: 0.625em;
      border-radius: 4px;
    }
  }
}

@keyframes show {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media screen and (max-width: 780px) {
  .color-container {
    max-width: 100vw;
    position: relative;
  }

  .color-container-collapse-btn {
    display: block;
  }

  .color-container-color {
    transition: all 0.2s;
    position: fixed;
    top: 4em;
    left: 0;
    width: 3em;
    transform: translate(-100%, 0);
    // height: calc(100% - 4em);
    z-index: 10;

    // display: flex;
    &-item {
      top: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-solarterm {
        padding-right: 0;
        padding-bottom: 1em;
        font-weight: bold;
        opacity: 0.7;
      }

      &-block {
        flex-direction: column;
        justify-content: center;
        align-items: center;

        div {
          width: 1.5em;

          i {
            right: 0.25em;
          }
        }
      }
    }
  }

  .color-container-name {
    width: 100vw;
    display: flex;
    justify-content: center;
    right: 0;

    &-rgb {
      display: none;
    }
  }

  .color-container-sentence {
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    right: 0;
  }

  .color-copyright {
    display: none;
  }
}

@media screen and (min-width: 781px) and (max-width: 1500px) {
  .color-container {
    max-width: 75vw;
    position: relative;
  }
}
</style>
