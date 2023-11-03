<template>
	<div class="page-container py-5">
		<div class="container">
			<div class="row">
				<div class="col-md-10">
					<div class="col-md-7">
						<InputSearch v-model="searchText" />
					</div>
				</div>
				<div class="mt-3 col-md-6">
					<div class="content-section p-4 shadow rounded bg-white">
						<h4 class="content-title">
							Danh bạ
							<i class="fas fa-address-book"></i>
						</h4>
						<ContactList v-if="filteredContactsCount > 0" :contacts="filteredContacts"
							v-model:activeIndex="activeIndex"/>
						<p v-else>Không có liên hệ nào.</p>
					</div>
				</div>
				<div class="mt-3 col-md-6">
					<div class="content-section p-4 shadow rounded bg-white" v-if="activeContact">
						<h4 class="content-title">
							Chi tiết Liên hệ
							<i class="fas fa-address-card"></i>
						</h4>
						<ContactCard :contact="activeContact" />
						<router-link :to="{
							name: 'contact.edit',
							params: { id: activeContact._id },
						}">
							<span class="mt-2 badge text-bg-warning">
								<i class="fas fa-edit"></i>Hiệu chỉnh</span>
						</router-link>
					</div>
					<div class="action-buttons mt-4 p-4 shadow rounded bg-white">
						<div class="row justify-content-around align-items-center">
							<button class="col-3 btn btn-sm btn-outline-primary" @click="refreshList()">
								<i class="fas fa-redo"></i> Làm mới
							</button>
							<button class="col-4 btn btn-sm btn-outline-success" @click="goToAddContact">
								<i class="fas fa-plus"></i> Thêm mới
							</button>
							<button class="col-4 btn btn-sm btn-outline-danger" @click="removeAllContacts">
								<i class="fas fa-trash"></i> Xóa tất cả
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
	components: {
		ContactCard,
		InputSearch,
		ContactList,
	},
	data() {
		return {
			contacts: [],
			activeIndex: -1,
			searchText: "",
		};
	},
	watch: {
		searchText() {
			this.activeIndex = -1;
		},
	},
	computed: {
		contactStrings() {
			return this.contacts.map((contact) => {
				const { name, email, address, phone } = contact;
				return [name, email, address, phone].join("");
			});
		},
		filteredContacts() {
			if (!this.searchText) return this.contacts;
			return this.contacts.filter((_contact, index) =>
				this.contactStrings[index].includes(this.searchText)
			);
		},
		activeContact() {
			if (this.activeIndex < 0) return null;
			return this.filteredContacts[this.activeIndex];
		},
		filteredContactsCount() {
			return this.filteredContacts.length;
		},
	},
	methods: {
		async retrieveContacts() {
			try {
				this.contacts = await ContactService.getAll();
			} catch (error) {
				console.log(error);
			}
		},

		refreshList() {
			this.retrieveContacts();
			this.activeIndex = -1;
		},

		async removeAllContacts() {
			if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
				try {
					await ContactService.deleteAll();
					this.refreshList();
				} catch (error) {
					console.log(error);
				}
			}
		},

		goToAddContact() {
			this.$router.push({ name: "contact.add" });
		},
	},
	mounted() {
		this.refreshList();
	},
};

</script>

<style scoped>
.page-container {
	background-color: #f8f9fa;
}

.content-section {
	background-color: #fff;
	border-radius: .25rem;
	box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
	padding: 1rem;
	margin-bottom: 1rem;
}

.content-title {
	margin-bottom: 1rem;
	color: #333;
}
</style>