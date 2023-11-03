<template>
    <div class="form-container p-4 shadow rounded bg-white">
        <Form @submit="submitContact" :validation-schema="contactFormSchema">
            <div class="form-group mb-3">
                <label for="name">Tên</label>
                <Field name="name" type="text" class="form-control" v-model="contactLocal.name" />
                <ErrorMessage name="name" class="text-danger mt-1" />
            </div>
            <div class="form-group mb-3">
                <label for="email">E-mail</label>
                <Field name="email" type="email" class="form-control" v-model="contactLocal.email" />
                <ErrorMessage name="email" class="text-danger mt-1" />
            </div>
            <div class="form-group mb-3">
                <label for="address">Địa chỉ</label>
                <Field name="address" type="text" class="form-control" v-model="contactLocal.address" />
                <ErrorMessage name="address" class="text-danger mt-1" />
            </div>
            <div class="form-group mb-3">
                <label for="phone">Điện thoại</label>
                <Field name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />
                <ErrorMessage name="phone" class="text-danger mt-1" />
            </div>
            <div class="form-group form-check mb-3">
                <input name="favorite" type="checkbox" class="form-check-input" v-model="contactLocal.favorite" />
                <label for="favorite" class="form-check-label">
                    <strong>Liên hệ yêu thích</strong>
                </label>
            </div>
            <div class="form-group d-flex justify-content-start">
                <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu </button>
                <button v-if="contactLocal._id" type="button" class="ms-2 btn btn-danger" @click="deleteContact">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </Form>
    </div>
</template>


<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            contactLocal: this.contact,
            contactFormSchema,
        };
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        },
        deleteContact() {
            this.$emit("delete:contact", this.contactLocal.id);
        },
    },
};
</script>
<style scoped>
.form-container {
    background-color: #fff;
    border-radius: .25rem;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
    padding: 1rem;
    margin-bottom: 1rem;
}

.error-feedback {
    color: #dc3545;
    margin-top: .25rem;
    font-size: .875em;
}
</style>
