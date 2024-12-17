<script setup>
import { ref, computed, watch, onMounted } from 'vue'

import LabelText from "./LabelText.vue";

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    labelField: String,
    display: String,
    description: String,
    reduce: String,
    labelWidth: String,
    inputWidth: String,
    error: String,
    width: {
        type: String,
        default: "auto",
    },
    placeholder: {
        type: String,
        default: "Bấm để chọn"
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [Object, String, Number],
        default: () => {}
    },
    listData: {
        type: Array,
        default: () => []
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    isEdit: {
        type: Boolean,
        default: true,
    },
})

onMounted(() => {
    if (props.modelValue) {
        const dataModel = props.listData.find(item => {
            if (typeof item === 'object' && item !== null) {
                return item[props.reduce] === props.modelValue
            } else {
                return item === props.modelValue
            }
        })
        if (dataModel) {
            if (props.display) {
                selectedOption.value = { label: dataModel[props.display], value: dataModel }
            } else {
                selectedOption.value = { label: dataModel, value: dataModel }
            }
        }
    }
})

const selectedOption = ref({ label: '', value: '' })

const listDataLocal = computed(() => {
    return props.listData.map((item) => {
        if (typeof item === 'object' && item !== null) {
            return { label: item[props.display], value: item }
        } else {
            return { label: item, value: item }
        }
    })
})

const generateLabel = computed(() => {
  return (
    selectedOption.value?.label ||
    (selectedOption.value?.label != '' ? selectedOption.value?.label : !props.isEdit ? '-' : props.placeholder)
  )
})

watch(() => props.modelValue, (newVal) => {
    if (!newVal) {
        selectedOption.value = { label: '', value: '' }
    } else {
        const dataModel = props.listData.find(item => {
            if (typeof item === 'object' && item !== null) {
                return item[props.reduce] === props.modelValue
            } else {
                return item === props.modelValue
            }
        })
        if (dataModel) {
            if (props.display) {
                selectedOption.value = { label: dataModel[props.display], value: dataModel }
            } else {
                selectedOption.value = { label: dataModel, value: dataModel }
            }
        }
    }
  }
)

watch(() => props.listData, (newVal) => {
    if (newVal && props.modelValue) {
        const dataModel = props.listData.find(item => {
            if (typeof item === 'object' && item !== null) {
                return item[props.reduce] === props.modelValue
            } else {
                return item === props.modelValue
            }
        })
        if (dataModel) {
            if (props.display) {
                selectedOption.value = { label: dataModel[props.display], value: dataModel, variant: dataModel[props.variant] }
            } else {
                selectedOption.value = { label: dataModel, value: dataModel }
            }
        }
    }
  }
)

const handleSelect = (item) => {
    selectedOption.value = item

    if (props.reduce) {
        emits('update:modelValue', item.value[props.reduce])
        emits('onChange', item.value[props.reduce])
    } else {
        emits('update:modelValue', item.value)
        emits('onChange', item.value)
    }

    closeDropdown()
}



const isBottom = ref(false)
const isOption = ref(false)
const showOption = (e) => {
    const rect = e.target.getBoundingClientRect()

    if (window.innerHeight - rect.bottom < 200){
        isBottom.value = true
    } else {
        isBottom.value = false
    }

    if (!props.isDisabled) {
        isOption.value = !isOption.value
    }
}

const closeDropdown = () => {
    isOption.value = false
}
</script>

<template>
    <LabelText :title="labelField" :data="generateLabel" v-if="!isEdit"></LabelText>

    <div class="dropdown-wrapper" :class="{'label-width': labelWidth}" v-if="isEdit">
        <div class="dropdown-wrapper__label" v-if="labelField">
            {{ labelField }} <span v-if="isRequired">(*)</span>
        </div>
        <Field 
            v-model="selectedOption.value"
            class="input-wrapper__filed"
            v-slot="{ errors, field }"
            :name="nameField"
            v-bind="$attrs"
        >
            <div class="dropdown-wrapper__option" @click="showOption" v-click-outside="closeDropdown" v-bind="field">
                <div class="dropdown-wrapper__option__choose" :class="[{'error': error, 'focus': isOption,'disabled': isDisabled}]">
                    <div 
                        :class="{'label' : !selectedOption.label}"
                    >{{ generateLabel }}</div>                    
                    <IconSvg :class="{'active' : isOption}" name="arrow-down"></IconSvg>
                </div>
                <div class="dropdown-wrapper__option__list" :class="{'bottom' : isBottom, 'top' : !isBottom}" v-if="isOption">
                    <div class="drop-empty" v-if="listDataLocal.length == 0"></div>
                    <div 
                        :class="{'selected' : item.value === selectedOption.value ||  reduce && item.value[reduce] === selectedOption.value[reduce]}" 
                        v-for="item in listDataLocal" 
                        :key="item.value" 
                        @click.stop="handleSelect(item)"
                    >
                        <p class="flex-1">{{ item.label }}</p>
                        <span v-if="description">
                            ({{ item.value[description] }})
                        </span>
                    </div>
                </div>
                <div v-if="errors.length" class="input-error">
                    <p class="input-error-msg">{{ errors[0] }}</p>
                </div>
            </div>
        </Field>
    </div>
</template>

<style lang="scss" scoped>
@keyframes fadeInOption {
	from {
        transform: translateY(-20%);
		opacity: 0;
	}

	to {
        transform: translateY(0);
		opacity: 1;
	}
}

@keyframes fadeUpOption {
	from {
        transform: translateY(20%);
		opacity: 0;
	}

	to {
        transform: translateY(0);
		opacity: 1;
	}
}

.dropdown-wrapper {
    width: v-bind("props.width");
    display: flex;
    flex-direction: column;
    gap: 6px;

    &__label {
        @include text-style(14px, 20px, 600, $Gray-modern-700);
        width: v-bind("props.labelWidth");

        span {
          color: $Error-500;
        }
    }

    &__option {
        @include text-style(14px, 20px, 400, $Gray-modern-800);
        position: relative;
        width: v-bind("props.inputWidth");

        &__choose,
        &__list {
            width: 100%;
            background-color: $Gray-modern-25;
            border-radius: 8px;
            border: 1px solid $Gray-modern-300;
            outline: none;
        }

        &__choose {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;

            &:hover {
                cursor: pointer;
                border-color: $Primary-600;
            }

            .label {
                @include text-style(14px, 20px, 400, $Gray-modern-400);
            }

            img {
                width: 16px;
                height: 16px;
                padding: 0 3px;
                transition: all 0.2s;
            }

            .active {
                transform: rotate(-180deg);
            }
        }

        .error {
            border-color: $Error-500;
        }

        .focus {
            border-color: $Primary-600;
        }

        &__list {
            z-index: 10;
            position: absolute;
            top: 46px;
            font-weight: 500;
            box-shadow: 0 1px 2px #0618100f, 0 1px 3px #0323141a;
            max-height: 312px;
            overflow-y: auto;

            div {
                padding: 10px 14px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 6px;

                &:hover {
                    cursor: pointer;
                    background: $Gray-modern-100;
                }
            }

            span {
                font-weight: 600;
            }

            .selected {
                color: $Primary-700;
                background: $Primary-50;
            }

            .drop-empty {
                height: 80px;
            }
        } 

        &__list.top {            
            top: 46px;            
            animation: fadeInOption .2s ease;
        }
        
        &__list.bottom {
            bottom: 46px;
            animation: fadeUpOption .2s ease;
        }

        .input-error-msg {
            @include text-style(11px, 16px, 500, $Error-500);
            margin-top: 4px;
        }

        .disabled {
            background-color: $Gray-modern-100;
            border: 1px solid $Gray-modern-300;

            &:hover {
                cursor: default;
            }
        }
    }
}

.label-width {
  flex-direction: row;
  gap: 32px;
}
</style>