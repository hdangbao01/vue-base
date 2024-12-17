<script setup>
import { ref, computed } from "vue"

import IconSvg from "@/components/Common/IconSvg.vue"

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: String,
  labelField: String,
  nameField: String,
  inputWidth: String,
  labelWidth: String,
  error: String,
  inputmode: String,
  placeholder: {
    type: String,
    default: "Nhập tại đây...",
  },
  type: {
    type: String,
    default: "text",
  },
  width: {
    type: String,
    default: "auto",
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isEdit: {
    type: Boolean,
    default: true,
  },
  textArea: {
    type: Boolean,
    default: false,
  },
})

const innerValue = computed({
  get: () => props.modelValue,
  set: (v) => {
    emits("update:modelValue", v)
  },
})

const isShowPassword = ref(false)
const handleShowPassword = () => {
  isShowPassword.value = !isShowPassword.value
}
</script>

<template>
  <div class="input-wrapper">
    <label class="input-wrapper__input-label" v-if="labelField">
      {{ labelField }} <span v-if="isRequired">*</span>
    </label>
    <div class="input-wrapper__input-group">
      <Field 
        v-model="innerValue"
        class="input-wrapper__filed"
        v-slot="{ errors, field }"
        :name="nameField"
        v-bind="$attrs"
      >
        <div class="relative">
          <IconSvg class="input-wrapper__input-group__search" name="search" v-if="type === 'search'"></IconSvg>
          <input
            v-model="innerValue"
            class="input-wrapper__input"
            :class="[{ 'active': errors.length > 0, 'password' : type == 'password', 'search' : type == 'search','disabled': isDisabled }]"
            :name="nameField"
            :type="isShowPassword ? 'text' : type"
            :disabled="isDisabled"
            :placeholder="placeholder"
            :inputmode="inputmode"
            v-bind="field"
            v-if="!textArea"
          />
          <textarea
            v-model="innerValue"
            class="input-wrapper__textarea"
            :class="{ 'active': errors.length > 0 }"
            :name="nameField"
            @input="handleOnChange"
            :disabled="isDisabled"
            :placeholder="placeholder"
            :inputmode="inputmode"
            :rows="4"
            v-else
          />
          <IconSvg class="input-wrapper__input-group__icon" name="eye" @click.stop="handleShowPassword" v-if="type == 'password' && !isShowPassword" ></IconSvg>
          <IconSvg class="input-wrapper__input-group__icon" name="eye-hidden" @click.stop="handleShowPassword" v-if="type == 'password' && isShowPassword" ></IconSvg>
        </div>
        <div v-if="errors.length > 0" class="input-wrapper__input-error">
          <p class="input-error-msg">{{ errors[0] }}</p>
        </div>
      </Field>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  width: v-bind("props.width");
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__input-label {
    @include font-small();
    width: v-bind("props.labelWidth");

    span {
      color: $Error-500;
    }
  }

  &__input-group {  
    width: v-bind("props.inputWidth");

    &__search {
      position: absolute;
      top: 50%;
      left: 14px;
      transform: translateY(-50%);
    }

    &__icon {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 50%;
      right: 14px;
      transform: translateY(-50%);

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__input,
  &__textarea {
    @include font-small-thin();
    width: 100%;
    padding: 10px 14px;
    background-color: $Gray-modern-25;
    border: 1px solid $Gray-modern-300;
    outline: none;
    transition: border-color 0.2s;

    &:hover,
    &:focus {
      border-color: $Primary-400;
    }
  }

  &__textarea {
    font-family: Arial, sans-serif;
    resize: none;
  }

  .search {
    padding-left: 42px;
  }

  .password {
    padding-right: 32px;
  }

  .disabled {
    background-color: $Gray-modern-100;

    &:hover,
    &:focus {
      border-color: $Gray-modern-300;
    }
  }
}

.active {
  border-color: $Error-500 !important;
}

.input-error-msg {
  @include text-style(11px, 16px, 500, $Error-500);
  margin-top: 4px;
}

input::placeholder,
input::-ms-input-placeholder {
  @include text-style(14px, 20px, 400, $Gray-modern-400);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button,
input::-ms-reveal,
input::-ms-clear {
  display: none;
}
</style>
