<script setup>
import { ref, onMounted, computed, watch } from 'vue'

import BaseButton from '@/components/Common/BaseButton.vue'
import LabelText from "@/components/Common/LabelText.vue"
import IconSvg from "@/components/Common/IconSvg.vue"

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: String,
    labelField: String,
    isTime: String,
    minTime: Object,
    maxTime: Object,
    minDate: Object,
    width: {
        type: String,
        default: "100%",
    },
    placeholder: {
        type: String,
        default: "Bấm để chọn",
    },
    timeSelect: {
        type: Boolean,
        default: false,
    },
    timePicker: {
        type: Boolean,
        default: false,
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
    range: {
        type: Boolean,
        default: false,
    },
})

// const dateValue = ref('')
const model = defineModel()

watch(model, (val) => {
    console.log('model', val)
})

const innerValue = computed({
  get: () => {    
    return props.modelValue
  },
  set: (value) => {
    emits("update:modelValue", value)
  },
})

const formatDate = (date) => {
    if (date) {
        if (date.length) {
            const dayStart = date[0].getDate();
            const monthStart = date[0].getMonth() + 1;
            const yearStart = date[0].getFullYear();

            const dayEnd = date[1].getDate();
            const monthEnd = date[1].getMonth() + 1;
            const yearEnd = date[1].getFullYear();

            return `${dayStart}/${monthStart}/${yearStart} - ${dayEnd}/${monthEnd}/${yearEnd}`;
        }

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        if (props.timeSelect) {
            return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        } else {
            return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        }
    }
}

const formatDateText = ref(
    {
        format: 'MM.dd.yyyy HH:mm'
    }
)
</script>

<template>
    <LabelText :title="labelField" :data="model" :isTime="isTime" v-if="!isEdit"></LabelText>

    <div class="calender-wrapper" :class="{'label-width': labelWidth}" v-else>
        <label class="calender-label" v-if="labelField">
            {{ labelField }} <span v-if="isRequired">(*)</span>
        </label>

        <Field 
            v-model="model"
            class="input-wrapper__filed"
            v-slot="{ errors }"
            :name="nameField"
            v-bind="$attrs"
        >
            <VueDatePicker 
            v-model="model"        
                class="calender-picker"
                position="center"
                locale="vi"
                :placeholder="placeholder"
                :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
                :enable-time-picker="timeSelect" 
                :time-picker="timePicker"
                :format="!timePicker && formatDate"
                :class="{'disable': isDisabled, 'error': errors.length}"
                :disabled="isDisabled"
                :range="range"
                text-input
                :min-time="minTime"
                :max-time="maxTime"
                :min-date="minDate"
            >
                <template #input-icon>
                    <IconSvg class="input-slot-image" name="history" />
                </template>
                <template #action-extra="{ selectCurrentDate }" v-if="!timePicker && !range">
                    <div class="action-extra">
                        <p class="extra-btn" @click="selectCurrentDate()">Hôm nay</p>
                    </div>
                </template>
                <template #action-row="{ closePicker, selectDate }">
                    <div class="action-wrapper">
                        <div class="action-row">
                            <BaseButton class="flex-1" title="Huỷ" variant="secondary" outline @click="closePicker"></BaseButton>
                            <BaseButton class="flex-1" title="Chọn" @click="selectDate"></BaseButton>
                        </div>
                    </div>
                </template>
            </VueDatePicker>
            <div v-if="errors.length">
                <p class="input-error">{{ errors[0] }}</p>
            </div>
        </Field>
    </div>
</template>

<style lang="scss" scoped>
.calender-wrapper {
    position: relative;
    width: v-bind("props.width");
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.calender-label {
    @include text-style(14px, 20px, 600, $Gray-modern-700);
    width: v-bind("props.labelWidth");

    span {
      color: $Error-500;
    }
}

.input-slot-image {
    margin-left: 14px;
}

.input-error {
  @include text-style(11px, 16px, 500, $Error-500);
  margin-top: -2px;
}

.calender-picker:deep().dp__input {
    @include text-style(14px, 20px, 400, $Gray-modern-800);
    width: 100%;
    padding: 10px 14px 10px 38px;
    border-radius: 8px;
    background-color: $Gray-modern-25;
    border: 1px solid $Gray-modern-300;
    outline: none;
    transition: border-color 0.2s;
    
    &:hover,
    &:focus {
        border-color: $Primary-600;
    }
}

.calender-picker.error:deep().dp__input {
    border-color: $Error-500;

    &:hover,
    &:focus {
        border-color: $Error-500;
    }
}

.calender-picker:deep().dp__today,
.calender-picker:deep().dp__calendar_item {
    border-radius: 50%;
    overflow: hidden;
}

.calender-picker:deep().dp__today {
    border: 1px solid $Primary-500;
}

.calender-picker:deep().dp__active_date,
.calender-picker:deep().dp__overlay_cell_active,
.calender-picker:deep().dp__range_end, 
.calender-picker:deep().dp__range_start {
    background-color: $Primary-500;
}

.calender-picker:deep().dp__inc_dec_button:hover{
    color: $Primary-500;
}

.calender-picker.disable:deep().dp__input:hover {
  border: 1px solid $Gray-modern-300;
}

.action-wrapper {
    width: 100%;
}

.action-extra {
    @include text-style(14px, 20px, 600, $Gray-modern-800);
    display: flex;
    justify-content: flex-end;
    padding: 0 8px;
}

.extra-btn {
    background: $Success-Base-White;
    border: 1px solid $Gray-modern-300;
    padding: 4px 6px;
    border-radius: 6px;

    &:hover {
        cursor: pointer;
        background-color: $Gray-modern-100;
    }
}

.action-row {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
}
</style>