<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold">Статистика</h1>
      <div class="flex gap-4">
        <el-select v-model="selectedRegion" placeholder="Выберите регион" class="w-48">
          <el-option label="Все регионы" value="all" />
          <el-option label="Москва" value="moscow" />
          <el-option label="СПб" value="spb" />
        </el-select>
        <el-date-picker
          v-model="selectedYear"
          type="year"
          placeholder="Выберите год"
          class="w-32"
        />
      </div>
    </div>

    <!-- Dashboard Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Participants Count with Pie Chart -->
      <div class="bg-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Количество участников</h3>
        <div class="text-3xl font-bold mb-6">8,846</div>

        <div class="flex items-center justify-center mb-4">
          <div class="relative w-48 h-48">
            <canvas ref="genderChart" width="192" height="192"></canvas>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold">67%</div>
                <div class="text-sm text-gray-400">Мужчины</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-500 rounded"></div>
            <span class="text-sm">Девушки</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-teal-400 rounded"></div>
            <span class="text-sm">Мужчины</span>
          </div>
        </div>
      </div>

      <!-- Yearly Bar Chart -->
      <div class="bg-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-6">Количество участников</h3>
        <div class="h-64">
          <canvas ref="yearlyChart" class="w-full h-full"></canvas>
        </div>
      </div>

      <!-- Category Progress Bars -->
      <div class="bg-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Количество участников</h3>
        <div class="text-3xl font-bold mb-6">8,846</div>

        <div class="space-y-4">
          <div v-for="category in categories" :key="category.name" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>{{ category.name }}</span>
              <span>{{ category.count }}</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-300"
                :class="category.color"
                :style="{ width: category.percentage + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Medal Statistics -->
      <div class="bg-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Полученные медали</h3>
        <div class="text-3xl font-bold mb-6">1452</div>

        <div class="flex items-center justify-center mb-6">
          <div class="relative w-48 h-48">
            <canvas ref="medalChart" width="192" height="192"></canvas>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-xl font-bold text-red-400">339</div>
                <div class="text-xs text-gray-400">3 место</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-xl font-bold text-teal-400">678</div>
            <div class="text-xs text-gray-400 flex items-center justify-center gap-1">
              <div class="w-2 h-2 bg-teal-400 rounded-full"></div>
              1 место
            </div>
          </div>
          <div>
            <div class="text-xl font-bold text-yellow-400">426</div>
            <div class="text-xs text-gray-400 flex items-center justify-center gap-1">
              <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
              2 место
            </div>
          </div>
          <div>
            <div class="text-xl font-bold text-red-400">339</div>
            <div class="text-xs text-gray-400 flex items-center justify-center gap-1">
              <div class="w-2 h-2 bg-red-400 rounded-full"></div>
              3 место
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const selectedRegion = ref("all");
const selectedYear = ref(new Date());

const genderChart = ref(null);
const yearlyChart = ref(null);
const medalChart = ref(null);

const categories = ref([
  { name: "Анализ (500)", count: "500", percentage: 85, color: "bg-red-500" },
  { name: "Бизнес (900)", count: "900", percentage: 70, color: "bg-green-500" },
  { name: "Физика (900)", count: "900", percentage: 60, color: "bg-yellow-500" },
  { name: "Дизайн (500)", count: "500", percentage: 90, color: "bg-teal-500" },
  { name: "Маркетинг (500)", count: "500", percentage: 45, color: "bg-orange-500" },
  { name: "Новое (500)", count: "500", percentage: 75, color: "bg-blue-500" },
  { name: "Кадастр (500)", count: "500", percentage: 55, color: "bg-teal-400" },
  { name: "Северная (500)", count: "500", percentage: 80, color: "bg-yellow-400" },
  { name: "Стандарт (500)", count: "500", percentage: 65, color: "bg-orange-400" },
  { name: "Строительная (500)", count: "500", percentage: 95, color: "bg-green-400" },
  { name: "Тысячи (500)", count: "500", percentage: 40, color: "bg-blue-400" },
  { name: "Кадры (500)", count: "500", percentage: 85, color: "bg-pink-500" },
]);

const drawPieChart = (canvas, data, colors) => {
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let currentAngle = -Math.PI / 2;

  data.forEach((value, index) => {
    const sliceAngle = (value / 100) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index];
    ctx.fill();

    currentAngle += sliceAngle;
  });
};

const drawDonutChart = (canvas, data, colors) => {
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const outerRadius = 80;
  const innerRadius = 50;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const total = data.reduce((sum, value) => sum + value, 0);
  let currentAngle = -Math.PI / 2;

  data.forEach((value, index) => {
    const sliceAngle = (value / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
    ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = colors[index];
    ctx.fill();

    currentAngle += sliceAngle;
  });
};

const drawBarChart = (canvas) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const years = ["2021", "2022", "2023", "2024", "2025"];
  const maleData = [7.5, 5.5, 8.5, 6.5, 8.0];
  const femaleData = [6.0, 4.5, 7.0, 5.0, 7.5];

  const barWidth = 30;
  const spacing = 60;
  const startX = 60;
  const maxHeight = height - 80;

  // Draw bars
  years.forEach((year, index) => {
    const x = startX + index * spacing;

    // Male bars (teal)
    const maleHeight = (maleData[index] / 10) * maxHeight;
    ctx.fillStyle = "#14b8a6";
    ctx.fillRect(x, height - 40 - maleHeight, barWidth, maleHeight);

    // Female bars (red)
    const femaleHeight = (femaleData[index] / 10) * maxHeight;
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(x + barWidth + 5, height - 40 - femaleHeight, barWidth, femaleHeight);

    // Year labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(year, x + barWidth, height - 20);
  });
};

onMounted(async () => {
  await nextTick();

  if (genderChart.value) {
    drawPieChart(genderChart.value, [33, 67], ["#ef4444", "#14b8a6"]);
  }

  if (yearlyChart.value) {
    drawBarChart(yearlyChart.value);
  }

  if (medalChart.value) {
    drawDonutChart(medalChart.value, [678, 426, 339], ["#14b8a6", "#eab308", "#ef4444"]);
  }
});
</script>

<style>
.el-select,
.el-date-editor {
  --el-bg-color: #374151;
  --el-border-color: #4b5563;
  --el-text-color-regular: #ffffff;
}

.el-select .el-input__wrapper {
  background-color: #374151;
  border-color: #4b5563;
}

.el-date-editor .el-input__wrapper {
  background-color: #374151;
  border-color: #4b5563;
}
</style>
