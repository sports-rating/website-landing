<template>
  <div class="bg-transparent border p-6 pt-0 rounded-xl">
    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-6" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            activeTab === tab.key
              ? 'border-pink-500 text-pink-600'
              : 'border-transparent text-gwhite hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1  font-medium text-sm',
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div v-if="activeTab === 'photos'">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(photo, index) in photos"
          :key="'photo-' + index"
          class="relative aspect-video rounded-lg overflow-hidden group"
        >
          <img :src="photo.url" :alt="photo.name" class="w-full h-full object-cover" />
          <div
            class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-end p-2 transition"
          >
            <div class="flex justify-between w-full text-white text-sm">
              <span class="truncate">{{ photo.name }}</span>
              <button
                @click="deletePhoto(photo, index)"
                class="text-red-400 hover:text-red-600 font-bold"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>

        <!-- Add Photo -->
        <label
          class="cursor-pointer aspect-video flex flex-col items-center justify-center bg-pink-50 rounded-lg border-2 border-dashed border-pink-200 hover:bg-pink-100 transition-colors"
        >
          <input
            type="file"
            accept="image/*"
            class="hidden"
            multiple
            @change="handlePhotoUpload"
          />
          <div class="w-8 h-8 mb-2 text-pink-500">
            <img src="/plus.svg" alt="plus" />
          </div>
          <span class="text-sm text-pink-600">Добавить фото</span>
        </label>
      </div>
    </div>

    <div v-else-if="activeTab === 'videos'">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(video, index) in videos"
          :key="'video-' + index"
          class="relative aspect-video rounded-lg overflow-hidden group"
        >
          <img
            :src="video.thumbnail"
            :alt="video.name"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-end p-2 transition"
          >
            <div class="flex justify-between w-full text-white text-sm">
              <span class="truncate">{{ video.name }}</span>
              <button
                @click="deleteVideo(video, index)"
                class="text-red-400 hover:text-red-600 font-bold"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>

        <!-- Add Video -->
        <label
          class="cursor-pointer aspect-video flex flex-col items-center justify-center bg-pink-50 rounded-lg border-2 border-dashed border-pink-200 hover:bg-pink-100 transition-colors"
        >
          <input
            type="file"
            accept="video/*"
            class="hidden"
            @change="handleVideoUpload"
          />
          <div class="w-8 h-8 mb-2 text-pink-500">
            <img src="/plus.svg" alt="plus" />
          </div>
          <span class="text-sm text-pink-600">Добавить видео</span>
        </label>
      </div>
    </div>

    <div v-else-if="activeTab === 'pdfs'">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(pdf, index) in pdfs"
          :key="'pdf-' + index"
          class="relative bg-gray-100 rounded-lg p-4 group"
        >
          <div class="flex flex-col items-center">
            <img src="/pdf.svg" alt="PDF Icon" class="w-12 h-12" />
            <!-- <span class="text-sm text-gray-700 truncate">{{ pdf.name }}</span> -->
            <button
              @click="deletePdf(pdf, index)"
              class="text-red-400 hover:text-red-600 font-bold"
            >
              Удалить
            </button>
          </div>
        </div>

        <!-- Add PDF -->
        <label
          class="cursor-pointer flex flex-col items-center justify-center bg-pink-50 rounded-lg border-2 border-dashed border-pink-200 hover:bg-pink-100 transition-colors"
        >
          <input
            type="file"
            accept="application/pdf"
            class="hidden"
            @change="handlePdfUpload"
          />
          <div class="w-8 h-8 mb-2 text-pink-500">
            <img src="/plus.svg" alt="plus" />
          </div>
          <span class="text-sm text-pink-600">Добавить PDF</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { $api } = useNuxtApp();

const localMediaIds = ref([]);
const photos = ref([]);
const videos = ref([]);
const pdfs = ref([]);

const activeTab = ref("photos");
const tabs = [
  { key: "photos", label: "Фотографии" },
  { key: "videos", label: "Видео" },
  { key: "pdfs", label: "PDF" },
];

onMounted(async () => {
  try {
    const { data } = await $api.get("/user/profile/media/");

    photos.value = data.data
      .filter((m) => m.media_type === "image")
      .map((m) => ({
        id: m.id,
        url: m.file,
        name: m.file.split("/").pop(),
      }));

    const videoItems = data.data.filter((m) => m.media_type === "video");
    for (const m of videoItems) {
      const thumbnail = await generateThumbnail(m.file);
      videos.value.push({
        id: m.id,
        url: m.file,
        thumbnail,
        name: m.file.split("/").pop(),
        created_time: m.created_time,
        size: m.size,
      });
    }

    pdfs.value = data.data
      .filter((m) => m.media_type === "pdf")
      .map((m) => ({
        id: m.id,
        name: m.file.split("/").pop(),
        url: m.file,
      }));
  } catch (err) {
    console.error("Media fetch error:", err);
  }
});

function generateThumbnail(videoUrl) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.currentTime = 1;

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
      URL.revokeObjectURL(video);
    });

    video.addEventListener("error", () => {
      resolve("https://placehold.co/600x400?text=Video+Preview");
    });
  });
}

const deletePhoto = async (photo, index) => {
  try {
    await $api.delete(`https://api.7srating.uz/api/user/media/${photo.id}/`);
    photos.value.splice(index, 1);
    localMediaIds.value = localMediaIds.value.filter((id) => id !== photo.id);
  } catch (error) {
    console.error("Failed to delete photo:", error.response?.data || error.message);
  }
};

const deleteVideo = async (video, index) => {
  try {
    await $api.delete(`https://api.7srating.uz/api/user/media/${video.id}/`);
    videos.value.splice(index, 1);
    localMediaIds.value = localMediaIds.value.filter((id) => id !== video.id);
  } catch (error) {
    console.error("Failed to delete video:", error.response?.data || error.message);
  }
};

const handlePhotoUpload = async (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;

  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "user");
      formData.append("is_profile_photo", false);

      const response = await $api.post(
        "https://api.7srating.uz/api/user/media-upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      localMediaIds.value.push(response.data.data.id);
      photos.value.push({
        id: response.data.data.id,
        url: URL.createObjectURL(file),
        name: file.name,
      });
    }
  } catch (error) {
    console.error("Photo upload failed:", error.response?.data || error.message);
  }
};

const handleVideoUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const videoURL = URL.createObjectURL(file);
  const videoElement = document.createElement("video");
  videoElement.src = videoURL;
  videoElement.currentTime = 1;

  videoElement.addEventListener("loadeddata", async () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const thumbnail = canvas.toDataURL("image/png");
    URL.revokeObjectURL(videoURL);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "user");
    formData.append("is_profile_photo", false);

    try {
      const response = await $api.post(
        "https://api.7srating.uz/api/user/media-upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      localMediaIds.value.push(response.data.data.id);
      videos.value.push({
        id: response.data.data.id,
        thumbnail,
        name: file.name,
      });
    } catch (error) {
      console.error("Video upload failed:", error.response?.data || error.message);
    }
  });
};

const handlePdfUpload = async (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;

  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "user");
      formData.append("is_profile_photo", false);

      const response = await $api.post(
        "https://api.7srating.uz/api/user/media-upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      localMediaIds.value.push(response.data.data.id);
      pdfs.value.push({
        id: response.data.data.id,
        name: file.name,
        url: `https://api.7srating.uz${response.data.data.file}`,
      });
    }
  } catch (error) {
    console.error("PDF upload failed:", error.response?.data || error.message);
  }
};

const deletePdf = async (pdf, index) => {
  try {
    await $api.delete(`https://api.7srating.uz/api/user/media/${pdf.id}/`);
    pdfs.value.splice(index, 1);
    localMediaIds.value = localMediaIds.value.filter((id) => id !== pdf.id);
  } catch (error) {
    console.error("Failed to delete PDF:", error.response?.data || error.message);
  }
};
</script>
