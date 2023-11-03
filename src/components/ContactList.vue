<template>
	<div class="relative-container">
		<ul class="list-group contact-list-container">
			<li class="list-group-item" v-for="(contact, sortedIndex) in sortedContacts"
				:class="{ active: originalIndices[sortedIndex] === activeIndex }"
				:key="contact._id" @click="updateActiveIndex(originalIndices[sortedIndex])">
				{{ contact.name }}
			</li>
		</ul>
		<button @click="toggleSortDirection" class="sort-button">
			<div :class="sortDirection"></div>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		contacts: { type: Array, default: [] },
		activeIndex: { type: Number, default: -1 },
	},
	emits: ["update:activeIndex"],
	data() {
		return {
			sortKey: 'name',
			sortDirection: 'asc',
			originalIndices: [], 
		};
	},
	computed: {
		sortedContacts() {
			let sortedContacts = this.contacts
				.map((contact, index) => ({ ...contact, originalIndex: index })) 
				.sort((a, b) => a[this.sortKey].localeCompare(b[this.sortKey]));

			if (this.sortDirection === 'desc') {
				sortedContacts.reverse();
			}
			this.originalIndices = sortedContacts.map(contact => contact.originalIndex);
			return sortedContacts.map(contact => {
				const { originalIndex, ...contactWithoutIndex } = contact;
				return contactWithoutIndex;
			});
		},
		sortDirection() {
			return this.sortDirection === 'asc'?  "fa fa-sort-alpha-down": "fa fa-sort-alpha-up";
		}
	},
	methods: {
		updateActiveIndex(originalIndex) {
			this.$emit("update:activeIndex", originalIndex);
		},
		toggleSortDirection() {
			this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
		},
	},
};
</script>



<style scoped>
.relative-container {
	position: relative;
}

.sort-button {
	position: absolute;
	bottom: 0px;
	right: 20px;
	display: inline-block;
	border-color: #ffffff;
	background-image: linear-gradient(to bottom,#ffffff, #a5a5a7);
}

.contact-list-container {
	height: 300px;
	overflow-y: auto;
}
</style>s
