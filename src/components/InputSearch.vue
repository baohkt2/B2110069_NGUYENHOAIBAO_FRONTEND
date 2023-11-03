<template>
	<div class="input-group">
		<input type="text" class="form-control" placeholder="Nhập thông tin cần tìm..." :value="modelValue"
			@input="updateModelValue" @keyup.enter="submit" />
		<button class="btn btn-outline-primary" type="button" @click="submit">
			<i class="fas fa-search"></i> Tìm kiếm
		</button>
	</div>
</template>

<script>
export default {
	props: {
		modelValue: { type: String, default: "" },
	},
	emits: ["submit", "update:modelValue"],
	methods: {
		updateModelValue(e) {
			this.$emit("update:modelValue", e.target.value);
		},
		submit() {
			if (this.modelValue.trim() === "") {
				alert("Vui lòng nhập thông tin cần tìm!");
			} else {
				this.$emit("submit");
			}
		},
	},
};
</script>
