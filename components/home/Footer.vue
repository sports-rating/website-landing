<template>
  <footer class="bg-[#1A1B1F] pt-12 pb-4">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo Section -->
        <div>
          <a href="/" class="inline-block mb-6">
            <img src="/saber-logos.svg" alt="Sports Rating" class="h-10" />
          </a>
          <p class="text-gray-400 text-sm">
            {{ t("statisticaFooter") }}<br />
            {{ t("reytingFooter") }}<br />
            {{ t("date") }}
          </p>
        </div>

        <!-- First Nav Column -->
        <div>
          <h3 class="text-white font-medium mb-4">{{ t("aboutFooter") }}</h3>
          <ul class="space-y-2">
            <nuxt-link to="/about" class="nav-link" active-class="active-link">
              {{ t("about") }}
            </nuxt-link>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ t("english") }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ t("services") }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ t("processing") }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ t("team") }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Second Nav Column -->
        <div>
          <h3 class="text-white font-medium mb-4">{{ t("opinions") }}</h3>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ t("trainers") }}
              </a>
            </li>
            <!-- <li>
              <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
                Crowdfunding
              </a>
            </li> -->
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
               {{ t('reviews') }}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
               {{ t('youtube') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div>
          <h3 class="text-white font-medium mb-4">{{ t('footerText') }}</h3>
          <p class="text-gray-400 text-sm mb-4">
           {{ t('footerDescription') }}
          </p>

          <!-- Social Icons -->
          <div class="flex gap-4">
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#2A2B31] flex items-center justify-center hover:bg-[#3A3B41] transition-colors"
              aria-label="Facebook"
            >
              <Facebook class="w-5 h-5 text-gray-400" />
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#2A2B31] flex items-center justify-center hover:bg-[#3A3B41] transition-colors"
              aria-label="Instagram"
            >
              <Instagram class="w-5 h-5 text-gray-400" />
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#2A2B31] flex items-center justify-center hover:bg-[#3A3B41] transition-colors"
              aria-label="YouTube"
            >
              <Youtube class="w-5 h-5 text-gray-400" />
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-[#2A2B31] flex items-center justify-center hover:bg-[#3A3B41] transition-colors"
              aria-label="Telegram"
            >
              <Send class="w-5 h-5 text-gray-400" />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-4 border-t flex justify-around border-gray-800">
        <div class="text-white flex gap-4 text-sm">
          <nuxt-link to="/PrivacyPolicy" class="nav-link" active-class="active-link">
            {{ t('footerPrivacy') }}
          </nuxt-link>
          <nuxt-link to="/UserTerms" class="nav-link" active-class="active-link">
            {{ t('footerTerms') }}
          </nuxt-link>
        </div>
        <p class="text-center text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} {{ t('copy') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Instagram, Youtube, Send } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style>
.nav-link {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #d1d5db !important;
  /* border-bottom: 1px solid red; */
}

.active-link {
  border-bottom: 2px solid red;
}
</style>
