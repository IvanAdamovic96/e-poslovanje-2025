<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';

</script>

<template>
  <div>
    <Navigation />
    <h1>About Page</h1>
    <section class="py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <img
              src="https://www.confused.com/-/media/confused/articles/bike-insurance/types-of-motorbikes-article-image.jpg?la=en-gb&h=553&w=830&hash=5CEEE9B3026C201E51582971E135771C"
              class="img-fluid rounded shadow-sm" alt="Naš tim">
          </div>
          <div class="col-lg-6">
            <h2 class="display-5 mb-4">Welcome to Bike Shop!</h2>
            <p class="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus eros nec fringilla feugiat.
              Aliquam erat volutpat. Pellentesque consequat risus a nibh lobortis condimentum.
            </p>
            <p>
              Vivamus eu mauris sed risus consectetur interdum. Vivamus in convallis risus, ac cursus velit. Nunc tempus
              augue sit amet interdum lobortis. Etiam interdum cursus tempor.
              Morbi placerat, tellus ornare tempor aliquam, tellus erat commodo odio, ut dapibus turpis erat quis
              tellus.
            </p>
            <RouterLink to="/bikes" class="btn btn-danger btn-lg mt-3">Check our offer</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <hr class="my-5">

    <section class="py-5 bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-6 mb-4 mb-md-0">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h3 class="card-title mb-3">Our goal</h3>
                <p class="card-text">
                  Nulla venenatis lorem eu metus scelerisque fermentum. Maecenas et sem lectus. Sed in velit diam.
                  Praesent convallis laoreet leo id accumsan. Nulla facilisi. In id enim ut nisi tincidunt pulvinar.
                  Morbi malesuada erat sit amet nulla interdum imperdiet.
                  Mauris sit amet fringilla velit. Morbi ut lacinia eros, vel molestie mi.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h3 class="card-title mb-3">Our vision</h3>
                <p class="card-text">
                  Morbi et neque eget mauris molestie rutrum eget vel tortor. Duis condimentum elit ac congue tincidunt.
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare
                  orci id leo porttitor, eget semper enim ullamcorper. Curabitur eleifend aliquet lacinia. Aenean
                  lobortis gravida nisi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr class="my-5">

    <section class="py-5">
      <div class="container text-center">
        <h2 class="display-5 mb-5">Why choose us?</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-gear-fill"
                viewBox="0 0 16 16">
                <path
                  d="M9.405 1.02c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-1.926.963L4.388 1.1c-.993.894-1.168 2.305-.407 3.31L2.61 7.509a2.031 2.031 0 0 1-.977 1.607L.73 10.3c-.602.894-.187 2.033.727 2.478l.492.247a1.464 1.464 0 0 1 1.926.963l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 1.926-.963L11.612 14.9c.993-.894 1.168-2.305.407-3.31l1.785-2.616a2.031 2.031 0 0 1 .977-1.607l1.766-.883c.602-.894.187-2.033-.727-2.478l-.492-.247A1.464 1.464 0 0 1 12.784 2.12l-.1-.34c-.413-1.4-2.397-1.4-2.81 0z" />
              </svg>
              <h4 class="mt-3">Vivamus rutrum</h4>
              <p>Vivamus rutrum, ligula non tristique venenatis, dui sapien lacinia erat, et vestibulum justo massa ut
                ipsum. Cras tristique porta magna, ut pretium lectus posuere hendrerit.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor"
                class="bi bi-people-fill" viewBox="0 0 16 16">
                <path
                  d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.01.377-2.009 1.036-2.804C6.716 9.451 7.497 9 8 9c.503 0 1.284.451 1.964 1.196.659.795 1.036 1.794 1.036 2.804zm-9.718 0A.25.25 0 0 1 1.25 13a7.228 7.228 0 0 0 1.482 1H.5a.5.5 0 0 1 0-1H.282ZM.25 12a.25.25 0 0 1 .25-.25h.455c.045-.758.21-1.503.494-2.203zm-.459-2.052A.25.25 0 0 1 .25 9.5V8.5a.25.25 0 0 1 .25-.25h.455c.045-.758.21-1.503.494-2.203z" />
              </svg>
              <h4 class="mt-3">Mauris magna</h4>
              <p>Mauris magna massa, sagittis id hendrerit sed, tristique id sem. Vivamus pharetra quis lacus nec
                rhoncus. Integer vel quam eget elit aliquet viverra. Nullam ultrices posuere pellentesque. Phasellus vel
                ornare velit. In in nunc porttitor, commodo odio vitae, fermentum nisi.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor"
                class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                <path
                  d="M6.956 1.745C7.502.5 11 1.523 11 6.5V10.5h4.116c.582 0 .615.015.7.078.601.44.298 1.34.004 1.978-.099.25-.195.5-.3.738C14.722 13.927 13.543 16 10.5 16H8c-1.798 0-2.859-.183-3.41-.65-.572-.47-.42-1.2-.676-1.6L1.87 9.87c-.367-.27-.7-.668-.832-1.1-.132-.43-.178-.933-.14-.984.042-.05.27-.145.47-.282.2-.136.42-.25.64-.32.22-.07.45-.104.66-.104h.715c.783 0 1.37.587 1.37 1.37 0 .52-.303.953-.693 1.14l.004.004c.158.077.296.129.416.16.12.03.24.048.35.048h.75zM4.42 1.34A.25.25 0 0 0 4.25 1H3a.25.25 0 0 0-.25.25v.792c-.178.01-.252.073-.404.148-.12.058-.2-.118-.18-.118.067-.06.122-.1.18-.118.06-.018.106-.022.148-.022h.025a.25.25 0 0 0 .25-.25V1.34Z" />
              </svg>
              <h4 class="mt-3">Maecenas efficitur</h4>
              <p>Maecenas efficitur molestie lectus, sit amet tincidunt nisl aliquet vitae. Vivamus gravida tempus
                placerat. Phasellus vel tellus ipsum. Maecenas non semper massa. Donec est magna, tincidunt et egestas
                eu, hendrerit id neque. Mauris vitae ex scelerisque lorem facilisis commodo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
