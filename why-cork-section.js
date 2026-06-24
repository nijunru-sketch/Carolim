(() => {
      const section = document.querySelector("#why-cork");
      if (!section) return;
      const root = section;

      const cards = Array.from(root.querySelectorAll("[data-screen]"));
      const slots = {
        A: "index",
        B: "add",
        C: "todo",
      };
      let focusedCard = "a";
      let selectedPlant = "manyue";
      let todoScreen = "month";
      let handDismissed = false;
      let scrollHintDismissed = false;

      const plantArchiveMap = {
        manyue: {
          title: "满月球兰",
          image: "./assets/plant-details/final/manyue长图.png",
        },
        meidao: {
          title: "美岛裂瓣球兰",
          image: "./assets/plant-details/final/meidao长图.png",
        },
        zise: {
          title: "紫色极光球兰",
          image: "./assets/plant-details/final/zise长图.png",
        },
        zhusha: {
          title: "朱砂泰彩",
          image: "./assets/plant-details/final/zhusha长图.png",
        },
        hunsha: {
          title: "婚纱泰彩",
          image: "./assets/plant-details/final/hunsha长图.png",
        },
        banyin: {
          title: "斑印球兰",
          image: "./assets/plant-details/final/meidao长图.png",
        },
        yindou: {
          title: "银豆子球兰",
          image: "./assets/plant-details/final/manyue长图.png",
        },
      };

      const todoState = {
        viewMode: "month",
        aggMode: "normal",
        taskView: "plant",
        monthIndex: 0,
        selectedDate: "2026-06-22",
        done: new Set(["black-water"]),
      };

      const monthLabels = ["2026年6月", "2026年7月", "2026年5月"];

      const monthDays = Array.from({ length: 30 }, (_, index) => ({
        day: index + 1,
        date: `2026-06-${String(index + 1).padStart(2, "0")}`,
        icons: ["💧"],
      }));

      const weekRows = [
        ["2026-06-22", "周一", 22, ["黑叶冷水花", "王子蔓绿绒", "鱼骨", "卷卷松", "茶杯卡梅拉球兰", "全银梅芯球兰", "新几内亚鬼球兰", "074球兰", "贝拉球兰", "克林顿球兰", "姬凤梨", "卡梅拉球兰"]],
        ["2026-06-23", "周二", 23, ["朱砂泰彩", "婚纱泰彩", "高斑瓦林球兰", "女王之心彩叶芋", "发色球兰", "章鱼内锦球兰", "紫茄", "绿孔雀球兰", "花朵冰糖球兰", "卷叶金丝吊兰", "秋海棠", "大盆桃蛋多肉", "黄盆羊脂玉球兰"]],
        ["2026-06-24", "周三", 24, ["紫色极光球兰", "小方叶球兰", "湖心裂瓣球兰", "茶杯沙巴蜻蜓球兰", "椭圆叶球兰", "茶杯眼树莲球兰", "裂瓣板植球兰", "豹纹裂瓣球兰", "黑绿球兰", "玉扇锦多肉", "千手观音海芋", "章鱼外锦球兰"]],
      ];

      const taskGroupsByPlant = {
        "2026-06-22": [
          { key: "black-water", name: "黑叶冷水花", avatar: "黑", avatarBg: "#dce7dd", avatarFg: "#445947", type: "浇水", dueMonth: "JUL", dueDay: "17" },
          { key: "prince-water", name: "王子蔓绿绒", avatar: "王", avatarBg: "#e8ddd2", avatarFg: "#6d5848", type: "浇水", dueMonth: "JUL", dueDay: "17" },
          { key: "fish-water", name: "鱼骨", avatar: "鱼", avatarBg: "#e5efd9", avatarFg: "#4e6b45", type: "浇水", dueMonth: "JUL", dueDay: "17" },
        ],
        "2026-06-23": [
          { key: "vera-water", name: "朱砂泰彩", avatar: "朱", avatarBg: "#f0dfdd", avatarFg: "#8b5e5b", type: "浇水", dueMonth: "JUL", dueDay: "18" },
          { key: "marry-water", name: "婚纱泰彩", avatar: "婚", avatarBg: "#f2e6e8", avatarFg: "#8c6971", type: "浇水", dueMonth: "JUL", dueDay: "18" },
        ],
        "2026-06-24": [
          { key: "purple-water", name: "紫色极光球兰", avatar: "紫", avatarBg: "#e5dff0", avatarFg: "#6e5b89", type: "浇水", dueMonth: "JUL", dueDay: "19" },
        ],
      };

      const tasksByType = {
        "2026-06-22": [
          { key: "batch-water-1", name: "浇水", image: "💧", members: ["黑叶冷水花", "王子蔓绿绒", "鱼骨"] },
        ],
        "2026-06-23": [
          { key: "batch-water-2", name: "浇水", image: "💧", members: ["朱砂泰彩", "婚纱泰彩"] },
        ],
        "2026-06-24": [
          { key: "batch-water-3", name: "浇水", image: "💧", members: ["紫色极光球兰"] },
        ],
      };

      function renderTodo() {
        const grid = root.querySelector("[data-calendar-grid]");
        const weekList = root.querySelector("[data-week-list]");
        const taskList = root.querySelector("[data-task-list]");
        const label = root.querySelector("[data-calendar-label]");
        const selectedLabel = root.querySelector("[data-selected-label]");
        const tempValue = root.querySelector("[data-temp-value]");
        const monthCard = root.querySelector("[data-month-card]");
        const weekCard = root.querySelector("[data-week-card]");
        if (!grid || !weekList || !taskList || !label || !selectedLabel || !tempValue || !monthCard || !weekCard) return;

        label.textContent = monthLabels[todoState.monthIndex] || "2026年6月";
        selectedLabel.textContent = todoState.selectedDate.replace(/-/g, "/").replace("/0", "/");
        tempValue.textContent = "26";

        root.querySelectorAll("[data-view-mode]").forEach((button) => {
          button.classList.toggle("is-active", button.dataset.viewMode === todoState.viewMode);
        });

        root.querySelectorAll("[data-agg-mode]").forEach((button) => {
          const mode = button.dataset.aggMode;
          button.classList.toggle("is-active", (mode === "normal" && todoState.aggMode === "normal") || (mode === "light" && todoState.aggMode === "light"));
        });

        root.querySelectorAll("[data-task-view]").forEach((button) => {
          button.classList.toggle("is-active", button.dataset.taskView === todoState.taskView);
        });

        monthCard.classList.toggle("is-visible", todoState.viewMode === "month");
        weekCard.classList.toggle("is-visible", todoState.viewMode === "week");

        grid.innerHTML = monthDays.map((item) => `
          <button class="todoReplicaDay ${item.date === todoState.selectedDate ? "is-active" : ""}" type="button" data-date="${item.date}">
            <span class="todoReplicaDay__num">${item.day}</span>
            <span class="todoReplicaDay__icons">${item.icons.join("")}</span>
          </button>
        `).join("");

        weekList.innerHTML = weekRows.map(([date, week, day, names]) => `
          <button class="todoReplicaWeekRow ${date === todoState.selectedDate ? "is-active" : ""}" type="button" data-date="${date}">
            <div class="todoReplicaWeekMeta">
              <small>${week}</small>
              <strong>${day}</strong>
            </div>
            <div class="todoReplicaWeekTags">
              ${names.slice(0, todoState.aggMode === "light" ? 6 : names.length).map((name) => `<span class="todoReplicaWeekTag">${name}<span>💧</span></span>`).join("")}
            </div>
          </button>
        `).join("");

        if (todoState.taskView === "plant") {
          const list = taskGroupsByPlant[todoState.selectedDate] || [];
          taskList.innerHTML = list.length ? list.map((task) => `
            <div class="todoReplicaTaskCard">
              <div class="todoReplicaTaskHead">
                <div class="todoReplicaAvatar" style="--avatar-bg:${task.avatarBg};--avatar-fg:${task.avatarFg};">${task.avatar}</div>
                <div class="todoReplicaPlantName">${task.name}</div>
                <div class="todoReplicaArrow">›</div>
              </div>
              <div class="todoReplicaTaskRow">
                <button class="todoReplicaCheck ${todoState.done.has(task.key) ? "is-done" : ""}" type="button" data-task-key="${task.key}">✓</button>
                <div class="todoReplicaTaskInfo ${todoState.done.has(task.key) ? "is-done" : ""}">
                  <span>💧</span>
                  <span>${task.type}</span>
                </div>
                <div class="todoReplicaDate"><span class="todoReplicaDate__month">${task.dueMonth}</span><span class="todoReplicaDate__day">${task.dueDay}</span></div>
              </div>
            </div>
          `).join("") : `<div class="todoReplicaTaskEmpty">今日无养护任务</div>`;
        } else {
          const list = tasksByType[todoState.selectedDate] || [];
          taskList.innerHTML = list.length ? list.map((task) => `
            <div class="todoReplicaTaskTypeCard">
              <div class="todoReplicaTaskTypeHead">
                <div class="todoReplicaTaskTypeLabel">
                  <span class="todoReplicaTaskTypeIcon">${task.image}</span>
                  <span>${task.name}</span>
                </div>
                <div class="todoReplicaTaskTypeMeta">${task.members.length}株</div>
              </div>
              <div class="todoReplicaTaskTypeBody">
                ${task.members.slice(0, todoState.aggMode === "light" ? 4 : task.members.length).map((member) => `
                  <span class="todoReplicaTaskChip">
                    <span class="todoReplicaTaskChip__drop">💧</span>
                    <span>${member}</span>
                  </span>
                `).join("")}
              </div>
            </div>
          `).join("") : `<div class="todoReplicaTaskEmpty">今日无养护任务</div>`;
        }
      }

      function renderStack() {
        cards.forEach((card) => {
          const screen = card.dataset.screen;
          const slot = Object.entries(slots).find(([, value]) => value === screen)?.[0];
          card.classList.remove("slot-a", "slot-b", "slot-c");
          if (slot === "A") card.classList.add("slot-a");
          if (slot === "B") card.classList.add("slot-b");
          if (slot === "C") card.classList.add("slot-c");
        });
        renderCardSizes();
        renderHandHint();
        renderWeekHint();
      }

      function renderCardSizes() {
        const sizeStateByFocus = {
          a: {
            index: "large",
            add: "small",
            todo: "small",
          },
          b: {
            index: "small",
            add: "large",
            todo: "small",
          },
          c: {
            index: "small",
            add: "small",
            todo: "large",
          },
        }[focusedCard] || {
          index: "large",
          add: "small",
          todo: "small",
        };

        cards.forEach((card) => {
          const screen = card.dataset.screen;
          card.classList.remove("is-large", "is-medium", "is-small", "is-active", "is-passive");
          const size = sizeStateByFocus[screen];
          if (size === "large") card.classList.add("is-large");
          if (size === "medium") card.classList.add("is-medium");
          if (size === "small") card.classList.add("is-small");
          if (size === "large") card.classList.add("is-active");
          else card.classList.add("is-passive");
        });
      }

      function renderArchive() {
        const image = root.querySelector("[data-archive-image]");
        const scroll = root.querySelector("[data-archive-scroll]");
        const current = plantArchiveMap[selectedPlant] || plantArchiveMap.manyue;
        if (!image || !scroll) return;
        image.src = current.image;
        image.alt = `${current.title}植物档案长图`;
        scroll.scrollTop = 0;
        renderScrollHint();
      }

      function renderTodoShot() {
        const image = root.querySelector("[data-todo-image]");
        if (!image) return;
        if (todoScreen === "week") {
          image.src = "./assets/why-cork/screens/周视图.png";
          image.alt = "养护日历周视图长图";
          return;
        }
        image.src = "./assets/why-cork/screens/养护日历.png";
        image.alt = "养护日历页面长图";
      }

      function renderHandHint() {
        const hand = root.querySelector("[data-hand-hint]");
        if (!hand) return;
        const show = focusedCard === "a" && !handDismissed;
        hand.classList.toggle("is-visible", show);
      }

      function renderScrollHint() {
        const hand = root.querySelector("[data-scroll-hint]");
        const scroll = root.querySelector("[data-archive-scroll]");
        if (!hand || !scroll) return;
        const show = focusedCard === "b" && selectedPlant === "meidao" && !scrollHintDismissed && scroll.scrollTop < 24;
        hand.classList.toggle("is-visible", show);
      }

      function renderWeekHint() {
        const hand = root.querySelector("[data-week-hint]");
        if (!hand) return;
        const show = selectedPlant === "meidao" && todoScreen === "month" && scrollHintDismissed;
        hand.classList.toggle("is-visible", show);
      }

      function focusCard(nextFocus) {
        focusedCard = nextFocus;
        renderStack();
        renderScrollHint();
        renderWeekHint();
      }

      function openPlantArchive(plantKey) {
        if (!plantKey || plantKey === "banyin") return;
        selectedPlant = plantKey;
        if (plantKey === "meidao") {
          handDismissed = true;
          scrollHintDismissed = false;
        } else {
          handDismissed = true;
          scrollHintDismissed = true;
        }
        renderArchive();
        focusCard("b");
      }

      const indexMap = root.querySelector("[data-index-map]");
      if (indexMap) {
        indexMap.addEventListener("click", (event) => {
          event.stopPropagation();
          const rect = indexMap.getBoundingClientRect();
          const y = ((event.clientY - rect.top) / rect.height) * 100;

          if (y >= 28.9 && y <= 35.7) {
            handDismissed = true;
            return openPlantArchive("manyue");
          }
          if (y >= 40.0 && y <= 46.8) {
            handDismissed = true;
            return openPlantArchive("meidao");
          }
          if (y >= 48.4 && y <= 59.4) {
            handDismissed = true;
            return openPlantArchive("zise");
          }
          return;
        });
      }

      cards.forEach((card) => {
        card.addEventListener("click", () => {
          const screen = card.dataset.screen;
          if (screen === "index") focusCard("a");
          if (screen === "add") focusCard("b");
          if (screen === "todo") focusCard("c");
        });
      });

      const archiveScroll = root.querySelector("[data-archive-scroll]");
      if (archiveScroll) {
        archiveScroll.addEventListener("scroll", () => {
          if (archiveScroll.scrollTop > 18) {
            scrollHintDismissed = true;
          }
          focusCard("b");
          renderScrollHint();
          renderWeekHint();
        });
      }

      const todoCard = root.querySelector('[data-screen="todo"]');
      if (todoCard) {
        todoCard.addEventListener("click", (event) => {
          const slot = Object.entries(slots).find(([, value]) => value === "todo")?.[0];
          if (slot !== "C") return;

          const image = todoCard.querySelector("[data-todo-image]");
          if (!image) return;

          const rect = image.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;

          const isMonthViewTabBand = x >= 3.0 && x <= 29.8 && y >= 8.2 && y <= 12.9;
          const isWeekViewTabBand = x >= 3.2 && x <= 29.2 && y >= 5.0 && y <= 8.9;
          const monthWeekSplit = 15.9;

          if (todoScreen === "month") {
            if (!isMonthViewTabBand || x < monthWeekSplit) return;

            event.stopPropagation();
            todoScreen = "week";
            renderTodoShot();
            focusCard("c");
            renderWeekHint();
            return;
          }

          if (todoScreen === "week") {
            if (!isWeekViewTabBand || x > monthWeekSplit) return;

            event.stopPropagation();
            todoScreen = "month";
            renderTodoShot();
            focusCard("c");
            renderWeekHint();
          }
        }, true);
      }

      root.querySelectorAll("[data-view-mode]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          todoState.viewMode = button.dataset.viewMode;
          renderTodo();
        });
      });

      root.querySelectorAll("[data-agg-mode]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          todoState.aggMode = button.dataset.aggMode === "light" ? "light" : "normal";
          renderTodo();
        });
      });

      root.querySelectorAll("[data-task-view]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          todoState.taskView = button.dataset.taskView;
          renderTodo();
        });
      });

      root.addEventListener("click", (event) => {
        const day = event.target.closest("[data-date]");
        if (day) {
          event.stopPropagation();
          todoState.selectedDate = day.dataset.date;
          renderTodo();
          return;
        }

        const shift = event.target.closest("[data-calendar-shift]");
        if (shift) {
          event.stopPropagation();
          const delta = Number(shift.dataset.calendarShift);
          todoState.monthIndex = Math.max(0, Math.min(monthLabels.length - 1, todoState.monthIndex + (delta < 0 ? 1 : -1)));
          renderTodo();
          return;
        }

        const task = event.target.closest("[data-task-key]");
        if (task) {
          event.stopPropagation();
          const key = task.dataset.taskKey;
          if (todoState.done.has(key)) todoState.done.delete(key);
          else todoState.done.add(key);
          renderTodo();
        }
      });

      renderStack();
      renderArchive();
      renderTodoShot();
      renderHandHint();
      renderScrollHint();
      renderWeekHint();
      renderTodo();
      renderCardSizes();

      

      window.requestAnimationFrame(() => {
        section.classList.add("is-ready");
      });

      })();
