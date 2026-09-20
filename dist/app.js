$(function () {
  const $window = $(window);
  const $body = $("body");

  const imageButton = (file, alt, className = "") => `
    <button
      class="image-button ${className}"
      data-image="assets/${file}"
      data-caption="${alt}"
      aria-label="${alt} 크게 보기"
    >
      <img src="assets/${file}" alt="${alt}" loading="lazy">
    </button>
  `;

  const cardNames = [
    "표지",
    "페인포인트",
    "원인 설명",
    "고르는 기준",
    "자가진단 체크리스트",
    "브랜드 등장",
    "차별점과 신뢰",
    "CTA와 마무리",
  ];

  const stages = [
    `
      <div class="showcase dna-stage">
        ${imageButton("dna-start.png", "럭셔리 DNA 테스트 시작 화면")}
        ${imageButton("dna-question.png", "6문항 퀴즈의 첫 질문 화면")}
        ${imageButton("dna-result.png", "니치 브랜드 탐험형 결과 화면")}
      </div>
    `,
    `
      <div class="showcase strategy-stage">
        ${imageButton("awareness.png", "배리웨이 인지 단계 POE 전략")}
        ${imageButton("consideration.png", "배리웨이 고려 단계 POE 전략")}
        ${imageButton("conversion.png", "배리웨이 전환 단계 POE 전략")}
      </div>
    `,
    `
      <div class="showcase film-stage">
        <video
          controls
          playsinline
          preload="metadata"
          poster="assets/korea-poster.png"
          aria-label="한국 관광 숏폼 영상"
        >
          <source src="assets/korea-film.mp4" type="video/mp4">
          브라우저가 영상 재생을 지원하지 않습니다.
        </video>
        <div class="film-stills">
          ${imageButton("korea-street.png", "한국 관광 숏폼의 회오리감자 장면 AI 에셋")}
          ${imageButton("korea-polaroid.png", "한국 관광 숏폼의 약과 체험 장면 AI 에셋")}
          <p>
            Happy first day to you, in Korea<br>
            관광 숏폼 영상 & AI 제작 에셋
          </p>
        </div>
      </div>
    `,
    `
      <div class="showcase carousel" role="region" aria-label="베리시 카드뉴스 8장">
        <div class="carousel-track" id="card-track">
          ${cardNames
            .map((name, index) => {
              const fileName =
                index === 6
                  ? "verish-7-mosaic.png"
                  : `verish-${index + 1}.png`;

              return imageButton(fileName, `${index + 1} / 8 · ${name}`);
            })
            .join("")}
        </div>
        <div class="carousel-controls">
          <span>8장의 이야기 · 이미지를 누르면 크게 볼 수 있습니다</span>
          <div>
            <button id="prev-card" aria-label="이전 카드뉴스" aria-controls="card-track">←</button>
            <button id="next-card" aria-label="다음 카드뉴스" aria-controls="card-track">→</button>
          </div>
        </div>
      </div>
    `,
  ];

  const extras = [
    `
      ${imageButton(
        "dashboard.png",
        "GA4·Meta 광고 데이터를 결합한 데일리 데이터 분석 보드",
        "support-image",
      )}
      <p class="caption">
        데일리 분석 대시보드 · 화면의 CTA 클릭 집계와 위의 캠페인 최종 유입 비교는 서로 다른 기준의 지표입니다.
      </p>
    `,
    `
      ${imageButton(
        "media-plan.png",
        "월 1,000만 원 가정 예산의 퍼널별 미디어 플랜",
        "support-image",
      )}
      <p class="caption">가정 예산을 바탕으로 작성한 미디어 플랜</p>
    `,
    "",
    "",
  ];

  const highlightSets = [
    [
      ["실제 광고 유입 이후의 개선점", "key"],
      ["최종 시크먼트 이동까지", "accent"],
      ["최종 유입이 82명에서 102명으로 늘고", "key"],
      ["1,322원에서 1,215원으로 낮아졌습니다", "accent"],
    ],
    [
      ["고객 여정에 맞는 미디어 믹스와 단계별 측정 기준", "key"],
      ["캠페인의 측정 기준을 구체화", "accent"],
      ["3단계 퍼널과 9개 KPI", "key"],
      ["월 1,000만 원을 가정한 예산 배분안", "accent"],
    ],
    [
      ["타깃과 플랫폼 특성을 반영한 관광 숏폼 콘텐츠", "key"],
      ["첫 방한을 유도할 수 있는 메시지의 근거", "accent"],
      ["YouTube Shorts, Instagram Reels, TikTok", "key"],
    ],
    [
      ["공감할 수 있는 문제에서 브랜드와 제품에 대한 관심", "key"],
      ["생활 속 불편함과 정보 니즈", "accent"],
      ["정보 제공 → 문제 인식 → 제품 연결", "key"],
    ],
  ];

  const emphasize = (text, highlights) =>
    highlights.reduce((output, [phrase, type]) => {
      const tag = type === "key" ? "strong" : "span";
      const className = type === "key" ? "key-text" : "accent";
      return output.replace(
        phrase,
        `<${tag} class="${className}">${phrase}</${tag}>`,
      );
    }, text);

  const projectMarkup = projects
    .map(
      (project, index) => `
        <article class="project" id="project-${project.n}">
          <div class="work-masthead">
            <span class="work-number">${project.n}.</span>
            <span class="work-type">${project.brand} / ${project.date}</span>
          </div>
          ${stages[index]}
          <div class="work-info">
            <div class="work-title">
              <p class="brand">${project.brand}</p>
              <h3>${project.title}</h3>
              <div class="tags">
                ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
            </div>
            <div class="work-content">
              <p class="project-lead">
                ${emphasize(project.lead, highlightSets[index])}
              </p>
              <div class="metrics">
                ${project.metrics
                  .map(
                    (metric) => `
                      <div class="metric">
                        <strong>${metric[0]}</strong>
                        <span>${metric[1]}</span>
                        <small>${metric[2]}</small>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
              <h4>
                <span class="section-icon" aria-hidden="true">?</span>
                어떤 문제에서 시작했나요?
              </h4>
              <p>${emphasize(project.background, highlightSets[index])}</p>
              <h4>
                <span class="section-icon" aria-hidden="true">✓</span>
                ${index === 0 ? "실행 이후, 무엇이 달라졌나요?" : "어떤 결과물을 만들었나요?"}
              </h4>
              <p>${emphasize(project.outcome, highlightSets[index])}</p>
              ${extras[index]}
              <details class="process">
                <summary>과정과 나의 역할 살펴보기</summary>
                <div class="steps">
                  ${project.steps
                    .map(
                      (step, stepIndex) => `
                        <div>
                          <h4>0${stepIndex + 1} / ${step[0]}</h4>
                          <p>${step[1]}</p>
                        </div>
                      `,
                    )
                    .join("")}
                </div>
                <div class="role">
                  <b>나의 역할</b><br>
                  ${project.role}
                </div>
                <div class="learning">
                  <b>배운 점</b><br>
                  ${project.learning}
                </div>
              </details>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  $("#main-projects").html(projectMarkup);

  $("details.process").each(function () {
    const $details = $(this);
    const $panel = $("<section>", {
      class: "process-panel",
      "aria-label": "프로젝트 과정",
    }).html(`
      <div class="process-heading">
        <span>PROCESS</span>
        <h4>과정</h4>
        <p>문제 정의부터 실행과 분석까지, 진행 흐름을 순서대로 정리했습니다.</p>
      </div>
      <div class="process-grid"></div>
      <div class="process-summary"></div>
    `);

    const $grid = $panel.find(".process-grid");

    $details.find(".steps > div").each(function (index) {
      const $step = $(this);
      const $title = $step.find("h4");

      $step
        .addClass("process-step")
        .attr("data-step", String(index + 1).padStart(2, "0"));
      $title.text($title.text().replace(/^\d{2} \/ /, ""));
      $grid.append($step);
    });

    const $role = $details.find(".role");
    const $roleCopy = $role.clone();

    $roleCopy.find("b").remove();

    const roleItems = $roleCopy
      .text()
      .split(/\s*·\s*|\s*,\s*/)
      .map((item) => item.trim())
      .filter(Boolean);

    $role.removeClass("role").addClass("role-overview").html(`
        <div class="role-overview-head">
          <span>ROLE</span>
          <h4>나의 역할</h4>
        </div>
        <ul>
          ${roleItems.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `);

    $details.closest(".project").find(".work-title").append($role);
    $panel.find(".process-summary").append($details.find(".learning"));
    $details.replaceWith($panel);
  });

  const subProjectMarkup = subs
    .map(
      (project, index) => `
        <details class="sub">
          <summary>
            <span class="num">0${index + 1}</span>
            <strong>${project.title}</strong>
            <span class="type">${project.type}</span>
          </summary>
          <div class="sub-body">
            ${imageButton(project.image, project.alt, "sub-visual")}
            <p>${project.description}</p>
          </div>
        </details>
      `,
    )
    .join("");

  $("#sub-projects").html(subProjectMarkup);

  const $dialog = $("#lightbox");
  let $lastFocus = $();

  $(document).on("click", "[data-image]", function () {
    const $button = $(this);
    $lastFocus = $button;

    $dialog.find("img").attr({
      src: $button.data("image"),
      alt: $button.data("caption"),
    });
    $dialog.find("p").text($button.data("caption"));
    $dialog[0].showModal();
    $body.css("overflow", "hidden");
  });

  $dialog.on("close", function () {
    $body.css("overflow", "");
    $lastFocus.trigger("focus");
  });

  $dialog.on("click", function (event) {
    if (event.target === this) {
      this.close();
    }
  });

  const $track = $("#card-track");
  const $previousButton = $("#prev-card");
  const $nextButton = $("#next-card");

  const updateCarouselButtons = () => {
    const track = $track[0];
    const endPosition = track.scrollWidth - track.clientWidth - 5;

    $previousButton.prop("disabled", track.scrollLeft < 5);
    $nextButton.prop("disabled", track.scrollLeft >= endPosition);
  };

  const moveCarousel = (direction) => {
    const distance = $track.children().first().outerWidth(true);
    const targetPosition = $track.scrollLeft() + direction * distance;

    $track.stop().animate({ scrollLeft: targetPosition }, 320);
  };

  $previousButton.on("click", () => moveCarousel(-1));
  $nextButton.on("click", () => moveCarousel(1));
  $track.on("scroll", updateCarouselButtons);
  $track.find("img").on("load", updateCarouselButtons);

  const revealVisibleSections = () => {
    const viewportBottom = $window.scrollTop() + $window.height();

    $(".reveal:not(.visible)").each(function () {
      const $section = $(this);

      if ($section.offset().top < viewportBottom - 40) {
        $section.addClass("visible");
      }
    });
  };

  const updateNavigation = () => {
    let currentId = $("main > section").first().attr("id");

    $("main > section").each(function () {
      if ($(this).offset().top - $window.scrollTop() <= 180) {
        currentId = this.id;
      }
    });

    $("nav a").each(function () {
      const $link = $(this);
      const isActive = $link.attr("href") === `#${currentId}`;

      $link.toggleClass("active", isActive);

      if (isActive) {
        $link.attr("aria-current", "location");
      } else {
        $link.removeAttr("aria-current");
      }
    });
  };

  const updatePage = () => {
    updateCarouselButtons();
    revealVisibleSections();
    updateNavigation();
  };

  $body.addClass("motion");
  $window.on("scroll resize", updatePage);
  updatePage();
});
