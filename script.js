document.addEventListener('DOMContentLoaded', function(){
  const addMsgBtn = document.getElementById('addMsgBtn');
  const wishArea = document.getElementById('wishArea');
  const messages = document.getElementById('messages');
  const confetti = document.getElementById('confetti');

  // When the single 'Message' button is clicked, show the professional birthday message
  addMsgBtn.addEventListener('click', () => {
    wishArea.classList.add('show');
    wishArea.innerHTML = `
      <div class="message-container">
        <div class="message-text">
          <h3 style="margin:0 0 8px;color:#8a2f56">Wishing You a Wonderful Birthday 🎉</h3>
          <p style="margin:0 0 8px;line-height:1.5;color:#333">
            Many more happy returns of the chelli<br>
            Wishing very happiest birthday and hope to celebrate these birthday like this for Upto 100 years.<br>
            From the feet of Lord Balaji wishing you have Good Health and Great future a head and hope you will get a good placement in 3-2 sem with good package and achieve more milestones in your life.<br>
            Always be happy ❤️<br>
            Feeling very very happy for being a sweet sister in my life.<br>
            Thank you so much for this bond.<br>
            It really means a lot to me......
          </p>
          <p style="margin:8px 0 0;color:#333;font-weight:600">With love,</p>
          <p style="margin:6px 0 0;color:#8a2f56;font-weight:700">Karthik</p>
        </div>
        <div id="messagePhotoHolder" aria-hidden="true"></div>
      </div>
    `;
    // try to load the Balaji image (assets/balaji.jpg) and insert to the right if available
    (function insertMessagePhoto(){
      const holder = document.getElementById('messagePhotoHolder');
      if(!holder) return;
      const img = new Image();
      img.className = 'message-photo';
      img.src = 'assets/balaji.jpg';
      img.alt = 'Lord Balaji';
      img.onload = ()=>{
        // wrap image so pointer can be positioned relative to it
        const wrap = document.createElement('div');
        wrap.className = 'message-photo-wrapper';
        wrap.appendChild(img);

        // create pointer element positioned bottom-right
        const pointer = document.createElement('div');
        pointer.className = 'photo-pointer pulse';
        wrap.appendChild(pointer);

        holder.appendChild(wrap);
      };
      img.onerror = ()=> { /* image not present - do nothing */ };
    })();
    // effects
    burstConfetti(48);
    burstButterflies(8);
  });

  // confetti helper
  function burstConfetti(count){
    if(!confetti) return;
    const colors = ['#FF5A8A','#FFD36A','#8ECBFF','#B8FFB8','#C27BFF'];
    for(let i=0;i<count;i++){
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size = Math.floor(Math.random()*10)+6;
      el.style.width = size + 'px';
      el.style.height = Math.floor(size*1.2) + 'px';
      el.style.left = (50 + (Math.random()*60-30)) + '%';
      el.style.top = (10 + Math.random()*10) + '%';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      confetti.appendChild(el);

      // animate using random velocities
      const dx = (Math.random()*2-1) * 120;
      const dy = 300 + Math.random()*300;
      const rot = (Math.random()*360);
      el.animate([
        {transform: `translate3d(0,0,0) rotate(0deg)`, opacity:1},
        {transform: `translate3d(${dx}px, ${dy}px, 0) rotate(${rot}deg)`, opacity:0}
      ],{duration:1200+Math.random()*1000,easing:'cubic-bezier(.2,.7,.1,1)'}).onfinish = ()=> el.remove();
    }
  }

  // Butterflies
  const butterfliesContainer = document.getElementById('butterflies');
  function spawnButterfly(opts = {}){
    if(!butterfliesContainer) return;
    const el = document.createElement('div');
    el.className = 'butterfly enter';
    const img = document.createElement('img');
    img.className = 'wing';
    img.src = 'assets/butterfly.svg';
    img.alt = '';
    el.appendChild(img);
    butterfliesContainer.appendChild(el);

    const startX = opts.startX ?? (Math.random()*80 + 5); // percent
    const startY = opts.startY ?? (70 + Math.random()*20); // percent from top
    const endX = opts.endX ?? (Math.random()*80 + 5);
    const endY = opts.endY ?? (10 + Math.random()*40);
    const rotate = (Math.random()*120-60);
    const duration = opts.duration ?? (6000 + Math.random()*7000);

    el.style.left = startX + '%';
    el.style.top = startY + '%';

    const kf = [
      {transform: `translate3d(0,0,0) rotate(${ -rotate/2 }deg)`, opacity:1, offset:0},
      {transform: `translate3d(${(endX-startX)}vw, ${(endY-startY)}vh, 0) rotate(${ rotate }deg)`, opacity:0.95, offset:0.6},
      {transform: `translate3d(${(endX-startX + (Math.random()*20-10))}vw, ${(endY-startY + 10)}vh, 0) rotate(${ rotate*1.4 }deg)`, opacity:0, offset:1}
    ];

    const anim = el.animate(kf, {duration: duration, easing: 'cubic-bezier(.2,.6,.2,1)'});
    anim.onfinish = ()=> el.remove();
  }

  // periodic spawn
  const butterflyTimer = setInterval(()=> spawnButterfly(), 1500);

  // optional: spawn a few when wishing
  function burstButterflies(n=3){
    for(let i=0;i<n;i++) setTimeout(()=> spawnButterfly({startX:30+Math.random()*40,startY:65+Math.random()*20}), i*220);
  }

  // integrate with wish/confetti
  // Legacy `wishBtn` references removed — all actions use `addMsgBtn` now.
});
