<template>
  <div>
    <div class="dropzone-area" drag-over="handleDragOver">
      <div class="dropzone-text">
        <span class="dropzone-title">Drop Sketch 43 file here or click to select</span>
      </div>
      <input type="file" @change="onFileChange">
    </div>
  </div>
</template>
<script type="text/javascript">

export default {

  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      var file = files[0]
      this.$emit('changed', file)
    }
  }

}

</script>
<style scoped>
.dropzone-area {
  width: 90%;
  max-width: 800px;
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
  padding: 20px 10px;
}

.dropzone-text {
  position: relative;
  line-height: 200px;
  text-align: center;
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
