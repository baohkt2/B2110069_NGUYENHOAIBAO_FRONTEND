<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-white">
		<div class="container-fluid">
			<div class="navbar-brand mx-auto webName">
				<img src="../images/iconContact.png" class="icon">
				Ứng dụng quản lí danh bạ
			</div>
		</div>
	</nav>

	<nav class="navbar navbar-expand-lg navbar-light mt-2 bg-white">
		<div class="container-fluid">

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
				<ul class="navbar-nav">

					<li class="nav-item pd-5">
						<router-link :to="{ name: 'contactbook' }" class="nav-link active">
							Danh bạ
							<i class="fas fa-address-book"></i>
						</router-link>
					</li>

					<li class="nav-item pd-5">
						<router-link :to="{ name: 'about' }" class="nav-link active">
							About
							<i class="fas fa-info-circle"></i>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			isOffcanvasVisible: false,
			searchText: "",
		};
	},
	methods: {
		toggleOffcanvas() {
			this.isOffcanvasVisible = !this.isOffcanvasVisible;
		},
	},
};
</script>
