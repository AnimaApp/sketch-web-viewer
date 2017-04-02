
<style>
.layer:hover {
  outline: 1px solid blue;
}
</style>

<template>
  <div v-bind:style='{ width: "" + (imageWidth + 60) + "px", height: "" + imageHeight + "px", margin: "30px 50px" }'>

    <div v-if="imageData "v-bind:style='{ position: "relative",
      backgroundImage: "url(" + imageData + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundSize: "" + imageWidth + "px " + imageHeight + "px", width: "" + imageWidth + "px", height: "" + imageHeight + "px"}'>

      <div v-for="(artboard, key, index) in artboards" v-bind:style='{ color: "white",
      position: "absolute",
      left: "" + (key * (PREVIEW_ARTBOARD_PADDING + artboardWidth)) + "px",
      top: "" + (artboard.frame.y * artboardFactor) + "px",
      width: "" + artboardWidth + "px",
      height: "" + (artboard.frame.height * artboardFactor) + "px" ,
      boxSizing: "border-box"}'>

      <layer v-for="child in artboard.layers" v-bind:key="child.do_objectID" :layer="child" :artboard-width="artboardWidth" :artboard-factor="(artboardWidth / artboard.frame.width)"></layer>

    </div>
  </div>
  <div v-if="!imageData">
    <dropzone v-on:changed="onFileChange"></dropzone>

    <div style="text-align: center; color: red">
    {{error}}
    <div v-if="error">
      You can download Sketch 43 Beta here: <a href="https://rink.hockeyapp.net/api/2/apps/0172d48cceec171249a8d850fb16276b?format=zip">Download</a>
    </div>
  </div>
    <div style="text-align: center;">
    <a href="https://github.com/AnimaApp/sketch-web-viewer/raw/master/Fitness%20App.sketch">
      Demo file
    </a>
  </div>
  </div>
</div>
</template>

<script>

import Dropzone from './components/Dropzone'
import Layer from './components/Layer'
import {PREVIEW_ARTBOARD_PADDING, PREVIEW_MAX_SIZE} from './const'

var JSZip = require('jszip')

export default {
  name: 'app',
  components: {
    Layer,
    Dropzone
  },

  props: ['help'],

  data () {
    return {
      imageData: undefined,
      imageWidth: undefined,
      imageHeight: undefined,
      artboardWidth: 0,
      artboardFactor: 0,
      artboards: undefined,
      error: undefined,
      PREVIEW_ARTBOARD_PADDING: PREVIEW_ARTBOARD_PADDING,
      PREVIEW_MAX_SIZE: PREVIEW_MAX_SIZE
    }
  },

  methods: {
    onFileChange (file) {
      var vm = this
      var reader = new FileReader()

      reader.onload = (e) => {
        var data = e.target.result
        JSZip.loadAsync(data).then(function (zip) {
          zip.forEach(function (relativePath, zipEntry) {
            if (relativePath === 'previews/preview.png') {
              zipEntry.async('base64').then(function success (content) {
                vm.imageData = 'data:image/png;base64,' + content

                var image = new Image()

                image.onload = function () {
                  vm.imageWidth = image.width
                  vm.imageHeight = image.height

                  if (vm.imageWidth && vm.artboards && vm.imageWidth >= PREVIEW_MAX_SIZE) {
                    vm.artboardWidth = (PREVIEW_MAX_SIZE - (PREVIEW_ARTBOARD_PADDING * (vm.artboards.length - 1))) / vm.artboards.length
                  }
                }

                image.src = vm.imageData
              },
              function error (e) {
                console.log(e)
                vm.error = 'Could not load Sketch preview'
              })
            } else if (relativePath.startsWith('pages/')) {
              zipEntry.async('string').then(function success (content) {
                var page = JSON.parse(content)
                vm.artboards = page.layers

                if (vm.imageWidth && vm.artboards && vm.imageWidth >= PREVIEW_MAX_SIZE) {
                  vm.artboardWidth = (PREVIEW_MAX_SIZE - (PREVIEW_ARTBOARD_PADDING * (vm.artboards.length - 1))) / vm.artboards.length
                }
              },
              function error (e) {
                console.log(e)
                vm.error = 'Could not load page'
              })
            }
          })
        }, function (e) {
          console.log(e)
          vm.error = 'Only .sketch files that were saved using the new Sketch 43 are supported.'
        })
      }
      reader.readAsArrayBuffer(file)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

a {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.dropzone-area {
  margin: 50px auto;
  width: 80%;
  height: 200px;
  position: relative;
  border: 2px dashed #CBCBCB;
  &.hovered {
    border: 2px dashed #2E94C4;
    .dropzone-title {
      color: #1975A0;
    }

  }
}

.dropzone-area input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropzone-text {
  position: absolute;
  top: 50%;
  text-align: center;
  transform: translate(0, -50%);
  width: 100%;
  span {
    display: block;
    font-family: Arial, Helvetica;
    line-height: 1.9;
  }
}

.dropzone-title {
  font-size: 13px;
  color: #787878;
  letter-spacing: 0.4px;
}
.dropzone-info {
  font-size: 13px;
  font-size: 0.8125rem;
  color: #A8A8A8;
  letter-spacing: 0.4px;
}

.dropzone-button {
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
}

.dropzone-preview {
  width: 80%;
  position: relative;
  &:hover .dropzone-button {
    display: block;
  }
  img {
    display: block;
    height: auto;
    max-width: 100%;
  }

}
</style>
