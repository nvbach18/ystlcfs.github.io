
/* ==========================================================
   YÊN SỞ CONFESSION
   CHỈ GỬI TEXT - KHÔNG CÓ ẢNH
========================================================== */


// ==========================================================
// CONSTANTS
// ==========================================================

const MAX_CHARS = 2000;


function getClientId(){

  const storageKey =
    'yen-so-confession-client-id';


  try{

    const savedId =
      localStorage.getItem(storageKey);


    if(
      savedId &&
      /^[a-zA-Z0-9_-]{16,80}$/.test(savedId)
    ){

      return savedId;

    }


    const newId =
      crypto.randomUUID
        ? crypto.randomUUID().replace(/-/g, '')
        : Date.now().toString(36) + Math.random().toString(36).slice(2);

    localStorage.setItem(
      storageKey,
      newId
    );

    return newId;

  }catch(error){

    return 'temporary-' +
      Date.now().toString(36) +
      Math.random().toString(36).slice(2);

  }

}


const CLIENT_ID =
  getClientId();


// ==========================================================
// PARTICLES
// ==========================================================

(function createParticles(){

  const container =
    document.getElementById(
      'particles'
    );

  const COUNT = 26;


  for(let i = 0; i < COUNT; i++){

    const p =
      document.createElement(
        'div'
      );

    p.className =
      'particle';


    const size =
      (
        Math.random() * 2 + 1.5
      ).toFixed(1);


    const left =
      (
        Math.random() * 100
      ).toFixed(2);


    const top =
      (
        Math.random() * 100
      ).toFixed(2);


    const dur =
      (
        Math.random() * 3 + 2.5
      ).toFixed(2);


    const delay =
      (
        -Math.random() * 5
      ).toFixed(2);


    p.style.width =
      size + 'px';

    p.style.height =
      size + 'px';

    p.style.left =
      left + '%';

    p.style.top =
      top + '%';


    p.style.setProperty(
      '--dur',
      dur + 's'
    );


    p.style.setProperty(
      '--delay',
      delay + 's'
    );


    container.appendChild(p);

  }

})();


// ==========================================================
// CURSOR GLOW
// ==========================================================

(function initCursorGlow(){

  const prefersReducedMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;


  if(prefersReducedMotion){
    return;
  }


  const glowHost =
    document.getElementById(
      'formCard'
    );


  if(!glowHost){
    return;
  }


  const glow =
    glowHost.querySelector(
      '.cursor-glow'
    );


  let rect =
    glowHost.getBoundingClientRect();


  let targetX =
    rect.width / 2;


  let targetY =
    rect.height / 2;


  let curX =
    targetX;


  let curY =
    targetY;


  let started = false;


  function refreshRect(){

    rect =
      glowHost.getBoundingClientRect();

  }


  window.addEventListener(
    'resize',
    refreshRect
  );


  window.addEventListener(
    'scroll',
    refreshRect,
    { passive:true }
  );


  window.addEventListener(
    'mousemove',
    (e) => {

      const localX =
        e.clientX - rect.left;


      const localY =
        e.clientY - rect.top;


      targetX =
        Math.min(
          Math.max(localX, 0),
          rect.width
        );


      targetY =
        Math.min(
          Math.max(localY, 0),
          rect.height
        );


      if(!started){

        started = true;

        curX =
          targetX;

        curY =
          targetY;


        glow.classList.add(
          'active'
        );


        requestAnimationFrame(
          animateGlow
        );

      }

    }
  );


  function animateGlow(){

    curX +=
      (targetX - curX) * 0.15;


    curY +=
      (targetY - curY) * 0.15;


    glowHost.style.setProperty(
      '--x',
      curX + 'px'
    );


    glowHost.style.setProperty(
      '--y',
      curY + 'px'
    );


    requestAnimationFrame(
      animateGlow
    );

  }

})();


// ==========================================================
// SCREEN ELEMENTS
// ==========================================================

const welcomeScreen =
  document.getElementById(
    'welcomeScreen'
  );


const formScreen =
  document.getElementById(
    'formScreen'
  );


const successScreen =
  document.getElementById(
    'successScreen'
  );


// ==========================================================
// FORM ELEMENTS
// ==========================================================

const goToFormBtn =
  document.getElementById(
    'goToFormBtn'
  );


const confessionText =
  document.getElementById(
    'confessionText'
  );


const charCounter =
  document.getElementById(
    'charCounter'
  );


const textError =
  document.getElementById(
    'textError'
  );


const submitBtn =
  document.getElementById(
    'submitBtn'
  );


const statusLine =
  document.getElementById(
    'statusLine'
  );


const sendAnotherBtn =
  document.getElementById(
    'sendAnotherBtn'
  );


// ==========================================================
// SHOW SCREEN
// ==========================================================

function showScreen(screenEl){

  [
    welcomeScreen,
    formScreen,
    successScreen
  ]
  .forEach(
    s => s.classList.remove(
      'active'
    )
  );


  screenEl.classList.add(
    'active'
  );


  const firstControl =
    screenEl.querySelector(
      'textarea, button'
    );


  if(firstControl){

    firstControl.focus();

  }

}


// ==========================================================
// GO TO FORM
// ==========================================================

goToFormBtn.addEventListener(
  'click',
  () => {

    showScreen(
      formScreen
    );

  }
);


// ==========================================================
// CHARACTER COUNTER
// ==========================================================

confessionText.addEventListener(
  'input',
  () => {

    const len =
      confessionText.value.length;


    charCounter.textContent =
      `${len} / ${MAX_CHARS}`;


    charCounter.classList.toggle(
      'limit-near',
      len > MAX_CHARS * 0.9
    );


    clearFieldError(
      textError,
      confessionText
    );

  }
);


// ==========================================================
// ERROR FUNCTIONS
// ==========================================================

function showFieldError(
  el,
  message,
  inputEl
){

  el.textContent =
    message;


  el.classList.add(
    'active'
  );


  if(inputEl){

    inputEl.classList.add(
      'input-error'
    );

    inputEl.setAttribute(
      'aria-invalid',
      'true'
    );

  }

}


function clearFieldError(
  el,
  inputEl
){

  el.textContent =
    '';


  el.classList.remove(
    'active'
  );


  if(inputEl){

    inputEl.classList.remove(
      'input-error'
    );

    inputEl.setAttribute(
      'aria-invalid',
      'false'
    );

  }

}


// ==========================================================
// SUBMIT
// ==========================================================

submitBtn.addEventListener(
  'click',
  async () => {

    if(submitBtn.disabled){

      return;

    }

    clearFieldError(
      textError,
      confessionText
    );


    statusLine.classList.remove(
      'active'
    );


    const content =
      confessionText.value;


    const trimmed =
      content.trim();


    // Không được để trống

    if(trimmed.length === 0){

      showFieldError(
        textError,
        'Bạn chưa viết nội dung confession.',
        confessionText
      );

      return;

    }


    // Không quá 2000 ký tự

    if(content.length > MAX_CHARS){

      showFieldError(
        textError,
        `Nội dung vượt quá giới hạn ${MAX_CHARS} ký tự.`,
        confessionText
      );

      return;

    }


    // Bắt đầu gửi

    setSubmitting(true);


    try{

      await submitConfession(
        trimmed
      );


      // Thành công

      showScreen(
        successScreen
      );


      resetForm();


    }catch(error){

      console.error(error);


      statusLine.textContent =
        error.message ||
        'Có lỗi xảy ra, vui lòng thử lại.';


      statusLine.classList.add(
        'active'
      );


    }finally{

      setSubmitting(false);

    }

  }
);


// ==========================================================
// SUBMITTING
// ==========================================================

function setSubmitting(
  isSubmitting
){

  submitBtn.disabled =
    isSubmitting;


  submitBtn.classList.toggle(
    'loading',
    isSubmitting
  );


  submitBtn
    .querySelector(
      '.btn-label'
    )
    .textContent =
      isSubmitting
        ? 'Đang gửi...'
        : 'Gửi Confession';

}


// ==========================================================
// GOOGLE APPS SCRIPT
// ==========================================================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyzlei-Z2EcYAf-fiXMkUsJ7J7mMIlfg6CRrNcALEe6ZqaeMEZcxQpFP6wW1K5UQX2Trw/exec";


async function submitConfession(
  content
){

  const response =
    await fetch(
      GOOGLE_SCRIPT_URL,
      {

        method:"POST",

        headers:{
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:JSON.stringify({

          content:content,

          clientId:CLIENT_ID,

          website:''

        })

      }
    );


  if(!response.ok){

    throw new Error(
      "Không thể kết nối đến máy chủ."
    );

  }


  const responseText =
    await response.text();


  let result;


  try{

    result =
      JSON.parse(responseText);

  }catch(error){

    throw new Error(
      "Máy chủ trả về dữ liệu không hợp lệ."
    );

  }


  if(!result.success){

    throw new Error(
      result.error ||
      "Gửi confession thất bại."
    );

  }


  return result;

}


// ==========================================================
// RESET FORM
// ==========================================================

function resetForm(){

  confessionText.value =
    '';

  charCounter.textContent =
    `0 / ${MAX_CHARS}`;


  charCounter.classList.remove(
    'limit-near'
  );


  clearFieldError(
    textError,
    confessionText
  );


  statusLine.classList.remove(
    'active'
  );


  statusLine.textContent =
    '';

}


// ==========================================================
// SEND ANOTHER
// ==========================================================

sendAnotherBtn.addEventListener(
  'click',
  () => {

    showScreen(
      formScreen
    );

  }
);


const motionToggle =
  document.getElementById(
    'motionToggle'
  );


function setMotionDisabled(
  isDisabled
){

  document.documentElement.classList.toggle(
    'no-motion',
    isDisabled
  );

  motionToggle.setAttribute(
    'aria-pressed',
    String(isDisabled)
  );

  const label =
    isDisabled
      ? 'Bật animation'
      : 'Tắt animation';

  motionToggle.setAttribute(
    'aria-label',
    label
  );

  motionToggle.setAttribute(
    'title',
    label
  );

}


let motionDisabled = false;


try{

  motionDisabled =
    localStorage.getItem(
      'yen-so-confession-no-motion'
    ) === 'true';

}catch(error){

  motionDisabled = false;

}


setMotionDisabled(
  motionDisabled
);


motionToggle.addEventListener(
  'click',
  () => {

    motionDisabled =
      !motionDisabled;

    setMotionDisabled(
      motionDisabled
    );


    try{

      localStorage.setItem(
        'yen-so-confession-no-motion',
        String(motionDisabled)
      );

    }catch(error){

    }

  }
);


document.addEventListener(
  'contextmenu',
  (event) => {

    event.preventDefault();

  }
);


document.addEventListener(
  'keydown',
  (event) => {

    const key =
      event.key.toLowerCase();

    const devToolsShortcut =
      event.key === 'F12' ||
      (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        ['i', 'j', 'c'].includes(key)
      ) ||
      (
        (event.ctrlKey || event.metaKey) &&
        key === 'u'
      );


    if(devToolsShortcut){

      event.preventDefault();

    }

  }
);

