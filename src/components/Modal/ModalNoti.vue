<script setup>
import BaseButton from '@/components/Common/BaseButton.vue'

const props = defineProps(['alert'])
</script>

<template>
	<div class="overlay" @click="$emit('close')">
		<div class="container" @click.stop>
			<div class="title">
				{{ alert.title }}
			</div>
			<div class="content">
				{{ alert.content }}
				<div class="content-slot">
					<slot></slot>
				</div>
			</div>
			<div class="action">
                <BaseButton class="action-btn" variant="secondary" outline :title="alert.btnCancel" @click="$emit('close')" v-if="alert.btnCancel"></BaseButton>
                <BaseButton class="action-btn" :title="alert.btnConfirm" @click="$emit('submit')" v-if="alert.btnConfirm"></BaseButton>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

.overlay {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 99;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fadeIn .4s ease;
}

.container {
	position: absolute;
	z-index: 999;
	// overflow: hidden;
	border: 1px solid $Gray-modern-200;
	background: $Gray-modern-25;
	box-shadow: 0px 4px 12px 0px rgba(3, 35, 20, 0.15);
	border-radius: 16px;
	width: 450px;
	text-align: center;
	padding: 32px 48px;
}

.title {
	font-size: 22px;
	font-weight: 600;
	letter-spacing: 0.01em;
	color: $Primary-600;
}

.content {
	font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $Gray-modern-800;
	margin: 16px 0 32px 0;

	.content-slot {
		text-align: start;
	}
}

.action {
	display: flex;
	gap: 12px;
}

.action-btn {
    flex: 1;
}
</style>
