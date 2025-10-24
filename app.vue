<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
body::-webkit-scrollbar-thumb {
  background-color: white !important;
  border: 1px solid white;
}

body::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}

body {
  -ms-overflow-style: none;
  /* scrollbar-width: thin; */
  /* margin: inherit; */
  scroll-margin-block-start: 0;
}
button:focus {
  outline: none !important;
  outline-offset: 0px !important;
}

.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: white !important;
  border: 1px solid white;
  border-radius: 8px;
  background-clip: padding-box;
}

.no-scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* scrollbar-width: thin; */
  /* margin: inherit; */
  scroll-margin-block-start: 0;
}
</style>
