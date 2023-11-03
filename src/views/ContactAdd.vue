<template>
    <div class="page">
        <h4>Thêm mới liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="createContact" />
        <div v-if="message" class="alert alert-warning text-dark">
            {{ message }}
        </div>
    </div>
</template>


<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
    components: {
        ContactForm,
    },
    data() {
        return {
            contact: {
                name: "",
                email: "",
                phone: "",
                address: "",
            },
            message: null, 
        };
    },
    methods: {
        async createContact(newContact) {
            try {
                await ContactService.create(newContact); 
                this.message = "Liên hệ được thêm thành công.";
            } catch (error) {
                console.error(error); 
                this.message = "Đã xảy ra lỗi khi thêm liên hệ."; 
            }
        },
    },
};
</script>