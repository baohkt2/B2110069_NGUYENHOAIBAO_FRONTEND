import { RouterLink } from 'vue-router';
<template>
    <div class="page bg-white text-dark p-5 my-5 rounded shadow-lg">
        <h2 class="mb-4">Không Tìm Thấy Trang</h2>
        <p class="lead">
            Oops, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Vui lòng trở về
            <router-link to="/" class="text-warning">Trang chủ.</router-link>
        </p>
        <router-link to="/" class="btn btn-warning btn-lg mt-3">Trở về Trang chủ</router-link>
    </div>
</template>

<style scoped>
.page {
    max-width: 600px;
    margin: auto;
    text-align: center;
}

/* Thêm một số style tùy chỉnh nếu cần */
</style>
