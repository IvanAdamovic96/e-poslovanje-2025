<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';

</script>

<template>
    <Navigation />
    <div class="container mt-5">
        <div class="row">
            <div class="col">
                <div class="text-content">
                    <p class="text-center fw-bold fs-3">
                        Contact us
                    </p>
                    <p class="">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna al iqua. Ut enim
                    </p>
                </div>
                <div class="text-center">
                    <div class="">
                        <div class="">
                            <img class="contact-svg"
                                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET21.jpg">
                            <p class="">
                                +1258 3258 5679
                            </p>
                        </div>
                        <div class="">
                            <img class="contact-svg"
                                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET22.jpg">
                            <p class="">
                                hello&#64;workik.com
                            </p>
                        </div>
                        <div class="">
                            <img class="contact-svg"
                                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET23.jpg">
                            <p class="">
                                102 street, y cross 485656
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col">

                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="validationDefault01" class="form-label">First name</label>
                        <input type="text" class="form-control" id="validationDefault01" placeholder="John" required>
                    </div>
                    <div class="col-md-6">
                        <label for="validationDefault02" class="form-label">Last name</label>
                        <input type="text" class="form-control" id="validationDefault02" placeholder="Doe" required>
                    </div>
                    
                    <div class="col-md-6">
                        <label for="validationDefault03" class="form-label">Email</label>
                        <input type="email" class="form-control" id="validationDefault03" placeholder="example@gmail.com" required>
                    </div>
                    <div class="col-md-3">
                        <label for="validationDefault04" class="form-label">State</label>
                        <select class="form-select" id="validationDefault04" required>
                            <option selected disabled value="">Choose...</option>
                            <option>Serbia</option>
                            <option>France</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="validationDefault05" class="form-label">Zip</label>
                        <input type="text" class="form-control" id="validationDefault05" placeholder="xxxxx" required>
                    </div>
                    <div class="col-12">
                        <label for="floatingTextarea2" class="form-label">Message</label>
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                            style="height: 100px" required></textarea>
                    </div>
                    <div class="col-6">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" value="" id="invalidCheck2" required>
                            <label class="form-check-label" for="invalidCheck2">
                                Agree to terms and conditions
                            </label>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button class="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="row mt-5 mb-5">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d657.6293046351759!2d21.89588535636931!3d43.318627551503624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b0b16f291241%3A0x5d4587d453cb8630!2z0KPQvdC40LLQtdGA0LfQuNGC0LXRgiDQodC40L3Qs9C40LTRg9C90YPQvA!5e1!3m2!1ssr!2srs!4v1731079979330!5m2!1ssr!2srs"
                width="600" height="450" style="border:0; border-radius: 2%;" allowfullscreen="true" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
</div>
</template>

<style></style>
