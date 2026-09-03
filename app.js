'use strict';
// Edit these checklists to match your actual workplace equipment.
const meetings = {
  hybrid: { note: 'Bring people in the room and on the call together. Use the room system where available.', steps: [
    ['Wake up the room', 'Turn on the display using the room controls. Find the posted instructions.'],
    ['Connect your laptop if needed', 'Use the room’s approved cable or sharing method. HDMI usually carries display and sound; USB may connect the camera and microphone.'],
    ['Join the meeting once', 'Join on the room system, or select the room camera, microphone, and speaker on your laptop.'],
    ['Give sound and video a quick check', 'Confirm people can hear and see you. Other laptops in the same room should join without audio.'],
    ['Share only what you mean to', 'Close private windows, silence notifications, and share the intended window. Confirm someone remote can see it.']
  ]},
  present: { note: 'Share a presentation with people in the room. No video call required.', steps: [
    ['Wake up the display', 'Use the room’s control panel or remote and follow the posted instructions.'],
    ['Connect your presentation', 'Use an approved HDMI cable, video-capable USB-C connection, or workplace wireless sharing.'],
    ['Choose the right input', 'Select the display input that matches your connection.'],
    ['Check the audience view', 'Confirm the slides appear on the room display. Keep presenter notes and private windows off that screen.'],
    ['Test any video or sound', 'Play a short sample at a comfortable volume before people arrive.']
  ]},
  laptop: { note: 'Your laptop is the meeting room. A quiet spot and a headset are a great start.', steps: [
    ['Find your quiet spot', 'Connect to an approved network and plug in power if needed.'],
    ['Connect your headset', 'Select your headset for both microphone and speaker in your meeting app.'],
    ['Check your camera', 'Open its privacy shutter if present, choose the correct camera, and check your background.'],
    ['Check sound before joining', 'Use your meeting app’s test option if available. Make sure you are not muted when you want to speak.'],
    ['Get ready to share', 'Open your materials, silence notifications, and share just the intended window.']
  ]}
};
const fixes = {
  sound: {title: 'Let’s bring the sound back.', steps: ['Check the meeting app’s speaker choice. Select the room speakers or your headset.', 'Raise the app, computer, and room volume gradually. Check each for mute.', 'Confirm the person speaking is unmuted. Try the app’s speaker test if available.'], tip:'Still quiet? Tell your AV or IT team which speaker is selected and whether the speaker test worked.'},
  mic: {title: 'Make yourself heard.', steps: ['Check mute in the meeting app and on the physical microphone or room controls.', 'Select the intended microphone in the app’s audio settings.', 'Check that the app or browser has microphone permission. Speak and look for movement in its input meter.'], tip:'Still no input? Ask your AV or IT team for help. Share the selected microphone name and any permission message.'},
  screen: {title: 'Get your big-screen moment.', steps: ['Check that the display is awake and powered on using the normal room controls.', 'Reseat your approved cable at the laptop and choose the matching display input.', 'Check your computer’s display settings. A USB-C cable and port must support video; charging alone does not confirm that.'], tip:'Still blank? Note whether the display says “No signal” and tell your AV or IT team the connection you used.'},
  echo: {title: 'One voice is plenty.', steps: ['Look for multiple devices joined with audio in the same room.', 'Keep one room audio system active. On the other devices, disconnect meeting audio; muting the microphone alone may not stop feedback.', 'If joining individually, use a headset and move away from the active room speakers.'], tip:'Avoid increasing speaker volume to overcome an echo. If it continues, tell the AV or IT team which devices are connected.'},
  camera: {title: 'Let’s get you back in frame.', steps: ['Check the physical privacy shutter and the meeting app’s video button.', 'Choose the intended camera in the app. Close other apps that may be using it.', 'Check camera permission for the app or browser. For an external camera, check its normal user-accessible connection.'], tip:'Still not visible? Continue with audio if appropriate, then report the camera name and any error to your AV or IT team.'}
};
const questions = [
 {q:'Three colleagues join a hybrid call from the same room. What’s the best audio setup?', answers:['Everyone turns their speakers up.','One room audio system; the other devices join without audio.','Mute every microphone but leave all speakers on.'],correct:1,why:'One active room audio system helps prevent echo and feedback. Extra devices can still be used to view or share content without joining audio.'},
 {q:'Your laptop charges through USB-C, but the room display stays blank. What should you check?',answers:['Whether the cable and laptop port support video, and the display input is correct.','Whether your microphone is muted.','Whether the meeting invitation has a password.'],correct:0,why:'USB-C describes the connector. Not every cable or port supports video, even if it charges your laptop.'},
 {q:'You’re about to share a presentation. What’s your best final check?',answers:['Share your entire desktop immediately.','Open every document you might need.','Close private windows, silence notifications, and confirm the intended content is visible.'],correct:2,why:'A quick check keeps private information off the shared screen and helps everyone see the right content.'}
];
const state = { type:'hybrid', checked:new Set(), question:0, score:0 };
const $ = id => document.getElementById(id);
function showView(name) {
  if (!['setup','rescue','learn'].includes(name)) name='setup';
  document.querySelectorAll('.view').forEach(el => el.hidden = el.id !== name);
  document.querySelectorAll('[data-view]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.view===name)));
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click',()=>{ location.hash=button.dataset.view; showView(button.dataset.view); }));
window.addEventListener('hashchange',()=>showView(location.hash.slice(1)));
function updateProgress() {
  const total=meetings[state.type].steps.length, count=state.checked.size;
  $('progress').max=total; $('progress').value=count;
  $('progress-label').textContent=`${count} / ${total} ready`;
  $('ready-message').textContent=count===total?'✦ All checked. You’re ready to meet!':'Check each step as you go.';
}
function renderChecklist() {
  const meeting=meetings[state.type]; $('meeting-note').textContent=meeting.note; $('checklist').replaceChildren();
  meeting.steps.forEach(([title,detail],index)=>{
    const row=document.createElement('label'); row.className='check-row';
    const input=document.createElement('input'); input.type='checkbox'; input.checked=state.checked.has(index);
    const text=document.createElement('span'), strong=document.createElement('strong'), small=document.createElement('small');
    strong.textContent=title; small.textContent=detail; text.append(strong,small); row.append(input,text);
    input.addEventListener('change',()=>{input.checked?state.checked.add(index):state.checked.delete(index);updateProgress();});
    $('checklist').append(row);
  }); updateProgress();
}
$('meeting-type').addEventListener('change',event=>{state.type=event.target.value;state.checked.clear();renderChecklist();});
$('reset').addEventListener('click',()=>{state.checked.clear();renderChecklist();});
function showFix(key) {
  const fix=fixes[key]; $('fix-panel').replaceChildren();
  const heading=document.createElement('h3');heading.textContent=fix.title;
  const list=document.createElement('ol');fix.steps.forEach(step=>{const li=document.createElement('li');li.textContent=step;list.append(li);});
  const tip=document.createElement('p');tip.className='help-note';tip.textContent=fix.tip;
  $('fix-panel').append(heading,list,tip);
  document.querySelectorAll('[data-issue]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.issue===key)));
}
document.querySelectorAll('[data-issue]').forEach(button=>button.addEventListener('click',()=>showFix(button.dataset.issue)));
function renderQuiz() {
  const panel=$('quiz'); panel.replaceChildren();
  if(state.question===questions.length){
    const score=document.createElement('div');score.className='score';score.textContent=`${state.score} / ${questions.length}`;
    const title=document.createElement('h3');title.textContent=state.score===questions.length?'AV confidence: unlocked.':'A little practice goes a long way.';
    const copy=document.createElement('p');copy.textContent='Keep the golden rule handy: one active audio system per room. You can revisit the guide anytime.';
    const restart=document.createElement('button');restart.className='primary';restart.textContent='Try again ↺';restart.onclick=()=>{state.question=0;state.score=0;renderQuiz();};panel.append(score,title,copy,restart);return;
  }
  const item=questions[state.question], label=document.createElement('span'), heading=document.createElement('h3'), answers=document.createElement('div');
  label.className='eyebrow';label.textContent=`SCENARIO ${state.question+1} OF ${questions.length}`;heading.textContent=item.q;answers.className='answers';
  item.answers.forEach((text,index)=>{
    const button=document.createElement('button');button.className='answer';button.textContent=text;
    button.onclick=()=>{
      const correct=index===item.correct;if(correct)state.score++;
      [...answers.children].forEach((answer,i)=>{answer.disabled=true;if(i===item.correct)answer.classList.add('correct');});
      if(!correct)button.classList.add('incorrect');
      const feedback=document.createElement('p');feedback.className='feedback';feedback.setAttribute('role','status');feedback.textContent=(correct?'That’s it! ':'Good one to remember. ')+item.why;
      const next=document.createElement('button');next.className='primary';next.textContent=state.question===questions.length-1?'See my result →':'Next scenario →';next.onclick=()=>{state.question++;renderQuiz();$('quiz').querySelector('button').focus();};panel.append(feedback,next);next.focus();
    };answers.append(button);
  });panel.append(label,heading,answers);
}
renderChecklist();showFix('sound');renderQuiz();showView(location.hash.slice(1));
