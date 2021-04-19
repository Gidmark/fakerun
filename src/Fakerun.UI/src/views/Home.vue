<template>
  <div class="page page--home">
    <h1>Fakerun</h1>
    <p>
      Welcome to our fun and exiting challenge tool. Fill out the form and send
      the generated link to your competitors and off you go!
    </p>
    <form>
      <div class="container">
        <div class="row mb-3">
          <div class="col-lg-6">
            <button id="selectStart" class="btn btn-secondary">
              <i class="bi-bullseye"></i> <span>Select start</span>
            </button>
          </div>
          <div class="col-lg-6">
            <button id="selectDestination" class="btn btn-secondary">
              <i class="bi-bullseye"></i> <span>Select destination</span>
            </button>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-lg-6">
            <label for="nameInput" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="nameInput"
              placeholder="Speedy Gonzales"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <label for="avatarFile" class="form-label">Avatar</label>
            <input class="form-control" type="file" id="avatarFile" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col text-end">
            <button class="btn btn-primary" disabled type="submit">
              Generate
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Home extends Vue {}
</script>
