<script setup>  
const emits = defineEmits(['inputChanged'])
const props = defineProps({
  name: {
    type: String,
    default: 'default',
    required: true
  },
  label: {
    type: String,
    default: '',
    required: false
  },
  dataValue: {
    type: [Object, String, Number, Boolean],
    default: () => {},
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const model = defineModel()
</script>

<template>
  <label
    class="container"
    :class="[
      {
        disabled: props.isDisabled,
        'not-selected': model != props.dataValue
      }
    ]"
    @click.stop
  >
    <div class="label" v-if="label">
      <p>{{ label }}</p>
    </div>
    <input
      type="radio"
      v-model="model"
      :value="props.dataValue"
      :name="props.name"
      :disabled="props.isDisabled"
      @change="emits('inputChanged', props.modelValue)"
      ref="inputElement"
    />
    <div class="checkmark">
      <div class="checkmark__child"></div>
    </div>
  </label>
</template>

<style scoped>
.container {
display: flex;
align-items: center;
flex-direction: row-reverse;
justify-content: flex-end;
gap: 12px;
position: relative;
cursor: pointer;
font-size: 22px;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
}

.label {
display: flex;
flex-direction: column;
gap: 2px;
color: #202939;
font-size: 16px;
}

.price {
color: #4B5565;
font-size: 14px;
}

.container input {
position: absolute;
opacity: 0;
cursor: pointer;
}

.checkmark {
position: relative;
/* top: 0;
left: 0; */
height: 19px;
width: 19px;
border-radius: 50%;
border: 1px solid #9AA4B2;
background-color: #fff;
}

.container:hover input ~ .checkmark {
background-color: #EEF2F6;
}

.container input:checked ~ .checkmark {
background-color: #15B79E;
}

.checkmark:after {
content: "";
position: absolute;
display: none;
}

.container input:checked ~ .checkmark:after {
display: block;
}

.container .checkmark:after {
top: 4.5px;
left: 5px;
width: 8px;
height: 8px;
border-radius: 50%;
background: #fff;
}
</style>
