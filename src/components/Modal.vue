<template>
    <div class="modal">
        <div class="md-modal modal-msg md-modal-transition">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="closeModal">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                    </div>
                    <div class="btn-wrap">
                        <slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" @click="closeModal"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'hello'
        }
    },
    methods: {
        closeModal () {
            this.$emit('close')
        }
    }
}
</script>


